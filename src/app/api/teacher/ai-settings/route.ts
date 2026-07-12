import { generateText } from "ai";
import type { GetMyAiCredentialData, UpsertMyAiCredentialVariables } from "@/lib/dataconnect-generated";
import { createTeacherAiModel, decryptApiKey, encryptApiKey } from "@/lib/ai-credential";
import { classifyAiProviderError } from "@/lib/ai-provider-error";
import { defaultAiModel, isAiModel, isAiProvider } from "@/lib/ai-models";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { executeUserMutation, executeUserQuery } from "@/lib/server-sql-connect";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const data = await executeUserQuery<GetMyAiCredentialData, Record<string, never>>("GetMyAiCredential", {}, user.idToken);
    const credential = data.teacherAiCredential;
    return Response.json({
      configured: Boolean(credential && isAiProvider(credential.provider)),
      provider: credential && isAiProvider(credential.provider) ? credential.provider : null,
      model: credential && isAiProvider(credential.provider) ? credential.model ?? defaultAiModel(credential.provider) : null,
      keyHint: credential?.keyHint ?? null,
      updatedAt: credential?.updatedAt ?? null,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const body = (await request.json()) as { provider?: unknown; model?: unknown; apiKey?: unknown };
    if (!isAiProvider(body.provider) || !isAiModel(body.provider, body.model)) {
      return Response.json({ message: "Provider 또는 모델이 올바르지 않습니다." }, { status: 400 });
    }
    const currentData = await executeUserQuery<GetMyAiCredentialData, Record<string, never>>("GetMyAiCredential", {}, user.idToken);
    const current = currentData.teacherAiCredential;
    const newApiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
    if (!newApiKey && (!current || current.provider !== body.provider)) {
      return Response.json({ message: "Provider를 변경하려면 새 API 키를 입력해 주세요." }, { status: 400 });
    }
    if (newApiKey && (newApiKey.length < 20 || newApiKey.length > 300)) {
      return Response.json({ message: "API 키 형식이 올바르지 않습니다." }, { status: 400 });
    }
    let encrypted: { encryptedApiKey: string; initializationVector: string; authenticationTag: string; keyHint: string };
    try {
      encrypted = newApiKey ? encryptApiKey(newApiKey) : {
        encryptedApiKey: current!.encryptedApiKey,
        initializationVector: current!.initializationVector,
        authenticationTag: current!.authenticationTag,
        keyHint: current!.keyHint,
      };
    } catch {
      return Response.json({ message: "서버의 AI 키 암호화 설정이 필요합니다." }, { status: 503 });
    }
    await executeUserMutation<unknown, UpsertMyAiCredentialVariables>("UpsertMyAiCredential", {
      provider: body.provider,
      model: body.model,
      ...encrypted,
    }, user.idToken);
    return Response.json({ configured: true, provider: body.provider, model: body.model, keyHint: encrypted.keyHint, updatedAt: new Date().toISOString() });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    await executeUserMutation<unknown, Record<string, never>>("DeleteMyAiCredential", {}, user.idToken);
    return Response.json({ configured: false, provider: null, model: null, keyHint: null, updatedAt: null });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const data = await executeUserQuery<GetMyAiCredentialData, Record<string, never>>("GetMyAiCredential", {}, user.idToken);
    const credential = data.teacherAiCredential;
    if (!credential || !isAiProvider(credential.provider)) return Response.json({ message: "AI API key is not configured" }, { status: 409 });
    const modelId = credential.model ?? defaultAiModel(credential.provider);
    if (!isAiModel(credential.provider, modelId)) return Response.json({ message: "Configured AI model is not supported" }, { status: 409 });
    let apiKey: string;
    try {
      apiKey = decryptApiKey(credential);
    } catch {
      return Response.json({ message: "AI credential encryption is not configured" }, { status: 503 });
    }
    try {
      const selected = createTeacherAiModel(credential.provider, modelId, apiKey);
      await generateText({
        model: selected.model,
        prompt: "연결 확인에 '확인'이라고 짧게 답하세요.",
        maxOutputTokens: 12,
        maxRetries: 1,
        timeout: 20_000,
        abortSignal: request.signal,
      });
      return Response.json({ ok: true, provider: credential.provider, model: modelId });
    } catch (error) {
      return Response.json({ message: "AI provider connection failed", errorCode: classifyAiProviderError(error) }, { status: 502 });
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
