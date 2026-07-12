import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { RoutineColumn } from "@/lib/mock-data";

export type TeacherActivityResults = {
  activity: { id: string; title: string; routine: string; activityMode: "individual" | "group"; subject: string; status: "active" | "closed" };
  students: Array<{ id: string; name: string; studentNumber: string; className: string; attendance: "present" | "absent" }>;
  submissions: Array<{
    studentId: string;
    status: "draft" | "submitted" | "modified";
    cards: Array<{ id: string; studentId: string; column: RoutineColumn; content: string; tags: string[]; tagsPublic: boolean }>;
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
