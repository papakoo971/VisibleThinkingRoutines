import { readFile } from "node:fs/promises";

const envText = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(envText.split(/\r?\n/).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
  const separator = line.indexOf("=");
  return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, "")];
}));
const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY;
const bucket = env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`;
if (!projectId || !apiKey) throw new Error("Firebase configuration is incomplete.");

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
let identity;

async function signUp() {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: `storage-smoke-${suffix}@example.com`, password: `Tmp-${suffix}!Aa1`, returnSecureToken: true }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Signup failed: ${JSON.stringify(result)}`);
  return { uid: result.localId, idToken: result.idToken };
}

function objectUrl(path, media = false) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}${media ? "?alt=media" : ""}`;
}

async function upload(path, idToken) {
  return fetch(`https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(path)}`, {
    method: "POST",
    headers: { Authorization: `Firebase ${idToken}`, "Content-Type": "image/png" },
    body: png,
  });
}

try {
  identity = await signUp();
  const ownPath = `teachers/${identity.uid}/activities/storage-smoke-${suffix}/pixel.png`;
  const ownUpload = await upload(ownPath, identity.idToken);
  if (!ownUpload.ok) throw new Error(`Own-path upload failed (${ownUpload.status}): ${await ownUpload.text()}`);

  const read = await fetch(objectUrl(ownPath, true), { headers: { Authorization: `Firebase ${identity.idToken}` } });
  if (!read.ok) throw new Error(`Authenticated read failed (${read.status}).`);

  const foreignUpload = await upload(`teachers/someone-else/activities/test/pixel.png`, identity.idToken);
  if (foreignUpload.status !== 403) throw new Error(`Foreign-path upload should be 403, got ${foreignUpload.status}.`);

  const removed = await fetch(objectUrl(ownPath), { method: "DELETE", headers: { Authorization: `Firebase ${identity.idToken}` } });
  if (!removed.ok) throw new Error(`Cleanup delete failed (${removed.status}).`);
  console.log(`PASS: Storage bucket ${bucket} allows owner upload/read/delete and rejects foreign-path writes.`);
} finally {
  if (identity) {
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: identity.idToken }),
    });
  }
}
