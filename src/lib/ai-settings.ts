import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { AiProvider } from "@/lib/ai-models";

export type AiSettings = { configured: boolean; provider: AiProvider | null; model: string | null; keyHint: string | null; updatedAt: string | null };

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

export async function saveAiSettings(provider: AiProvider, model: string, apiKey?: string) {
  const response = await fetch("/api/teacher/ai-settings", {
    method: "PUT",
    headers: await authorizationHeaders(true),
    body: JSON.stringify({ provider, model, apiKey }),
  });
  const result = (await response.json()) as AiSettings & { message?: string };
  if (!response.ok) throw new Error(result.message ?? "AI 설정을 저장하지 못했습니다.");
  return result;
}

export async function deleteAiSettings() {
  const response = await fetch("/api/teacher/ai-settings", { method: "DELETE", headers: await authorizationHeaders() });
  if (!response.ok) throw new Error("AI 설정을 삭제하지 못했습니다.");
}

export async function testAiSettings() {
  const response = await fetch("/api/teacher/ai-settings", { method: "POST", headers: await authorizationHeaders() });
  const result = (await response.json()) as { ok?: boolean; message?: string; errorCode?: string };
  if (!response.ok) {
    if (result.errorCode === "invalid_key") throw new Error("API 키가 유효하지 않습니다.");
    if (result.errorCode === "rate_limit") throw new Error("호출 한도 또는 사용량을 확인해 주세요.");
    if (result.errorCode === "timeout") throw new Error("연결 확인 시간이 초과되었습니다.");
    throw new Error("AI 제공자에 연결하지 못했습니다.");
  }
  return result;
}
