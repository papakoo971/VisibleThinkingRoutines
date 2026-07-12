import { randomInt, randomUUID } from "node:crypto";
import type {
  AssignDefaultGroupMemberVariables,
  CreateDefaultGroupVariables,
  DeleteDefaultGroupVariables,
  GetClassManagementData,
  RemoveDefaultGroupMemberVariables,
  RenameDefaultGroupVariables,
  RenameSchoolClassVariables,
  UpsertSchoolClassVariables,
} from "@/lib/dataconnect-generated";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery, SqlConnectAuthorizationError } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

function validName(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 80;
}

async function getManagement(idToken: string) {
  return executeUserQuery<GetClassManagementData, Record<string, never>>("GetClassManagement", {}, idToken);
}

function dto(data: GetClassManagementData) {
  return {
    classes: data.schoolClasses.map((schoolClass) => ({ id: schoolClass.id, name: schoolClass.name })),
    students: data.students.map((student) => ({
      id: student.id,
      externalId: student.externalId,
      studentNumber: student.studentNumber,
      name: student.name,
      passwordIssued: student.passwordIssued,
      classId: student.schoolClass.id,
      className: student.schoolClass.name,
    })),
    groups: data.defaultGroups.map((group) => ({
      id: group.id,
      name: group.name,
      classId: group.schoolClass.id,
      studentIds: group.defaultGroupMembers_on_defaultGroup.map((member) => member.student.id),
    })),
  };
}

export async function GET(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    return Response.json(dto(await getManagement(user.idToken)));
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const body = (await request.json()) as { action?: unknown; name?: unknown; classId?: unknown; mode?: unknown; value?: unknown };
    if (body.action === "randomize" && typeof body.classId === "string" && (body.mode === "groupCount" || body.mode === "groupSize") && Number.isInteger(body.value) && Number(body.value) >= 2 && Number(body.value) <= 20) {
      const current = await getManagement(user.idToken);
      const students = current.students.filter((student) => student.schoolClass.id === body.classId);
      if (students.length < 2) return Response.json({ message: "자동 배정에는 학생이 2명 이상 필요합니다." }, { status: 400 });
      for (const group of current.defaultGroups.filter((item) => item.schoolClass.id === body.classId)) {
        await executeUserMutation<unknown, DeleteDefaultGroupVariables>("DeleteDefaultGroup", { id: group.id }, user.idToken);
      }
      const requested = Number(body.value);
      const groupCount = body.mode === "groupCount" ? Math.min(requested, students.length) : Math.ceil(students.length / requested);
      const shuffled = [...students];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = randomInt(index + 1);
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
      const groups = Array.from({ length: groupCount }, (_, index) => ({ id: `${user.claims.uid}:default-group:${randomUUID()}`, name: `${index + 1}모둠` }));
      for (const group of groups) {
        await executeUserMutation<unknown, CreateDefaultGroupVariables>("CreateDefaultGroup", { id: group.id, schoolClassId: body.classId, name: group.name }, user.idToken);
      }
      for (const [index, student] of shuffled.entries()) {
        await executeUserMutation<unknown, AssignDefaultGroupMemberVariables>("AssignDefaultGroupMember", {
          defaultGroupId: groups[index % groups.length].id,
          studentId: student.id,
          schoolClassId: body.classId,
        }, user.idToken);
      }
      return Response.json(dto(await getManagement(user.idToken)), { status: 201 });
    }
    if (!validName(body.name)) return Response.json({ message: "이름은 1~80자로 입력해 주세요." }, { status: 400 });
    if (body.action === "createClass") {
      await executeUserMutation<unknown, UpsertSchoolClassVariables>("UpsertSchoolClass", { name: body.name.trim() }, user.idToken);
    } else if (body.action === "createGroup" && typeof body.classId === "string") {
      await executeUserMutation<unknown, CreateDefaultGroupVariables>("CreateDefaultGroup", {
        id: `${user.claims.uid}:default-group:${randomUUID()}`,
        schoolClassId: body.classId,
        name: body.name.trim(),
      }, user.idToken);
    } else {
      return Response.json({ message: "올바르지 않은 생성 요청입니다." }, { status: 400 });
    }
    return Response.json(dto(await getManagement(user.idToken)), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const body = (await request.json()) as { action?: unknown; id?: unknown; name?: unknown; studentId?: unknown; groupId?: unknown; classId?: unknown };
    if (body.action === "renameClass" && typeof body.id === "string" && validName(body.name)) {
      await executeUserMutation<unknown, RenameSchoolClassVariables>("RenameSchoolClass", { id: body.id, name: body.name.trim() }, user.idToken);
    } else if (body.action === "renameGroup" && typeof body.id === "string" && validName(body.name)) {
      await executeUserMutation<unknown, RenameDefaultGroupVariables>("RenameDefaultGroup", { id: body.id, name: body.name.trim() }, user.idToken);
    } else if (body.action === "assignStudent" && typeof body.studentId === "string" && typeof body.groupId === "string" && typeof body.classId === "string") {
      const current = await getManagement(user.idToken);
      const existing = current.defaultGroups.find((group) => group.defaultGroupMembers_on_defaultGroup.some((member) => member.student.id === body.studentId));
      if (existing && existing.id !== body.groupId) {
        await executeUserMutation<unknown, RemoveDefaultGroupMemberVariables>("RemoveDefaultGroupMember", { defaultGroupId: existing.id, studentId: body.studentId }, user.idToken);
      }
      await executeUserMutation<unknown, AssignDefaultGroupMemberVariables>("AssignDefaultGroupMember", {
        defaultGroupId: body.groupId,
        studentId: body.studentId,
        schoolClassId: body.classId,
      }, user.idToken);
    } else {
      return Response.json({ message: "올바르지 않은 변경 요청입니다." }, { status: 400 });
    }
    return Response.json(dto(await getManagement(user.idToken)));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const body = (await request.json()) as { type?: unknown; id?: unknown };
    if (typeof body.id !== "string") return Response.json({ message: "삭제 ID가 필요합니다." }, { status: 400 });
    if (body.type === "group") {
      await executeUserMutation<unknown, DeleteDefaultGroupVariables>("DeleteDefaultGroup", { id: body.id }, user.idToken);
    } else if (body.type === "class") {
      const current = await getManagement(user.idToken);
      if (current.students.some((student) => student.schoolClass.id === body.id)) return Response.json({ message: "학생이 있는 학급은 삭제할 수 없습니다." }, { status: 409 });
      await executeUserMutation<unknown, { id: string }>("DeleteSchoolClass", { id: body.id }, user.idToken);
    } else {
      return Response.json({ message: "올바르지 않은 삭제 요청입니다." }, { status: 400 });
    }
    return Response.json(dto(await getManagement(user.idToken)));
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
  if (error instanceof UnauthorizedError) return unauthorizedResponse();
  if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "이 데이터에 대한 권한이 없습니다." }, { status: 403 });
  throw error;
}
