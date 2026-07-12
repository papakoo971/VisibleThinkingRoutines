import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { RoutineColumn } from "@/lib/mock-data";

export type TeacherActivityResults = {
  activity: { id: string; title: string; routine: string; activityMode: "individual" | "group"; subject: string; status: "active" | "closed" };
  students: Array<{ id: string; name: string; studentNumber: string; className: string; attendance: "present" | "absent" }>;
  submissions: Array<{
    studentId: string;
    status: "draft" | "submitted" | "modified";
    sourceFingerprint: string;
    cards: Array<{ id: string; studentId: string; column: RoutineColumn; content: string; tags: string[]; tagsPublic: boolean; updatedAt: string }>;
  }>;
  sourceFingerprint: string;
  analyses: Array<{
    id: string; scope: string; studentId?: string | null; studentVisible: boolean; status: string; model: string; summary?: string | null;
    strengths: string[]; misconceptions: string[]; nextQuestions: string[]; recommendations: string[];
    sourceFingerprint?: string | null; inputTokens?: number | null; outputTokens?: number | null; totalTokens?: number | null;
    errorMessage?: string | null; updatedAt: string;
  }>;
};

async function headers(includeJson = false) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("교사 로그인이 필요합니다.");
  return { Authorization: `Bearer ${await user.getIdToken()}`, ...(includeJson ? { "Content-Type": "application/json" } : {}) };
}

export async function fetchTeacherActivityResults(activityId: string) {
  const response = await fetch(`/api/teacher/activities/${activityId}/results`, { cache: "no-store", headers: await headers() });
  if (!response.ok) throw new Error("활동 결과를 불러오지 못했습니다.");
  return response.json() as Promise<TeacherActivityResults>;
}

export async function updateTeacherActivityStatus(activityId: string, status: "active" | "closed") {
  const response = await fetch(`/api/teacher/activities/${activityId}/results`, {
    method: "PATCH",
    headers: await headers(true),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("활동 상태를 변경하지 못했습니다.");
}

export async function updateTeacherCardTags(activityId: string, cardId: string, tags: string[], tagsPublic: boolean) {
  const response = await fetch(`/api/teacher/activities/${activityId}/results`, {
    method: "PATCH",
    headers: await headers(true),
    body: JSON.stringify({ cardId, tags, tagsPublic }),
  });
  if (!response.ok) throw new Error("카드 태그를 저장하지 못했습니다.");
}

export async function updateAnalysisVisibility(activityId: string, analysisId: string, studentVisible: boolean) {
  const response = await fetch(`/api/teacher/activities/${activityId}/results`, {
    method: "PATCH",
    headers: await headers(true),
    body: JSON.stringify({ analysisId, studentVisible }),
  });
  if (!response.ok) throw new Error("AI 피드백 공개 설정을 변경하지 못했습니다.");
}

export async function generateTeacherAnalysis(activityId: string, scope: "class" | "student", studentId?: string) {
  const response = await fetch(`/api/teacher/activities/${activityId}/analysis`, {
    method: "POST",
    headers: await headers(true),
    body: JSON.stringify({ scope, studentId }),
  });
  const result = (await response.json()) as { message?: string };
  if (!response.ok) throw new Error(result.message === "AI API key is not configured" ? "왼쪽 아래 설정에서 AI API 키를 먼저 등록해 주세요." : "AI 분석을 생성하지 못했습니다.");
  return result;
}
