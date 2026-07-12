export type AiProviderErrorCode = "invalid_key" | "rate_limit" | "timeout" | "invalid_response" | "provider_unavailable";

export function classifyAiProviderError(error: unknown): AiProviderErrorCode {
  const text = error instanceof Error ? `${error.name} ${error.message}`.toLowerCase() : "";
  if (text.includes("401") || text.includes("403") || text.includes("api key") || text.includes("authentication")) return "invalid_key";
  if (text.includes("429") || text.includes("rate limit") || text.includes("quota")) return "rate_limit";
  if (text.includes("timeout") || text.includes("timed out") || text.includes("abort")) return "timeout";
  if (text.includes("no object generated") || text.includes("schema") || text.includes("parse")) return "invalid_response";
  return "provider_unavailable";
}
