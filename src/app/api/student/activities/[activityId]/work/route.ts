import {
  RoutineColumn,
  SubmissionStatus,
  type DeleteMyThinkingCardVariables,
  type GetMyStudentWorkData,
  type SetMyIndividualSubmissionVariables,
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

export async function GET(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const data = await getWork(activityId, user.idToken);
    const student = data.students[0];
    if (!student) return Response.json({ message: "Student account is not linked" }, { status: 403 });

    return Response.json({
      student: { id: student.externalId ?? student.id, name: student.name, className: student.schoolClass.name },
      cards: data.thinkingCards.map((card) => ({
        id: cardExternalId(user.claims.uid, card.id),
        column: fromColumn(card.column),
        content: card.content,
        publicTags: card.tagsPublic ? card.tags ?? [] : [],
      })),
      status: fromStatus(data.individualSubmissions[0]?.status),
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "Student work is not editable" }, { status: 403 });
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
