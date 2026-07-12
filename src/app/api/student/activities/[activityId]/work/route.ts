import {
  RoutineColumn,
  SubmissionStatus,
  type DeleteMyGroupThinkingCardVariables,
  type DeleteMyThinkingCardVariables,
  type GetMyGroupWorkData,
  type GetMyStudentWorkData,
  type SetMyGroupAgreementVariables,
  type SetMyGroupSubmissionVariables,
  type SetMyIndividualSubmissionVariables,
  type UpsertMyGroupThinkingCardVariables,
  type UpsertMyThinkingCardVariables,
} from "@/lib/dataconnect-generated";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery, SqlConnectAuthorizationError } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

type CardInput = { id?: unknown; column?: unknown; content?: unknown };

function fromColumn(column: RoutineColumn) {
  if (column === RoutineColumn.THINK) return "think";
  if (column === RoutineColumn.WONDER) return "wonder";
  return "see";
}

function toColumn(column: string) {
  if (column === "think") return RoutineColumn.THINK;
  if (column === "wonder") return RoutineColumn.WONDER;
  return RoutineColumn.SEE;
}

function fromStatus(status?: SubmissionStatus) {
  if (status === SubmissionStatus.SUBMITTED) return "submitted";
  if (status === SubmissionStatus.MODIFIED) return "modified";
  return "draft";
}

function toStatus(status: string) {
  if (status === "submitted") return SubmissionStatus.SUBMITTED;
  if (status === "modified") return SubmissionStatus.MODIFIED;
  return SubmissionStatus.DRAFT;
}

function cardStorageId(uid: string, cardId: string) {
  return `${uid}:${cardId}`;
}

function cardExternalId(uid: string, cardId: string) {
  const prefix = `${uid}:`;
  return cardId.startsWith(prefix) ? cardId.slice(prefix.length) : cardId;
}

async function getWork(activityId: string, idToken: string) {
  return executeUserQuery<GetMyStudentWorkData, { activityId: string }>("GetMyStudentWork", { activityId }, idToken);
}

async function getGroupWork(activityId: string, idToken: string) {
  return executeUserQuery<GetMyGroupWorkData, { activityId: string }>("GetMyGroupWork", { activityId }, idToken);
}

function groupCardExternalId(groupId: string, cardId: string) {
  const prefix = `${groupId}:`;
  return cardId.startsWith(prefix) ? cardId.slice(prefix.length) : cardId;
}

