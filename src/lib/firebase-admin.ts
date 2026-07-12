import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getFirebaseAdminApp() {
  if (getApps().length > 0) return getApp();

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  return initializeApp({
    projectId,
    ...(serviceAccountJson ? { credential: cert(JSON.parse(serviceAccountJson)) } : {}),
  });
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}
