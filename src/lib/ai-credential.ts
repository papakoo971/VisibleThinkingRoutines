import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export const aiProviders = ["openai", "anthropic", "google"] as const;
export type AiProvider = (typeof aiProviders)[number];

export const aiProviderModels: Record<AiProvider, string> = {
  openai: "gpt-5.4",
  anthropic: "claude-sonnet-4-6",
  google: "gemini-2.5-flash",
};

export function isAiProvider(value: unknown): value is AiProvider {
  return typeof value === "string" && aiProviders.includes(value as AiProvider);
}

function encryptionKey() {
  const secret = process.env.AI_CREDENTIAL_ENCRYPTION_SECRET;
  if (!secret || secret.length < 32) throw new Error("AI credential encryption is not configured");
  return createHash("sha256").update(secret).digest();
}

export function encryptApiKey(apiKey: string) {
  const initializationVector = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), initializationVector);
  const encryptedApiKey = Buffer.concat([cipher.update(apiKey, "utf8"), cipher.final()]);
  return {
    encryptedApiKey: encryptedApiKey.toString("base64"),
    initializationVector: initializationVector.toString("base64"),
    authenticationTag: cipher.getAuthTag().toString("base64"),
    keyHint: apiKey.slice(-4),
  };
}

export function decryptApiKey(input: { encryptedApiKey: string; initializationVector: string; authenticationTag: string }) {
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(input.initializationVector, "base64"));
  decipher.setAuthTag(Buffer.from(input.authenticationTag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(input.encryptedApiKey, "base64")), decipher.final()]).toString("utf8");
}

export function createTeacherAiModel(provider: AiProvider, apiKey: string): { model: LanguageModel; modelId: string } {
  const modelId = aiProviderModels[provider];
  if (provider === "anthropic") return { model: createAnthropic({ apiKey })(modelId), modelId };
  if (provider === "google") return { model: createGoogleGenerativeAI({ apiKey })(modelId), modelId };
  return { model: createOpenAI({ apiKey })(modelId), modelId };
}
