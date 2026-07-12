import { getFirebaseAuth } from "@/lib/firebase-auth";

export type ClassManagement = {
  classes: Array<{ id: string; name: string }>;
  students: Array<{ id: string; externalId?: string | null; studentNumber: string; name: string; passwordIssued: boolean; classId: string; className: string }>;
  groups: Array<{ id: string; name: string; classId: string; studentIds: string[] }>;
};

async function request(method = "GET", body?: object) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("교사 로그인이 필요합니다.");
  const response = await fetch("/api/teacher/class-management", {
    method,
    cache: "no-store",
    headers: { Authorization: `Bearer ${await user.getIdToken()}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = (await response.json()) as ClassManagement & { message?: string };
  if (!response.ok) throw new Error(result.message ?? "학급 관리 요청을 처리하지 못했습니다.");
  return result;
}

export const fetchClassManagement = () => request();
export const createClass = (name: string) => request("POST", { action: "createClass", name });
export const deleteClass = (id: string) => request("DELETE", { type: "class", id });
export const createDefaultGroup = (classId: string, name: string) => request("POST", { action: "createGroup", classId, name });
export const randomizeDefaultGroups = (classId: string, mode: "groupCount" | "groupSize", value: number) => request("POST", { action: "randomize", classId, mode, value });
export const deleteDefaultGroup = (id: string) => request("DELETE", { type: "group", id });
export const assignStudentToDefaultGroup = (classId: string, groupId: string, studentId: string) => request("PATCH", { action: "assignStudent", classId, groupId, studentId });

async function studentRequest(studentId: string, method: string, body?: object) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("교사 로그인이 필요합니다.");
  const response = await fetch(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
    method,
    headers: { Authorization: `Bearer ${await user.getIdToken()}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = (await response.json()) as { message?: string; password?: string };
  if (!response.ok) throw new Error(result.message ?? "학생 관리 요청을 처리하지 못했습니다.");
  return result;
}

export const updateStudent = (studentId: string, input: { name: string; studentNumber: string; classId: string }) => studentRequest(studentId, "PATCH", input);
export const resetStudentPassword = (studentId: string) => studentRequest(studentId, "POST", { action: "resetPassword" });
export const deleteStudent = (studentId: string) => studentRequest(studentId, "DELETE");
