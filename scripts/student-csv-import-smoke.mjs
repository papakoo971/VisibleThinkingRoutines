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
const className = `CSV 검증반 ${suffix}`;
const studentNumber = `csv${Date.now()}`;
let teacher;
let studentIdToken;

async function signUp(email, password) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Signup failed: ${JSON.stringify(result)}`);
  return { uid: result.localId, idToken: result.idToken };
}

async function signIn(email, password) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Signin failed: ${JSON.stringify(result)}`);
  return result.idToken;
}

async function deleteIdentity(idToken) {
  if (!idToken) return;
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }),
  });
}

async function mutation(operationName, variables, idToken) {
  const connectorPath = `projects/${projectId}/locations/asia-northeast3/services/visible-thinking/connectors/teacher`;
  const response = await fetch(`https://firebasedataconnect.googleapis.com/v1/${connectorPath}:executeMutation?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Firebase-Auth-Token": idToken, "x-firebase-gmpid": appId },
    body: JSON.stringify({ name: connectorPath, operationName, variables }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length) throw new Error(`${operationName} failed: ${JSON.stringify(result)}`);
}

async function api(path, { idToken, method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method, headers: { ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}), ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, result: await response.json() };
}

try {
  teacher = await signUp(`csv-teacher-${suffix}@example.com`, `Tmp-${suffix}!Aa1`);
  await mutation("UpsertMyTeacherProfile", { email: `csv-teacher-${suffix}@example.com`, displayName: "CSV 검증 교사", operationMode: "CLASS_FIRST" }, teacher.idToken);
  const rows = [{ className, studentNumber, name: "CSV학생" }];
  const imported = await api("/api/teacher/students/import", { method: "POST", idToken: teacher.idToken, body: { rows } });
  if (imported.status !== 201 || imported.result.successCount !== 1) throw new Error(`Import failed: ${JSON.stringify(imported)}`);
  const credential = imported.result.credentials[0];
  studentIdToken = await signIn(credential.email, credential.password);
  const studentSession = await api("/api/student/session", { idToken: studentIdToken });
  if (studentSession.status !== 200 || studentSession.result.student?.studentNumber !== studentNumber) throw new Error("Issued student login failed.");
  const studentImportAttempt = await api("/api/teacher/students/import", { method: "POST", idToken: studentIdToken, body: { rows } });
  if (studentImportAttempt.status !== 403) throw new Error("Student account unexpectedly accessed the teacher import endpoint.");
  const duplicate = await api("/api/teacher/students/import", { method: "POST", idToken: teacher.idToken, body: { rows } });
  if (duplicate.status !== 201 || duplicate.result.errorCount !== 1 || duplicate.result.successCount !== 0) throw new Error("Duplicate student number was not rejected.");
  console.log("PASS: CSV import issues a working student account, rejects student-role access, and blocks duplicate numbers.");
} finally {
  if (teacher) await Promise.allSettled([
    mutation("DeleteStudent", { id: `${teacher.uid}:${studentNumber}` }, teacher.idToken),
    mutation("DeleteMyTeacherProfile", {}, teacher.idToken),
  ]);
  if (teacher) await Promise.allSettled([mutation("DeleteSchoolClass", { id: `${teacher.uid}:${className}` }, teacher.idToken)]);
  await Promise.allSettled([deleteIdentity(studentIdToken), deleteIdentity(teacher?.idToken)]);
}
