import { createHash, randomUUID } from "node:crypto";
import { generateText, Output } from "ai";
import { z } from "zod";
import type { GetTeacherActivityResultsData, UpsertAiAnalysisVariables } from "@/lib/dataconnect-generated";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

const analysisSchema = z.object({
  summary: z.string().min(1).max(1200),
  strengths: z.array(z.string().min(1).max(240)).max(5),
  misconceptions: z.array(z.string().min(1).max(240)).max(5),
  nextQuestions: z.array(z.string().min(1).max(240)).max(5),
  recommendations: z.array(z.string().min(1).max(240)).max(5),
});

export async function POST(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    const body = (await request.json()) as { scope?: unknown; studentId?: unknown };
    const scope = body.scope === "student" ? "student" : body.scope === "class" ? "class" : null;
    const studentId = typeof body.studentId === "string" ? body.studentId : null;
    if (!scope || (scope === "student" && !studentId)) return Response.json({ message: "Invalid analysis scope" }, { status: 400 });
    const data = await executeUserQuery<GetTeacherActivityResultsData, { id: string }>("GetTeacherActivityResults", { id: activityId }, user.idToken);
    const activity = data.activities[0];
    if (!activity) return Response.json({ message: "Activity not found" }, { status: 404 });
    const cards = activity.thinkingCards_on_activity.filter((card) => scope === "class" || (card.student.externalId ?? card.student.id) === studentId);
    if (!cards.length) return Response.json({ message: "No cards to analyze" }, { status: 400 });
    if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
      return Response.json({ message: "AI Gateway credentials are not configured" }, { status: 503 });
    }

    const sourceFingerprint = createHash("sha256").update(JSON.stringify(cards.map((card) => [card.id, card.updatedAt, card.content]))).digest("hex");
    const model = process.env.AI_ANALYSIS_MODEL ?? "openai/gpt-5.4";
    const analysisId = `${activityId}:${scope}:${randomUUID()}`;
    const base = { id: analysisId, activityId, scope, studentExternalId: studentId, model, sourceFingerprint };
    await saveAnalysis(user.idToken, { ...base, status: "pending" });

    try {
      const result = await generateText({
        model,
        output: Output.object({ schema: analysisSchema, name: "thinkingRoutineAnalysis" }),
        system: "당신은 학생의 사고과정을 지원하는 교육 분석가입니다. 평가나 낙인 대신 관찰 가능한 근거를 사용하고, 한국어로 간결하게 작성하세요.",
        prompt: `활동: ${activity.title}\n루틴: ${activity.routine}\n분석 범위: ${scope === "class" ? "학급 전체" : `학생 ${studentId}`}\n카드:\n${cards.map((card) => `[${card.column}] ${card.content}`).join("\n")}\n강점, 오개념 가능성, 후속 발문, 추천 후속 활동을 분석하세요.`,
      });
      const output = result.output;
      await saveAnalysis(user.idToken, {
        ...base,
        status: "complete",
        ...output,
        inputTokens: result.totalUsage.inputTokens,
        outputTokens: result.totalUsage.outputTokens,
        totalTokens: result.totalUsage.totalTokens,
      });
      return Response.json({ id: analysisId, status: "complete", ...output, model, sourceFingerprint, usage: result.totalUsage }, { status: 201 });
    } catch (error) {
      await saveAnalysis(user.idToken, { ...base, status: "error", errorMessage: error instanceof Error ? error.message.slice(0, 1000) : "AI generation failed" });
      return Response.json({ id: analysisId, status: "error", message: "AI analysis failed" }, { status: 502 });
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

function saveAnalysis(idToken: string, input: Omit<UpsertAiAnalysisVariables, "status"> & { status: string }) {
  return executeUserMutation<unknown, UpsertAiAnalysisVariables>("UpsertAiAnalysis", {
    summary: null, strengths: null, misconceptions: null, nextQuestions: null, recommendations: null,
    inputTokens: null, outputTokens: null, totalTokens: null, errorMessage: null,
    ...input,
  }, idToken);
}
