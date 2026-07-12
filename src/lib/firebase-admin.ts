import { applicationDefault, cert } from "firebase-admin/app";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";

function getFirebaseAdminApp() {
  if (getApps().length > 0) return getApp();

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  return initializeApp({
    projectId,
    credential: serviceAccountJson ? cert(JSON.parse(serviceAccountJson)) : applicationDefault(),
  });
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getVisibleThinkingAdminDataConnect() {
  return getDataConnect(
    {
      location: "asia-northeast3",
      serviceId: "visible-thinking",
      connector: "teacher",
    },
    getFirebaseAdminApp()
  );
}
