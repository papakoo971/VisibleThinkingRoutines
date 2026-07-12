import { getAuth } from "firebase/auth";
import { getFirebaseClientApp } from "@/lib/firebase-client";

export function getFirebaseAuth() {
  return getAuth(getFirebaseClientApp());
}