export async function GET(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const groupData = await getGroupWork(activityId, user.idToken);
    const membership = groupData.activityGroupMembers[0];
    if (membership) {
      const student = groupData.students[0];
      if (!student) return Response.json({ message: "Student account is not linked" }, { status: 403 });
      const group = membership.activityGroup;
      const attendance = new Map(groupData.activityAttendances.map((item) => [item.student.id, item.status]));
      return Response.json({
        mode: "group",
        student: { id: student.externalId ?? student.id, name: student.name, className: student.schoolClass.name },
        group: {
          id: group.id,
          name: group.name,
          members: group.activityGroupMembers_on_activityGroup.map((member) => ({
            id: member.student.externalId ?? member.student.id,
            name: member.student.name,
            present: attendance.get(member.student.id) !== "ABSENT",
          })),
        },
        cards: group.groupThinkingCards_on_activityGroup.map((card) => ({
          id: groupCardExternalId(group.id, card.id),
          column: fromColumn(card.column),
          content: card.content,
          updatedAt: card.updatedAt,
          updatedBy: { id: card.updatedByStudent.externalId ?? card.updatedByStudent.id, name: card.updatedByStudent.name },
        })),
        agreements: Object.fromEntries(group.groupSubmissionAgreements_on_activityGroup.map((agreement) => [agreement.student.externalId ?? agreement.student.id, agreement.agreed])),
        status: fromStatus(group.groupSubmissions_on_activityGroup[0]?.status),
        readOnly: group.activity.status === "CLOSED",
        serverTime: new Date().toISOString(),
        aiFeedback: null,
      });
    }
    const data = await getWork(activityId, user.idToken);
    const student = data.students[0];
    if (!student) return Response.json({ message: "Student account is not linked" }, { status: 403 });
    const aiFeedback = [...data.aiAnalyses].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];

    return Response.json({
      mode: "individual",
      student: { id: student.externalId ?? student.id, name: student.name, className: student.schoolClass.name },
      cards: data.thinkingCards.map((card) => ({
        id: cardExternalId(user.claims.uid, card.id),
        column: fromColumn(card.column),
        content: card.content,
        publicTags: card.tagsPublic ? card.tags ?? [] : [],
      })),
      status: fromStatus(data.individualSubmissions[0]?.status),
      aiFeedback: aiFeedback ? {
        id: aiFeedback.id,
        model: aiFeedback.model,
        summary: aiFeedback.summary,
        strengths: aiFeedback.strengths ?? [],
        nextQuestions: aiFeedback.nextQuestions ?? [],
        recommendations: aiFeedback.recommendations ?? [],
        updatedAt: aiFeedback.updatedAt,
      } : null,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "Student work is not editable" }, { status: 403 });
    throw error;
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const body = (await request.json()) as { action?: unknown; card?: CardInput; cardId?: unknown; agreed?: unknown; status?: unknown };
    const data = await getGroupWork(activityId, user.idToken);
    const student = data.students[0];
    const group = data.activityGroupMembers[0]?.activityGroup;
    if (!student || !group) return Response.json({ message: "Student is not assigned to an activity group" }, { status: 403 });
    const common = { activityId, activityGroupId: group.id, studentId: student.id };

    if (body.action === "upsertCard") {
      const card = { id: String(body.card?.id ?? ""), column: String(body.card?.column ?? ""), content: String(body.card?.content ?? "") };
      if (!card.id || !["see", "think", "wonder"].includes(card.column) || card.content.length > 2000) return Response.json({ message: "Invalid card" }, { status: 400 });
      await executeUserMutation<unknown, UpsertMyGroupThinkingCardVariables>("UpsertMyGroupThinkingCard", { ...common, externalId: card.id, column: toColumn(card.column), content: card.content }, user.idToken);
    } else if (body.action === "deleteCard") {
      const cardId = String(body.cardId ?? "");
      if (!cardId) return Response.json({ message: "Invalid card" }, { status: 400 });
      await executeUserMutation<unknown, DeleteMyGroupThinkingCardVariables>("DeleteMyGroupThinkingCard", { ...common, externalId: cardId }, user.idToken);
    } else if (body.action === "agreement") {
      if (typeof body.agreed !== "boolean") return Response.json({ message: "Invalid agreement" }, { status: 400 });
      await executeUserMutation<unknown, SetMyGroupAgreementVariables>("SetMyGroupAgreement", { ...common, agreed: body.agreed }, user.idToken);
    } else if (body.action === "submit") {
      const presentIds = new Set(data.activityAttendances.filter((item) => item.status !== "ABSENT").map((item) => item.student.id));
      const memberIds = group.activityGroupMembers_on_activityGroup.map((member) => member.student.id).filter((id) => presentIds.has(id));
      const agreedIds = new Set(group.groupSubmissionAgreements_on_activityGroup.filter((item) => item.agreed).map((item) => item.student.id));
      if (!memberIds.length || memberIds.some((id) => !agreedIds.has(id))) return Response.json({ message: "All present group members must agree before submission" }, { status: 409 });
      await executeUserMutation<unknown, SetMyGroupSubmissionVariables>("SetMyGroupSubmission", { ...common, status: SubmissionStatus.SUBMITTED }, user.idToken);
    } else {
      return Response.json({ message: "Invalid group work action" }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "Group work is not editable" }, { status: 403 });
    throw error;
  }
}

export async function PUT(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const body = (await request.json()) as { cards?: CardInput[]; status?: unknown };
    if (!Array.isArray(body.cards) || body.cards.length > 100 || !["draft", "submitted", "modified"].includes(String(body.status))) {
      return Response.json({ message: "Invalid student work payload" }, { status: 400 });
    }
    const cards = body.cards.map((card) => ({ id: String(card.id ?? ""), column: String(card.column ?? ""), content: String(card.content ?? "") }));
    if (cards.some((card) => !card.id || !["see", "think", "wonder"].includes(card.column) || card.content.length > 2000)) {
      return Response.json({ message: "Invalid card" }, { status: 400 });
    }

    const current = await getWork(activityId, user.idToken);
    const student = current.students[0];
    if (!student) return Response.json({ message: "Student account is not linked" }, { status: 403 });
    const nextIds = new Set(cards.map((card) => cardStorageId(user.claims.uid, card.id)));

    for (const card of cards) {
      await executeUserMutation<unknown, UpsertMyThinkingCardVariables>("UpsertMyThinkingCard", {
        externalId: card.id,
        activityId,
        studentId: student.id,
        column: toColumn(card.column),
        content: card.content,
      }, user.idToken);
    }
    for (const card of current.thinkingCards.filter((card) => !nextIds.has(card.id))) {
      await executeUserMutation<unknown, DeleteMyThinkingCardVariables>("DeleteMyThinkingCard", {
        externalId: cardExternalId(user.claims.uid, card.id),
        activityId,
        studentId: student.id,
      }, user.idToken);
    }
    await executeUserMutation<unknown, SetMyIndividualSubmissionVariables>("SetMyIndividualSubmission", {
      activityId,
      studentId: student.id,
      status: toStatus(String(body.status)),
    }, user.idToken);

    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "Student work is not editable" }, { status: 403 });
    throw error;
  }
}
