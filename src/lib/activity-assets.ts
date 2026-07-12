import QRCode from "qrcode";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirebaseAuth } from "@/lib/firebase-auth";
import { getFirebaseClientApp } from "@/lib/firebase-client";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export async function uploadActivityMaterial(activityId: string, file: File) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("교사 로그인이 필요합니다.");
  if (!allowedTypes.has(file.type)) throw new Error("JPG, PNG, WebP 또는 PDF 파일만 업로드할 수 있습니다.");
  if (file.size > 10 * 1024 * 1024) throw new Error("자료 파일은 10MB 이하여야 합니다.");

  const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "_");
  const object = ref(getStorage(getFirebaseClientApp()), `teachers/${user.uid}/activities/${activityId}/${safeName}`);
  await uploadBytes(object, file, { contentType: file.type });
  return { url: await getDownloadURL(object), name: file.name, type: file.type === "application/pdf" ? "pdf" : "image" };
}

export function generateActivityCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return `STW-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
}

export function generateActivityQr(url: string) {
  return QRCode.toDataURL(url, { width: 320, margin: 2, color: { dark: "#18181b", light: "#ffffff" } });
}
