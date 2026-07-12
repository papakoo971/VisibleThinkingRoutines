import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { RoutineColumn } from "@/lib/mock-data";

export type StudentWork = {
  mode: "individual" | "group";
  student: { id: string; name: string; className: string };
  cards: Array<{ id: string; column: RoutineColumn; content: string; publicTags?: string[]; updatedAt?: string; updatedBy?: { id: string; name: string } }>;
  status: "draft" | "submitted" | "modified";
  group?: { id: string; name: string; members: Array<{ id: string; name: string; present: boolean }> };
  agreements?: Record<string, boolean>;
  readOnly?: boolean;
  serverTime?: string;
  aiFeedback: null | {
    id: string;
    model: string;
    summary: string | null;
    strengths: string[];
    nextQuestions: string[];
    recommendations: string[];
    updatedAt: string;
  };
};

async function authorizationHeader() {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  return { Authorization: `Bearer ${await user.getIdToken()}` };
}

export async function fetchStudentWork(activityId: string): Promise<StudentWork> {
  const response = await fetch(`/api/student/activities/${activityId}/work`, {
    cache: "no-store",
    headers: await authorizationHeader(),
  });
  if (!response.ok) throw new Error("작성 내용을 불러오지 못했습니다.");
  return response.json() as Promise<StudentWork>;
}

export async function saveStudentWork(activityId: string, work: Pick<StudentWork, "cards" | "status">) {
  const response = await fetch(`/api/student/activities/${activityId}/work`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(await authorizationHeader()) },
    body: JSON.stringify(work),
  });
  if (!response.ok) throw new Error("작성 내용을 저장하지 못했습니다.");
}

async function mutateGroupWork(activityId: string, body: object) {
  const response = await fetch(`/api/student/activities/${activityId}/work`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(await authorizationHeader()) },
    body: JSON.stringify(body),
  });
  const result = (await response.json()) as { message?: string };
  if (!response.ok) throw new Error(result.message ?? "모둠 작성 내용을 저장하지 못했습니다.");
}

export const upsertGroupCard = (activityId: string, card: StudentWork["cards"][number]) => mutateGroupWork(activityId, { action: "upsertCard", card });
export const deleteGroupCard = (activityId: string, cardId: string) => mutateGroupWork(activityId, { action: "deleteCard", cardId });
export const setMyGroupAgreement = (activityId: string, agreed: boolean) => mutateGroupWork(activityId, { action: "agreement", agreed });
export const submitGroupWork = (activityId: string) => mutateGroupWork(activityId, { action: "submit" });
