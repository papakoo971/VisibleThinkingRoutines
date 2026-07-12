import { readFile } from "node:fs/promises";

const envText = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(envText.split(/\r?\n/).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
  const separator = line.indexOf("=");
  return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, "")];
}));
const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY;
const appId = env.NEXT_PUBLIC_FIREBASE_APP_ID;
const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000";
if (!projectId || !apiKey || !appId) throw new Error("Firebase configuration is incomplete.");

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const activityId = `student-access-${suffix}`;
const idTokens = [];

async function createIdentity(label) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: `student-access-${label}-${suffix}@example.com`, password: `Tmp-${suffix}!Aa1`, returnSecureToken: true }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Test account creation failed: ${JSON.stringify(result)}`);
  idTokens.push(result.idToken);
  return { uid: result.localId, idToken: result.idToken };
}

async function deleteIdentity(idToken) {
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
}

async function api(path, { idToken, method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}), ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  return { status: response.status, result };
}

async function sqlMutation(operationName, variables, idToken) {
  const connectorPath = `projects/${projectId}/locations/asia-northeast3/services/visible-thinking/connectors/teacher`;
  const response = await fetch(`https://firebasedataconnect.googleapis.com/v1/${connectorPath}:executeMutation?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Firebase-Auth-Token": idToken, "x-firebase-gmpid": appId },
    body: JSON.stringify({ name: connectorPath, operationName, variables }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length) throw new Error(`${operationName} failed: ${JSON.stringify(result)}`);
}

function payload() {
  return {
    activity: { id: activityId, title: "학생 접근 검증", routine: "See-Think-Wonder", activityMode: "individual", subject: "통합 테스트", classes: ["5학년 1반"], status: "active", code: "STW-Q7K9M", materialType: "image", materialUrl: "https://example.com/material.png", materialName: "material.png", instructions: "검증 안내문", activityDate: "2026-07-12", submittedCount: 0, targetCount: 1 },
    activityAttendance: [{ activityId, studentId: "s1", status: "present" }],
    activityGroups: [],
    groupSubmissions: [],
    individualSubmissions: [{ activityId, studentId: "s1", status: "draft", cards: [] }],
    routes: { teacherResults: `/teacher/activities/${activityId}/results`, studentEntry: `/student/activities/${activityId}` },
  };
}

