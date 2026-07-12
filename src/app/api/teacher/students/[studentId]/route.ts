import type { GetClassManagementData, UpdateStudentVariables } from "@/lib/dataconnect-generated";
import { getFirebaseAdminAuth } from "@/lib/firebase-admin";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery, SqlConnectAuthorizationError } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

function temporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

async function getOwnedStudent(idToken: string, studentId: string) {
  const data = await executeUserQuery<GetClassManagementData, Record<string, never>>("GetClassManagement", {}, idToken);
  return { data, student: data.students.find((student) => student.id === studentId) };
}

export async function PATCH(request: Request, context: { params: Promise<{ studentId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { studentId } = await context.params;
    const body = (await request.json()) as { name?: unknown; studentNumber?: unknown; classId?: unknown };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const studentNumber = typeof body.studentNumber === "string" ? body.studentNumber.trim() : "";
    if (!name || name.length > 80 || !/^[A-Za-z0-9_-]{1,32}$/.test(studentNumber) || typeof body.classId !== "string") {
      return Response.json({ message: "이름, 학번 또는 학급이 올바르지 않습니다." }, { status: 400 });
    }
    const { data, student } = await getOwnedStudent(user.idToken, studentId);
    if (!student) return Response.json({ message: "학생을 찾을 수 없습니다." }, { status: 404 });
    if (data.students.some((item) => item.id !== studentId && item.studentNumber === studentNumber)) return Response.json({ message: "이미 사용 중인 학번입니다." }, { status: 409 });
    await executeUserMutation<unknown, UpdateStudentVariables>("UpdateStudent", { id: studentId, schoolClassId: body.classId, studentNumber, name }, user.idToken);
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, context: { params: Promise<{ studentId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { studentId } = await context.params;
    const body = (await request.json()) as { action?: unknown };
    if (body.action !== "resetPassword") return Response.json({ message: "올바르지 않은 요청입니다." }, { status: 400 });
    const { student } = await getOwnedStudent(user.idToken, studentId);
    if (!student) return Response.json({ message: "학생을 찾을 수 없습니다." }, { status: 404 });
    if (!student.authUid) return Response.json({ message: "연결된 학생 계정이 없습니다." }, { status: 409 });
    const password = temporaryPassword();
    await getFirebaseAdminAuth().updateUser(student.authUid, { password });
    return Response.json({ studentId, password });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ studentId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { studentId } = await context.params;
    const { student } = await getOwnedStudent(user.idToken, studentId);
    if (!student) return Response.json({ message: "학생을 찾을 수 없습니다." }, { status: 404 });
    if (student.authUid) await getFirebaseAdminAuth().getUser(student.authUid);
    await executeUserMutation<unknown, { id: string }>("DeleteStudent", { id: studentId }, user.idToken);
    if (student.authUid) await getFirebaseAdminAuth().deleteUser(student.authUid).catch((error: unknown) => {
      if (!(error instanceof Error) || !error.message.includes("no user record")) throw error;
    });
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
  if (error instanceof UnauthorizedError) return unauthorizedResponse();
  if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "학생 관리 권한이 없습니다." }, { status: 403 });
  if (typeof error === "object" && error && "code" in error && error.code === "app/invalid-credential") return Response.json({ message: "서버의 Firebase Admin 자격 증명이 필요합니다." }, { status: 503 });
  throw error;
}
