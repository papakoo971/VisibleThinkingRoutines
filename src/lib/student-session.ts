import { getFirebaseAuth } from "@/lib/firebase-auth";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";

export type StudentSession = {
  student: {
    id: string;
    studentNumber: string;
    name: string;
    className: string;
  };
  activities: CreatedActivityPayload[];
};

export async function fetchStudentSession(): Promise<StudentSession> {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");

  const response = await fetch("/api/student/session", {
    cache: "no-store",
    headers: { Authorization: `Bearer ${await user.getIdToken()}` },
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(result.message === "Student account is not linked" ? "연결된 학생 정보가 없습니다." : "학생 정보를 불러오지 못했습니다.");
  }

  return response.json() as Promise<StudentSession>;
}