let teacher;
let assignedStudent;
try {
  teacher = await createIdentity("teacher");
  assignedStudent = await createIdentity("assigned");
  const unassignedStudent = await createIdentity("unassigned");

  const create = await api("/api/created-activities", { method: "POST", idToken: teacher.idToken, body: payload() });
  if (create.status !== 201) throw new Error(`Teacher create failed: ${JSON.stringify(create)}`);
  await sqlMutation("LinkStudentAuth", { studentId: `${teacher.uid}:s1`, authUid: assignedStudent.uid }, teacher.idToken);

  const assignedSession = await api("/api/student/session", { idToken: assignedStudent.idToken });
  if (assignedSession.status !== 200 || assignedSession.result.student?.id !== "s1" || !assignedSession.result.activities?.some((item) => item.activity.id === activityId)) {
    throw new Error(`Assigned student session failed: ${JSON.stringify(assignedSession)}`);
  }
  const assignedDetail = await api(`/api/created-activities/${activityId}`, { idToken: assignedStudent.idToken });
  if (assignedDetail.status !== 200 || assignedDetail.result.activity?.activity.id !== activityId || assignedDetail.result.activity?.activity.instructions !== "검증 안내문") throw new Error("Assigned student detail or material metadata failed.");
  const codeLookup = await api("/api/activities/by-code/STW-Q7K9M");
  if (codeLookup.status !== 200 || codeLookup.result.activityId !== activityId) throw new Error("Active activity code lookup failed.");
  const workPath = `/api/student/activities/${activityId}/work`;
  const saved = await api(workPath, { method: "PUT", idToken: assignedStudent.idToken, body: {
    cards: [{ id: `card-${suffix}`, column: "see", content: "자동 저장 검증 카드" }], status: "draft",
  } });
  if (saved.status !== 200) throw new Error(`Student card save failed: ${JSON.stringify(saved)}`);
  const draft = await api(workPath, { idToken: assignedStudent.idToken });
  if (draft.status !== 200 || draft.result.cards?.[0]?.content !== "자동 저장 검증 카드" || draft.result.status !== "draft") throw new Error("Saved draft was not restored.");
  const resultsPath = `/api/teacher/activities/${activityId}/results`;
  const teacherResults = await api(resultsPath, { idToken: teacher.idToken });
  if (teacherResults.status !== 200 || teacherResults.result.submissions?.[0]?.cards?.[0]?.content !== "자동 저장 검증 카드") throw new Error("Teacher results did not include the saved student card.");
  const foreignResults = await api(resultsPath, { idToken: unassignedStudent.idToken });
  if (foreignResults.status !== 404) throw new Error(`Non-owner results should be 404, got ${foreignResults.status}.`);
  const foreignStatus = await api(resultsPath, { method: "PATCH", idToken: unassignedStudent.idToken, body: { status: "closed" } });
  if (foreignStatus.status !== 403) throw new Error(`Non-owner status change should be 403, got ${foreignStatus.status}.`);
  const closed = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { status: "closed" } });
  if (closed.status !== 200) throw new Error("Teacher could not close the activity.");
  const closedCode = await api("/api/activities/by-code/STW-Q7K9M");
  if (closedCode.status !== 404) throw new Error("Closed activity code should not resolve.");
  const closedWrite = await api(workPath, { method: "PUT", idToken: assignedStudent.idToken, body: {
    cards: [{ id: `card-${suffix}`, column: "see", content: "마감 후 수정 시도" }], status: "modified",
  } });
  if (closedWrite.status !== 403) throw new Error(`Closed activity write should be 403, got ${closedWrite.status}.`);
  const reopened = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { status: "active" } });
  if (reopened.status !== 200) throw new Error("Teacher could not reopen the activity.");
  const reopenedCode = await api("/api/activities/by-code/STW-Q7K9M");
  if (reopenedCode.status !== 200) throw new Error("Reopened activity code did not resolve.");
  const submitted = await api(workPath, { method: "PUT", idToken: assignedStudent.idToken, body: {
    cards: [{ id: `card-${suffix}`, column: "think", content: "제출 후 카드" }], status: "submitted",
  } });
  if (submitted.status !== 200) throw new Error("Student submission failed.");
  const restored = await api(workPath, { idToken: assignedStudent.idToken });
  if (restored.result.status !== "submitted" || restored.result.cards?.[0]?.column !== "think") throw new Error("Submitted work was not restored.");
  const deleted = await api(workPath, { method: "PUT", idToken: assignedStudent.idToken, body: { cards: [], status: "modified" } });
  if (deleted.status !== 200) throw new Error("Student card deletion failed.");
  const afterDelete = await api(workPath, { idToken: assignedStudent.idToken });
  if (afterDelete.result.cards?.length !== 0 || afterDelete.result.status !== "modified") throw new Error("Card deletion or modified status was not persisted.");

  const unassignedSession = await api("/api/student/session", { idToken: unassignedStudent.idToken });
  if (unassignedSession.status !== 403) throw new Error(`Unassigned session should be 403, got ${unassignedSession.status}.`);
  const unassignedDetail = await api(`/api/created-activities/${activityId}`, { idToken: unassignedStudent.idToken });
  if (unassignedDetail.status !== 404) throw new Error(`Unassigned detail should be 404, got ${unassignedDetail.status}.`);
  const unassignedWork = await api(workPath, { method: "PUT", idToken: unassignedStudent.idToken, body: { cards: [], status: "draft" } });
  if (unassignedWork.status !== 403) throw new Error(`Unassigned work write should be 403, got ${unassignedWork.status}.`);
  const anonymousDetail = await api(`/api/created-activities/${activityId}`);
  if (anonymousDetail.status !== 401) throw new Error(`Anonymous detail should be 401, got ${anonymousDetail.status}.`);

  console.log("PASS: teacher sees live cards, close blocks student writes, reopen restores editing, and submission lifecycle persists.");
} finally {
  if (teacher) await Promise.allSettled([
    sqlMutation("UnlinkStudentAuth", { studentId: `${teacher.uid}:s1` }, teacher.idToken),
    api(`/api/created-activities/${activityId}`, { method: "DELETE", idToken: teacher.idToken }),
  ]);
  await Promise.allSettled(idTokens.map(deleteIdentity));
}
