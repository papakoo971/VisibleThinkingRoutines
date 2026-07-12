import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { RoutineColumn } from "@/lib/mock-data";

export type StudentWork = {
  student: { id: string; name: string; className: string };
  cards: Array<{ id: string; column: RoutineColumn; content: string; publicTags?: string[] }>;
  status: "draft" | "submitted" | "modified";
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
