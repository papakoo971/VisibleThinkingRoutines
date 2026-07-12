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
  const email = `student-access-${label}-${suffix}@example.com`;
  const password = `Tmp-${suffix}!Aa1`;
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Test account creation failed: ${JSON.stringify(result)}`);
  idTokens.push(result.idToken);
  return { uid: result.localId, idToken: result.idToken, email, password };
}

async function signIn(email, password) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const result = await response.json();
  return { status: response.status, result };
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
  await sqlMutation("UpsertStudent", { externalId: "s2", schoolClassId: `${teacher.uid}:5학년 1반`, studentNumber: `S2-${suffix}`, name: "모둠 검증 학생", passwordIssued: false }, teacher.idToken);
  const managementPath = "/api/teacher/class-management";
  const management = await api(managementPath, { idToken: teacher.idToken });
  const classId = `${teacher.uid}:5학년 1반`;
  if (management.status !== 200 || !management.result.classes?.some((item) => item.id === classId) || management.result.students?.filter((item) => item.classId === classId).length !== 2) throw new Error("Live class and student management data was incomplete.");
  const createdGroup = await api(managementPath, { method: "POST", idToken: teacher.idToken, body: { action: "createGroup", classId, name: "검증 모둠" } });
  const groupId = createdGroup.result.groups?.find((item) => item.name === "검증 모둠")?.id;
  if (createdGroup.status !== 201 || !groupId) throw new Error("Default group creation failed.");
  const assignedGroup = await api(managementPath, { method: "PATCH", idToken: teacher.idToken, body: { action: "assignStudent", classId, groupId, studentId: `${teacher.uid}:s1` } });
  if (!assignedGroup.result.groups?.find((item) => item.id === groupId)?.studentIds.includes(`${teacher.uid}:s1`)) throw new Error("Default group assignment did not persist.");
  const randomized = await api(managementPath, { method: "POST", idToken: teacher.idToken, body: { action: "randomize", classId, mode: "groupSize", value: 2 } });
  if (randomized.status !== 201 || randomized.result.groups?.filter((item) => item.classId === classId).length !== 1 || randomized.result.groups.find((item) => item.classId === classId)?.studentIds.length !== 2) throw new Error("Random default group assignment failed.");
  const foreignGroup = await api(managementPath, { method: "POST", idToken: unassignedStudent.idToken, body: { action: "createGroup", classId, name: "침입 모둠" } });
  if (foreignGroup.status !== 403) throw new Error(`Non-owner group creation should be 403, got ${foreignGroup.status}.`);
  const updatedStudent = await api(`/api/teacher/students/${encodeURIComponent(`${teacher.uid}:s2`)}`, { method: "PATCH", idToken: teacher.idToken, body: { name: "수정된 학생", studentNumber: `UPDATED-${suffix}`, classId } });
  if (updatedStudent.status !== 200 || !(await api(managementPath, { idToken: teacher.idToken })).result.students.some((item) => item.id === `${teacher.uid}:s2` && item.name === "수정된 학생")) throw new Error("Student profile update failed.");
  const foreignStudentUpdate = await api(`/api/teacher/students/${encodeURIComponent(`${teacher.uid}:s1`)}`, { method: "PATCH", idToken: unassignedStudent.idToken, body: { name: "침입", studentNumber: "INTRUDER", classId } });
  if (foreignStudentUpdate.status !== 404) throw new Error(`Non-owner student update should be hidden with 404, got ${foreignStudentUpdate.status}.`);
  const resetPassword = await api(`/api/teacher/students/${encodeURIComponent(`${teacher.uid}:s1`)}`, { method: "POST", idToken: teacher.idToken, body: { action: "resetPassword" } });
  if (resetPassword.status === 200 && typeof resetPassword.result.password === "string") {
    const oldPasswordLogin = await signIn(assignedStudent.email, assignedStudent.password);
    const newPasswordLogin = await signIn(assignedStudent.email, resetPassword.result.password);
    if (oldPasswordLogin.status === 200 || newPasswordLogin.status !== 200) throw new Error("Reset student password did not replace the old password.");
    assignedStudent.idToken = newPasswordLogin.result.idToken;
    idTokens.push(assignedStudent.idToken);
  } else if (resetPassword.status !== 503) {
    throw new Error(`Student password reset failed unexpectedly: ${JSON.stringify(resetPassword)}`);
  }
  const deletedStudent = await api(`/api/teacher/students/${encodeURIComponent(`${teacher.uid}:s2`)}`, { method: "DELETE", idToken: teacher.idToken });
  if (deletedStudent.status !== 200 || (await api(managementPath, { idToken: teacher.idToken })).result.students.some((item) => item.id === `${teacher.uid}:s2`)) throw new Error("Student deletion failed.");

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
  if (teacherResults.result.submissionSummary?.submittedCount !== 0 || teacherResults.result.submissionSummary?.targetCount !== 1 || teacherResults.result.submissionSummary?.rate !== 0) throw new Error("Teacher submission summary was incorrect for a draft.");
  const prematureStudentAnalysis = await api(`/api/teacher/activities/${activityId}/analysis`, { method: "POST", idToken: teacher.idToken, body: { scope: "student", studentId: "s1" } });
  if (prematureStudentAnalysis.status !== 409 || prematureStudentAnalysis.result.message !== "Student submission is required") throw new Error("Individual AI analysis should require a submitted response.");
  const aiSettingsPath = "/api/teacher/ai-settings";
  const emptySettings = await api(aiSettingsPath, { idToken: teacher.idToken });
  if (emptySettings.status !== 200 || emptySettings.result.configured !== false) throw new Error("New teacher unexpectedly has AI settings.");
  const savedSettings = await api(aiSettingsPath, { method: "PUT", idToken: teacher.idToken, body: { provider: "google", model: "gemini-2.5-flash", apiKey: "AIza-invalid-smoke-test-key-1234567890" } });
  if (savedSettings.status !== 200 || savedSettings.result.provider !== "google" || savedSettings.result.model !== "gemini-2.5-flash" || savedSettings.result.keyHint !== "7890") throw new Error(`AI settings save failed: ${JSON.stringify(savedSettings)}`);
  const changedModel = await api(aiSettingsPath, { method: "PUT", idToken: teacher.idToken, body: { provider: "google", model: "gemini-2.5-pro" } });
  if (changedModel.status !== 200 || changedModel.result.model !== "gemini-2.5-pro" || changedModel.result.keyHint !== "7890") throw new Error("AI model-only update failed.");
  const maskedSettings = await api(aiSettingsPath, { idToken: teacher.idToken });
  if (!maskedSettings.result.configured || maskedSettings.result.model !== "gemini-2.5-pro" || maskedSettings.result.keyHint !== "7890" || "encryptedApiKey" in maskedSettings.result || "apiKey" in maskedSettings.result) throw new Error("AI settings were not safely masked.");
  const invalidConnection = await api(aiSettingsPath, { method: "POST", idToken: teacher.idToken });
  if (invalidConnection.status !== 502 || invalidConnection.result.errorCode !== "invalid_key") throw new Error(`Invalid provider credentials were not classified correctly: ${JSON.stringify(invalidConnection)}`);
  const foreignSettings = await api(aiSettingsPath, { idToken: unassignedStudent.idToken });
  if (foreignSettings.status !== 200 || foreignSettings.result.configured !== false) throw new Error("AI credentials leaked across users.");
  const analysisPath = `/api/teacher/activities/${activityId}/analysis`;
  const invalidProviderCall = await api(analysisPath, { method: "POST", idToken: teacher.idToken, body: { scope: "class" } });
  if (invalidProviderCall.status !== 502) throw new Error(`Invalid saved provider key should reach the provider and return 502, got ${invalidProviderCall.status}.`);
  const foreignAnalysis = await api(analysisPath, { method: "POST", idToken: unassignedStudent.idToken, body: { scope: "class" } });
  if (foreignAnalysis.status !== 404) throw new Error(`Non-owner AI analysis should be 404, got ${foreignAnalysis.status}.`);
  const analysisId = `${activityId}:class:smoke`;
  await sqlMutation("UpsertAiAnalysis", {
    id: analysisId,
    activityId,
    scope: "class",
    studentExternalId: null,
    studentAuthUid: null,
    status: "complete",
    model: "smoke/model",
    summary: "검증 요약",
    strengths: ["강점"],
    misconceptions: [],
    nextQuestions: ["질문"],
    recommendations: ["추천"],
    sourceFingerprint: teacherResults.result.sourceFingerprint,
    inputTokens: 10,
    outputTokens: 20,
    totalTokens: 30,
    errorMessage: null,
  }, teacher.idToken);
  const resultsWithAnalysis = await api(resultsPath, { idToken: teacher.idToken });
  const savedAnalysis = resultsWithAnalysis.result.analyses?.find((analysis) => analysis.id === analysisId);
  if (savedAnalysis?.summary !== "검증 요약" || savedAnalysis.totalTokens !== 30 || savedAnalysis.sourceFingerprint !== teacherResults.result.sourceFingerprint) {
    throw new Error(`Persisted AI analysis was not returned correctly: ${JSON.stringify(savedAnalysis)}`);
  }
  const studentAnalysisId = `${activityId}:student:smoke`;
  await sqlMutation("UpsertAiAnalysis", {
    id: studentAnalysisId,
    activityId,
    scope: "student",
    studentExternalId: "s1",
    studentAuthUid: assignedStudent.uid,
    status: "complete",
    model: "smoke/model",
    summary: "학생 공개 검증 요약",
    strengths: ["학생 공개 강점"],
    misconceptions: ["교사 전용 오개념"],
    nextQuestions: ["학생 공개 질문"],
    recommendations: ["학생 공개 추천"],
    sourceFingerprint: teacherResults.result.submissions[0].sourceFingerprint,
    inputTokens: 10,
    outputTokens: 20,
    totalTokens: 30,
    errorMessage: null,
  }, teacher.idToken);
  const beforeFeedback = await api(workPath, { idToken: assignedStudent.idToken });
  if (beforeFeedback.result.aiFeedback !== null) throw new Error("Private AI feedback leaked to the student.");
  const foreignVisibility = await api(resultsPath, { method: "PATCH", idToken: unassignedStudent.idToken, body: { analysisId: studentAnalysisId, studentVisible: true } });
  if (foreignVisibility.status !== 403) throw new Error(`Non-owner AI visibility update should be 403, got ${foreignVisibility.status}.`);
  const publishedFeedback = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { analysisId: studentAnalysisId, studentVisible: true } });
  if (publishedFeedback.status !== 200) throw new Error("Teacher could not publish student AI feedback.");
  const visibleFeedback = await api(workPath, { idToken: assignedStudent.idToken });
  if (visibleFeedback.result.aiFeedback?.summary !== "학생 공개 검증 요약" || "misconceptions" in (visibleFeedback.result.aiFeedback ?? {})) throw new Error("Published AI feedback was missing or exposed teacher-only fields.");
  const hiddenFeedback = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { analysisId: studentAnalysisId, studentVisible: false } });
  if (hiddenFeedback.status !== 200 || (await api(workPath, { idToken: assignedStudent.idToken })).result.aiFeedback !== null) throw new Error("Teacher could not hide student AI feedback.");
  const cardId = teacherResults.result.submissions[0].cards[0].id;
  const tagged = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { cardId, tags: ["좋은 관찰", "사용자 태그"], tagsPublic: true } });
  if (tagged.status !== 200) throw new Error("Teacher card tag update failed.");
  const publicWork = await api(workPath, { idToken: assignedStudent.idToken });
  if (!publicWork.result.cards?.[0]?.publicTags?.includes("사용자 태그")) throw new Error("Public tags were not visible to the student.");
  const foreignResults = await api(resultsPath, { idToken: unassignedStudent.idToken });
  if (foreignResults.status !== 404) throw new Error(`Non-owner results should be 404, got ${foreignResults.status}.`);
  const foreignTag = await api(resultsPath, { method: "PATCH", idToken: unassignedStudent.idToken, body: { cardId, tags: ["오개념"], tagsPublic: true } });
  if (foreignTag.status !== 403) throw new Error(`Non-owner tag update should be 403, got ${foreignTag.status}.`);
  const foreignStatus = await api(resultsPath, { method: "PATCH", idToken: unassignedStudent.idToken, body: { status: "closed" } });
  if (foreignStatus.status !== 403) throw new Error(`Non-owner status change should be 403, got ${foreignStatus.status}.`);
  const hidden = await api(resultsPath, { method: "PATCH", idToken: teacher.idToken, body: { cardId, tags: ["교사용 태그"], tagsPublic: false } });
  if (hidden.status !== 200) throw new Error("Teacher could not hide card tags.");
  const privateWork = await api(workPath, { idToken: assignedStudent.idToken });
  if (privateWork.result.cards?.[0]?.publicTags?.length !== 0) throw new Error("Private teacher tags leaked to the student.");
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
  const changedResults = await api(resultsPath, { idToken: teacher.idToken });
  if (changedResults.result.sourceFingerprint === savedAnalysis.sourceFingerprint) throw new Error("Changed cards did not invalidate the saved AI analysis fingerprint.");
  if (changedResults.result.submissionSummary?.submittedCount !== 1 || changedResults.result.submissionSummary?.targetCount !== 1 || changedResults.result.submissionSummary?.rate !== 100) throw new Error("Teacher submission summary was incorrect after submission.");
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
  const removedSettings = await api(aiSettingsPath, { method: "DELETE", idToken: teacher.idToken });
  if (removedSettings.status !== 200) throw new Error("Teacher AI settings deletion failed.");

  console.log("PASS: live class/default-group management, encrypted AI settings, teacher-approved feedback, owner checks, and activity lifecycle all persist.");
} finally {
  if (teacher) {
    await Promise.allSettled([
      api("/api/teacher/ai-settings", { method: "DELETE", idToken: teacher.idToken }),
      sqlMutation("UnlinkStudentAuth", { studentId: `${teacher.uid}:s1` }, teacher.idToken),
      api(`/api/created-activities/${activityId}`, { method: "DELETE", idToken: teacher.idToken }),
    ]);
    await Promise.allSettled([
      sqlMutation("DeleteStudent", { id: `${teacher.uid}:s1` }, teacher.idToken),
      sqlMutation("DeleteStudent", { id: `${teacher.uid}:s2` }, teacher.idToken),
    ]);
    await sqlMutation("DeleteSchoolClass", { id: `${teacher.uid}:5학년 1반` }, teacher.idToken).catch(() => undefined);
  }
  await Promise.allSettled(idTokens.map(deleteIdentity));
}
