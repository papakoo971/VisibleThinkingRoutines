import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { AiProvider } from "@/lib/ai-credential";

export type AiSettings = { configured: boolean; provider: AiProvider | null; keyHint: string | null; updatedAt: string | null };

async function authorizationHeaders(includeJson = false) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("교사 로그인이 필요합니다.");
  return { Authorization: `Bearer ${await user.getIdToken()}`, ...(includeJson ? { "Content-Type": "application/json" } : {}) };
}

export async function fetchAiSettings() {
  const response = await fetch("/api/teacher/ai-settings", { cache: "no-store", headers: await authorizationHeaders() });
  if (!response.ok) throw new Error("AI 설정을 불러오지 못했습니다.");
  return response.json() as Promise<AiSettings>;
}

export async function saveAiSettings(provider: AiProvider, apiKey: string) {
  const response = await fetch("/api/teacher/ai-settings", {
    method: "PUT",
    headers: await authorizationHeaders(true),
    body: JSON.stringify({ provider, apiKey }),
  });
  const result = (await response.json()) as AiSettings & { message?: string };
  if (!response.ok) throw new Error(result.message ?? "AI 설정을 저장하지 못했습니다.");
  return result;
}

export async function deleteAiSettings() {
  const response = await fetch("/api/teacher/ai-settings", { method: "DELETE", headers: await authorizationHeaders() });
  if (!response.ok) throw new Error("AI 설정을 삭제하지 못했습니다.");
}
