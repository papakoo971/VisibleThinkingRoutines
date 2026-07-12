import { readFile } from "node:fs/promises";

const envText = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, "")];
    })
);

const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY;
const appId = env.NEXT_PUBLIC_FIREBASE_APP_ID;
const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000";

if (!projectId || !apiKey || !appId) throw new Error("Firebase configuration is incomplete.");

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const activityIds = [`isolation-a-${suffix}`, `isolation-b-${suffix}`];
const groupIds = [`isolation-ga-${suffix}`, `isolation-gb-${suffix}`];
const users = [];

async function createTestIdentity(label) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `isolation-${label}-${suffix}@example.com`,
      password: `Tmp-${suffix}!Aa1`,
      returnSecureToken: true,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Test account creation failed: ${JSON.stringify(result)}`);
  users.push(result.idToken);
  return { uid: result.localId, idToken: result.idToken };
}

async function deleteTestIdentity(idToken) {
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
}

function payload(activityId, groupId, label) {
  return {
    activity: {
      id: activityId,
      title: `격리 검증 ${label}`,
      routine: "See-Think-Wonder",
      activityMode: "group",
      subject: "통합 테스트",
      classes: ["5학년 1반"],
      status: "active",
      code: `ISO-${label}`,
      materialType: "image",
      activityDate: "2026-07-12",
      submittedCount: 0,
      targetCount: 1,
    },
    activityAttendance: [{ activityId, studentId: "s1", status: "present" }],
    activityGroups: [{ id: groupId, activityId, name: "격리 모둠", studentIds: ["s1"] }],
    groupSubmissions: [{
      activityId,
      groupId,
      status: "draft",
      cards: [],
      agreements: [{ activityId, groupId, studentId: "s1", agreed: true }],
    }],
    individualSubmissions: [],
    routes: { teacherResults: `/teacher/activities/${activityId}/results`, studentEntry: `/student/activities/${activityId}` },
  };
}

async function api(path, { idToken, method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}), ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`${method} ${path} failed (${response.status}): ${JSON.stringify(result)}`);
  return result;
}

async function sqlMutation(operationName, variables, idToken) {
  const connectorPath = `projects/${projectId}/locations/asia-northeast3/services/visible-thinking/connectors/teacher`;
  const response = await fetch(
    `https://firebasedataconnect.googleapis.com/v1/${connectorPath}:executeMutation?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Firebase-Auth-Token": idToken, "x-firebase-gmpid": appId },
      body: JSON.stringify({ name: connectorPath, operationName, variables }),
    }
  );
  return { ok: response.ok, result: await response.json() };
}

let teacherA;
let teacherB;
try {
  teacherA = await createTestIdentity("a");
  teacherB = await createTestIdentity("b");

  await api("/api/created-activities", { method: "POST", idToken: teacherA.idToken, body: payload(activityIds[0], groupIds[0], "A") });
  await api("/api/created-activities", { method: "POST", idToken: teacherB.idToken, body: payload(activityIds[1], groupIds[1], "B") });

  const detailA = (await api(`/api/created-activities/${activityIds[0]}`)).activity;
  const detailB = (await api(`/api/created-activities/${activityIds[1]}`)).activity;
  for (const detail of [detailA, detailB]) {
    if (detail.activityAttendance[0]?.studentId !== "s1") throw new Error("Attendance student ID was not restored.");
    if (detail.activityGroups[0]?.studentIds[0] !== "s1") throw new Error("Group member student ID was not restored.");
    if (detail.groupSubmissions[0]?.agreements[0]?.studentId !== "s1") throw new Error("Agreement student ID was not restored.");
  }

  const crossOwner = await sqlMutation(
    "UpsertActivityAttendance",
    { activityId: activityIds[1], studentId: `${teacherA.uid}:s1`, status: "PRESENT" },
    teacherB.idToken
  );
  if (crossOwner.ok && !crossOwner.result.errors?.length) throw new Error("Cross-owner student reference was unexpectedly accepted.");

  const listA = (await api("/api/created-activities", { idToken: teacherA.idToken })).activities;
  const listB = (await api("/api/created-activities", { idToken: teacherB.idToken })).activities;
  if (!listA.some((item) => item.activity.id === activityIds[0]) || listA.some((item) => item.activity.id === activityIds[1])) {
    throw new Error("Teacher A activity list is not isolated.");
  }
  if (!listB.some((item) => item.activity.id === activityIds[1]) || listB.some((item) => item.activity.id === activityIds[0])) {
    throw new Error("Teacher B activity list is not isolated.");
  }

  console.log("PASS: two teachers can reuse class/student IDs, response IDs are restored, and cross-owner references are rejected.");
} finally {
  await Promise.allSettled([
    teacherA && api(`/api/created-activities/${activityIds[0]}`, { method: "DELETE", idToken: teacherA.idToken }),
    teacherB && api(`/api/created-activities/${activityIds[1]}`, { method: "DELETE", idToken: teacherB.idToken }),
  ].filter(Boolean));
  await Promise.allSettled(users.map(deleteTestIdentity));
}
