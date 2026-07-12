"use client";

import { useEffect, useState } from "react";
import { Bot, KeyRound, Trash2, X } from "lucide-react";
import { aiModelOptions, defaultAiModel, type AiProvider } from "@/lib/ai-models";
import { deleteAiSettings, fetchAiSettings, saveAiSettings, testAiSettings, type AiSettings } from "@/lib/ai-settings";

const providers: Array<{ id: AiProvider; name: string; description: string; placeholder: string }> = [
  { id: "openai", name: "OpenAI", description: "GPT 모델", placeholder: "sk-..." },
  { id: "anthropic", name: "Claude", description: "Claude 모델", placeholder: "sk-ant-..." },
  { id: "google", name: "Gemini", description: "Gemini 모델", placeholder: "AIza..." },
];

export function AiSettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [settings, setSettings] = useState<AiSettings | null>(null);
  const [provider, setProvider] = useState<AiProvider>("openai");
  const [model, setModel] = useState(defaultAiModel("openai"));
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    void fetchAiSettings()
      .then((next) => {
        if (!active) return;
        setSettings(next);
        if (next.provider) {
          setProvider(next.provider);
          setModel(next.model ?? defaultAiModel(next.provider));
        }
      })
      .catch((caught: unknown) => active && setError(caught instanceof Error ? caught.message : "AI 설정을 불러오지 못했습니다."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [open]);

  if (!open) return null;

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const next = await saveAiSettings(provider, model, apiKey || undefined);
      setSettings(next);
      setApiKey("");
      setMessage(`${providers.find((item) => item.id === provider)?.name} 모델 설정을 저장했습니다.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "AI 설정을 저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await deleteAiSettings();
      setSettings({ configured: false, provider: null, model: null, keyHint: null, updatedAt: null });
      setApiKey("");
      setMessage("저장된 API 키를 삭제했습니다.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "AI 설정을 삭제하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await testAiSettings();
      setMessage("저장된 API 키와 모델 연결을 확인했습니다.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "AI 연결 확인에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="w-full max-w-lg rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="ai-settings-title">
        <div className="flex items-start justify-between border-b border-zinc-200 px-6 py-5">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><Bot className="h-5 w-5" /></span>
            <div>
              <h2 id="ai-settings-title" className="text-lg font-semibold text-zinc-950">AI 분석 설정</h2>
              <p className="mt-1 text-sm text-zinc-500">사용할 AI 서비스와 개인 API 키를 설정하세요.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100" aria-label="설정 닫기"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-5 px-6 py-5">
          {loading ? <p className="text-sm text-zinc-500">설정을 불러오는 중...</p> : (
            <>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-zinc-800">AI 서비스 선택</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {providers.map((item) => (
                    <label key={item.id} className={`cursor-pointer rounded-xl border p-3 ${provider === item.id ? "border-emerald-500 bg-emerald-50" : "border-zinc-200"}`}>
                      <input className="sr-only" type="radio" name="ai-provider" value={item.id} checked={provider === item.id} onChange={() => { setProvider(item.id); setModel(defaultAiModel(item.id)); setApiKey(""); setMessage(null); }} />
                      <span className="block text-sm font-semibold text-zinc-900">{item.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-zinc-500">{item.description}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-zinc-800">모델 버전 선택</legend>
                <div className="space-y-2">
                  {aiModelOptions[provider].map((item) => (
                    <label key={item.id} className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 ${model === item.id ? "border-emerald-500 bg-emerald-50" : "border-zinc-200"}`}>
                      <span>
                        <span className="block text-sm font-semibold text-zinc-900">{item.label}</span>
                        <span className="mt-1 block text-xs text-zinc-500">{item.description}</span>
                      </span>
                      <input type="radio" name="ai-model" value={item.id} checked={model === item.id} onChange={() => { setModel(item.id); setMessage(null); }} className="h-4 w-4 accent-emerald-600" />
                    </label>
                  ))}
                </div>
              </fieldset>
              {settings?.configured ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  현재 {providers.find((item) => item.id === settings.provider)?.name} · <strong>{settings.model}</strong> · 키 <strong>•••• {settings.keyHint}</strong>가 등록되어 있습니다.
                </div>
              ) : null}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-zinc-800">{settings?.configured && settings.provider === provider ? "새 API 키 (선택)" : "새 API 키"}</span>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder={providers.find((item) => item.id === provider)?.placeholder} autoComplete="off" spellCheck={false} className="h-10 w-full rounded-lg border border-zinc-300 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
                </div>
                <span className="mt-2 block text-xs leading-5 text-zinc-500">같은 서비스에서 모델만 변경할 때는 키를 다시 입력하지 않아도 됩니다. 키는 암호화되어 저장됩니다.</span>
              </label>
              {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
              {message ? <p role="status" className="text-sm text-emerald-700">{message}</p> : null}
            </>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-zinc-200 px-6 py-4">
          <button type="button" onClick={() => void handleDelete()} disabled={saving || !settings?.configured} className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 className="h-4 w-4" /> 키 삭제</button>
          <div className="flex gap-2">
            <button type="button" onClick={() => void handleTest()} disabled={saving || loading || !settings?.configured} className="h-10 rounded-lg border border-emerald-300 px-4 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40">연결 확인</button>
            <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50">닫기</button>
            <button type="button" onClick={() => void handleSave()} disabled={saving || loading || ((!settings?.configured || settings.provider !== provider) && apiKey.trim().length < 20)} className="h-10 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40">{saving ? "저장 중..." : "AI 설정 저장"}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
