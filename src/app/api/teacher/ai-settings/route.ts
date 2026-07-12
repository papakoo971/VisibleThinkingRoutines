import type { GetMyAiCredentialData, UpsertMyAiCredentialVariables } from "@/lib/dataconnect-generated";
import { encryptApiKey, isAiProvider } from "@/lib/ai-credential";
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
    const body = (await request.json()) as { provider?: unknown; apiKey?: unknown };
    if (!isAiProvider(body.provider) || typeof body.apiKey !== "string" || body.apiKey.trim().length < 20 || body.apiKey.trim().length > 300) {
      return Response.json({ message: "Provider 또는 API 키 형식이 올바르지 않습니다." }, { status: 400 });
    }
    let encrypted;
    try {
      encrypted = encryptApiKey(body.apiKey.trim());
    } catch {
      return Response.json({ message: "서버의 AI 키 암호화 설정이 필요합니다." }, { status: 503 });
    }
    await executeUserMutation<unknown, UpsertMyAiCredentialVariables>("UpsertMyAiCredential", {
      provider: body.provider,
      ...encrypted,
    }, user.idToken);
    return Response.json({ configured: true, provider: body.provider, keyHint: encrypted.keyHint, updatedAt: new Date().toISOString() });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    await executeUserMutation<unknown, Record<string, never>>("DeleteMyAiCredential", {}, user.idToken);
    return Response.json({ configured: false, provider: null, keyHint: null, updatedAt: null });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
