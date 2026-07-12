import { createHash } from "node:crypto";
import {
  ActivityMode,
  ActivityStatus,
  AttendanceStatus,
  RoutineColumn,
  SubmissionStatus,
  type GetTeacherActivityResultsData,
  type SetActivityStatusVariables,
  type SetAiAnalysisVisibilityVariables,
  type UpdateThinkingCardTagsVariables,
} from "@/lib/dataconnect-generated";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery, SqlConnectAuthorizationError } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

function externalStudentId(student: { id: string; externalId?: string | null }) {
  return student.externalId ?? student.id;
}

function columnName(column: RoutineColumn) {
  if (column === RoutineColumn.THINK) return "think";
  if (column === RoutineColumn.WONDER) return "wonder";
  return "see";
}

function submissionName(status: SubmissionStatus) {
  if (status === SubmissionStatus.SUBMITTED) return "submitted";
  if (status === SubmissionStatus.MODIFIED) return "modified";
  return "draft";
}

export async function GET(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const data = await executeUserQuery<GetTeacherActivityResultsData, { id: string }>("GetTeacherActivityResults", { id: activityId }, user.idToken);
    const activity = data.activities[0];
    if (!activity) return Response.json({ message: "Activity not found" }, { status: 404 });

    const students = new Map(activity.activityAttendances_on_activity.map((attendance) => [externalStudentId(attendance.student), {
      id: externalStudentId(attendance.student),
      name: attendance.student.name,
      studentNumber: attendance.student.studentNumber,
      className: attendance.student.schoolClass.name,
      attendance: attendance.status === AttendanceStatus.ABSENT ? "absent" : "present",
    }]));
    const sourceFingerprint = createHash("sha256").update(JSON.stringify(activity.thinkingCards_on_activity.map((card) => [card.id, card.updatedAt, card.content]))).digest("hex");
    const presentStudentIds = new Set(activity.activityAttendances_on_activity
      .filter((attendance) => attendance.status !== AttendanceStatus.ABSENT)
      .map((attendance) => attendance.student.id));
    const individualSubmittedCount = activity.individualSubmissions_on_activity.filter((submission) =>
      presentStudentIds.has(submission.student.id) && submission.status === SubmissionStatus.SUBMITTED
    ).length;
    const groupSubmittedCount = activity.activityGroups_on_activity.filter((group) => group.groupSubmissions_on_activityGroup[0]?.status === SubmissionStatus.SUBMITTED).length;
    const submittedCount = activity.activityMode === ActivityMode.GROUP ? groupSubmittedCount : individualSubmittedCount;
    const targetCount = activity.activityMode === ActivityMode.GROUP ? activity.activityGroups_on_activity.length : presentStudentIds.size;

    return Response.json({
      activity: {
        id: activity.id,
        title: activity.title,
        routine: activity.routine,
        activityMode: activity.activityMode === ActivityMode.GROUP ? "group" : "individual",
        subject: activity.subject,
        status: activity.status === ActivityStatus.CLOSED ? "closed" : "active",
      },
      students: Array.from(students.values()),
      submissionSummary: {
        submittedCount,
        targetCount,
        rate: targetCount ? Math.round((submittedCount / targetCount) * 100) : 0,
      },
      submissions: activity.individualSubmissions_on_activity.map((submission) => ({
        studentId: externalStudentId(submission.student),
        status: submissionName(submission.status),
        sourceFingerprint: createHash("sha256").update(JSON.stringify(activity.thinkingCards_on_activity.filter((card) => card.student.id === submission.student.id).map((card) => [card.id, card.updatedAt, card.content]))).digest("hex"),
        cards: activity.thinkingCards_on_activity.filter((card) => card.student.id === submission.student.id).map((card) => ({
          id: card.id,
          studentId: externalStudentId(card.student),
          column: columnName(card.column),
          content: card.content,
          tags: card.tags ?? [],
          tagsPublic: card.tagsPublic,
          updatedAt: card.updatedAt,
        })),
      })),
      groupSubmissions: activity.activityGroups_on_activity.map((group) => ({
        groupId: group.id,
        groupName: group.name,
        status: submissionName(group.groupSubmissions_on_activityGroup[0]?.status ?? SubmissionStatus.DRAFT),
        agreements: group.groupSubmissionAgreements_on_activityGroup.map((agreement) => ({
          studentId: externalStudentId(agreement.student),
          studentName: agreement.student.name,
          agreed: agreement.agreed,
        })),
        cards: group.groupThinkingCards_on_activityGroup.map((card) => ({
          id: card.id,
          updatedByStudentId: externalStudentId(card.updatedByStudent),
          updatedByStudentName: card.updatedByStudent.name,
          column: columnName(card.column),
          content: card.content,
          updatedAt: card.updatedAt,
        })),
      })),
      sourceFingerprint,
      analyses: activity.aiAnalyses_on_activity.map((analysis) => ({
        id: analysis.id,
        scope: analysis.scope,
        studentId: analysis.studentExternalId,
        studentVisible: analysis.studentVisible,
        status: analysis.status,
        model: analysis.model,
        summary: analysis.summary,
        strengths: analysis.strengths ?? [],
        misconceptions: analysis.misconceptions ?? [],
        nextQuestions: analysis.nextQuestions ?? [],
        recommendations: analysis.recommendations ?? [],
        sourceFingerprint: analysis.sourceFingerprint,
        inputTokens: analysis.inputTokens,
        outputTokens: analysis.outputTokens,
        totalTokens: analysis.totalTokens,
        errorMessage: analysis.errorMessage,
        updatedAt: analysis.updatedAt,
      })),
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const body = (await request.json()) as { status?: unknown };
    const analysisBody = body as { analysisId?: unknown; studentVisible?: unknown };
    if (typeof analysisBody.analysisId === "string") {
      if (typeof analysisBody.studentVisible !== "boolean") return Response.json({ message: "Invalid analysis visibility" }, { status: 400 });
      await executeUserMutation<unknown, SetAiAnalysisVisibilityVariables>("SetAiAnalysisVisibility", {
        id: analysisBody.analysisId,
        studentVisible: analysisBody.studentVisible,
      }, user.idToken);
      return Response.json({ analysisId: analysisBody.analysisId, studentVisible: analysisBody.studentVisible });
    }
    const tagBody = body as { cardId?: unknown; tags?: unknown; tagsPublic?: unknown };
    if (typeof tagBody.cardId === "string") {
      if (!Array.isArray(tagBody.tags) || tagBody.tags.length > 8 || tagBody.tags.some((tag) => typeof tag !== "string" || !tag.trim() || tag.trim().length > 30) || typeof tagBody.tagsPublic !== "boolean") {
        return Response.json({ message: "Invalid tags" }, { status: 400 });
      }
      const tags = Array.from(new Set(tagBody.tags.map((tag) => tag.trim())));
      await executeUserMutation<unknown, UpdateThinkingCardTagsVariables>("UpdateThinkingCardTags", {
        id: tagBody.cardId,
        tags,
        tagsPublic: tagBody.tagsPublic,
      }, user.idToken);
      return Response.json({ cardId: tagBody.cardId, tags, tagsPublic: tagBody.tagsPublic });
    }
    if (body.status !== "active" && body.status !== "closed") return Response.json({ message: "Invalid status" }, { status: 400 });
    await executeUserMutation<unknown, SetActivityStatusVariables>("SetActivityStatus", {
      id: activityId,
      status: body.status === "closed" ? ActivityStatus.CLOSED : ActivityStatus.ACTIVE,
    }, user.idToken);
    return Response.json({ status: body.status });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof SqlConnectAuthorizationError) return Response.json({ message: "You do not own this activity" }, { status: 403 });
    throw error;
  }
}
