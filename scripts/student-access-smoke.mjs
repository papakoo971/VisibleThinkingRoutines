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
    activity: { id: activityId, title: "학생 접근 검증", routine: "See-Think-Wonder", activityMode: "individual", subject: "통합 테스트", classes: ["5학년 1반"], status: "active", code: "STUDENT-ACCESS", materialType: "image", activityDate: "2026-07-12", submittedCount: 0, targetCount: 1 },
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
  if (assignedDetail.status !== 200 || assignedDetail.result.activity?.activity.id !== activityId) throw new Error("Assigned student detail failed.");

  const unassignedSession = await api("/api/student/session", { idToken: unassignedStudent.idToken });
  if (unassignedSession.status !== 403) throw new Error(`Unassigned session should be 403, got ${unassignedSession.status}.`);
  const unassignedDetail = await api(`/api/created-activities/${activityId}`, { idToken: unassignedStudent.idToken });
  if (unassignedDetail.status !== 404) throw new Error(`Unassigned detail should be 404, got ${unassignedDetail.status}.`);
  const anonymousDetail = await api(`/api/created-activities/${activityId}`);
  if (anonymousDetail.status !== 401) throw new Error(`Anonymous detail should be 401, got ${anonymousDetail.status}.`);

  console.log("PASS: assigned student access succeeds; unassigned and anonymous activity access is denied.");
} finally {
  if (teacher) await Promise.allSettled([
    sqlMutation("UnlinkStudentAuth", { studentId: `${teacher.uid}:s1` }, teacher.idToken),
    api(`/api/created-activities/${activityId}`, { method: "DELETE", idToken: teacher.idToken }),
  ]);
  await Promise.allSettled(idTokens.map(deleteIdentity));
}
