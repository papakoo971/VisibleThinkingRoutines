import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { RoutineColumn } from "@/lib/mock-data";

export type TeacherActivityResults = {
  activity: { id: string; title: string; routine: string; activityMode: "individual" | "group"; subject: string; status: "active" | "closed" };
  students: Array<{ id: string; name: string; studentNumber: string; className: string; attendance: "present" | "absent" }>;
  submissionSummary: { submittedCount: number; targetCount: number; rate: number };
  submissions: Array<{
    studentId: string;
    status: "draft" | "submitted" | "modified";
    sourceFingerprint: string;
    cards: Array<{ id: string; studentId: string; column: RoutineColumn; content: string; tags: string[]; tagsPublic: boolean; updatedAt: string }>;
  }>;
  groupSubmissions: Array<{
    groupId: string;
    groupName: string;
    status: "draft" | "submitted" | "modified";
    agreements: Array<{ studentId: string; studentName: string; agreed: boolean }>;
    cards: Array<{ id: string; updatedByStudentId: string; updatedByStudentName: string; column: RoutineColumn; content: string; updatedAt: string }>;
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
  const result = (await response.json()) as { message?: string; errorCode?: string };
  if (!response.ok) throw new Error(analysisErrorMessage(result));
  return result;
}

function analysisErrorMessage(result: { message?: string; errorCode?: string }) {
  if (result.message === "AI API key is not configured") return "왼쪽 아래 설정에서 AI API 키를 먼저 등록해 주세요.";
  if (result.message === "Student submission is required") return "학생이 제출을 완료한 뒤 개인 분석을 실행할 수 있습니다.";
  if (result.errorCode === "invalid_key") return "API 키가 유효하지 않습니다. AI 설정에서 키를 확인해 주세요.";
  if (result.errorCode === "rate_limit") return "AI 제공자의 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.";
  if (result.errorCode === "timeout") return "AI 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.";
  if (result.errorCode === "invalid_response") return "AI가 분석 형식에 맞는 응답을 만들지 못했습니다. 다시 시도해 주세요.";
  if (result.errorCode === "provider_unavailable") return "AI 제공자에 일시적인 장애가 있습니다. 잠시 후 다시 시도해 주세요.";
  return "AI 분석을 생성하지 못했습니다.";
}
