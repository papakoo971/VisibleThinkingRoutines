import type {
  GetMyTeacherProfileData,
  LinkStudentAuthVariables,
  ListMyStudentsData,
  UpsertSchoolClassVariables,
  UpsertStudentVariables,
} from "@/lib/dataconnect-generated";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

type StudentImportRow = { className?: unknown; studentNumber?: unknown; name?: unknown };
type FirebaseSignUpResult = { localId?: string; idToken?: string; error?: { message?: string } };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function temporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

function studentEmail(uid: string, studentNumber: string) {
  const safeNumber = studentNumber.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `student-${uid}-${safeNumber}@visible-thinking.invalid`;
}

async function createFirebaseStudent(email: string, password: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) throw new Error("Firebase API key is missing.");

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    cache: "no-store",
  });
  const result = (await response.json()) as FirebaseSignUpResult;
  if (!response.ok || !result.localId || !result.idToken) {
    throw new Error(result.error?.message === "EMAIL_EXISTS" ? "이미 발급된 학번입니다." : "Firebase 학생 계정을 만들지 못했습니다.");
  }
  return { uid: result.localId, idToken: result.idToken };
}

async function deleteFirebaseStudent(idToken: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return;
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const body = (await request.json()) as { rows?: StudentImportRow[] };
    const rows = body.rows;

    if (!Array.isArray(rows) || rows.length === 0 || rows.length > 200) {
      return Response.json({ message: "학생 행은 1개 이상 200개 이하로 입력해 주세요." }, { status: 400 });
    }

    const profile = await executeUserQuery<GetMyTeacherProfileData, Record<string, never>>(
      "GetMyTeacherProfile",
      {},
      user.idToken
    );
    if (!profile.teacherProfile) return Response.json({ message: "Teacher account is required" }, { status: 403 });

    const current = await executeUserQuery<ListMyStudentsData, Record<string, never>>("ListMyStudents", {}, user.idToken);
    const existingNumbers = new Set(current.students.map((student) => student.studentNumber));
    const seenNumbers = new Set<string>();
    const credentials: Array<{ className: string; studentNumber: string; name: string; email: string; password: string }> = [];
    const errors: Array<{ row: number; message: string }> = [];

    for (const [index, row] of rows.entries()) {
      const rowNumber = index + 2;
      const className = text(row.className);
      const studentNumber = text(row.studentNumber);
      const name = text(row.name);

      if (!className || !studentNumber || !name) {
        errors.push({ row: rowNumber, message: "학급, 학번, 이름은 모두 필수입니다." });
        continue;
      }
      if (className.length > 80 || name.length > 80 || !/^[A-Za-z0-9_-]{1,32}$/.test(studentNumber)) {
        errors.push({ row: rowNumber, message: "학급·이름은 80자 이하, 학번은 영문·숫자·-_ 조합 32자 이하로 입력해 주세요." });
        continue;
      }
      if (existingNumbers.has(studentNumber) || seenNumbers.has(studentNumber)) {
        errors.push({ row: rowNumber, message: "이미 등록되었거나 파일 안에서 중복된 학번입니다." });
        continue;
      }
      seenNumbers.add(studentNumber);

      const password = temporaryPassword();
      const email = studentEmail(user.claims.uid, studentNumber);
      let firebaseStudent: Awaited<ReturnType<typeof createFirebaseStudent>> | undefined;

      try {
        await executeUserMutation<unknown, UpsertSchoolClassVariables>("UpsertSchoolClass", { name: className }, user.idToken);
        firebaseStudent = await createFirebaseStudent(email, password);
        await executeUserMutation<unknown, UpsertStudentVariables>("UpsertStudent", {
          externalId: studentNumber,
          schoolClassId: `${user.claims.uid}:${className}`,
          studentNumber,
          name,
          passwordIssued: true,
        }, user.idToken);
        await executeUserMutation<unknown, LinkStudentAuthVariables>("LinkStudentAuth", {
          studentId: `${user.claims.uid}:${studentNumber}`,
          authUid: firebaseStudent.uid,
        }, user.idToken);
        credentials.push({ className, studentNumber, name, email, password });
      } catch (error) {
        if (firebaseStudent) await deleteFirebaseStudent(firebaseStudent.idToken);
        await executeUserMutation<unknown, { id: string }>(
          "DeleteStudent",
          { id: `${user.claims.uid}:${studentNumber}` },
          user.idToken
        ).catch(() => undefined);
        errors.push({ row: rowNumber, message: error instanceof Error ? error.message : "학생 등록에 실패했습니다." });
      }
    }

    return Response.json({ total: rows.length, successCount: credentials.length, errorCount: errors.length, credentials, errors }, { status: 201 });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
