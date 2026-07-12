export const aiProviders = ["openai", "anthropic", "google"] as const;
export type AiProvider = (typeof aiProviders)[number];

export const aiModelOptions = {
  openai: [
    { id: "gpt-5.4", label: "GPT-5.4", description: "최고 품질 · 정교한 분석" },
    { id: "gpt-5.2", label: "GPT-5.2", description: "고품질 · 균형형" },
    { id: "gpt-5-mini", label: "GPT-5 mini", description: "빠르고 경제적" },
  ],
  anthropic: [
    { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", description: "추천 · 품질과 속도 균형" },
    { id: "claude-opus-4-6", label: "Claude Opus 4.6", description: "최고 품질 · 높은 비용" },
    { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", description: "가장 빠르고 경제적" },
  ],
  google: [
    { id: "gemini-3.5-flash", label: "Gemini 3.5 Flash", description: "추천 · 최신 안정 버전" },
    { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", description: "복잡한 분석 · 고품질" },
    { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "빠르고 경제적" },
  ],
} as const satisfies Record<AiProvider, ReadonlyArray<{ id: string; label: string; description: string }>>;

export function isAiProvider(value: unknown): value is AiProvider {
  return typeof value === "string" && aiProviders.includes(value as AiProvider);
}

export function defaultAiModel(provider: AiProvider): string {
  return aiModelOptions[provider][0].id;
}

export function isAiModel(provider: AiProvider, value: unknown): value is string {
  return typeof value === "string" && aiModelOptions[provider].some((model) => model.id === value);
}
