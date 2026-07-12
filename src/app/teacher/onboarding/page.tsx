"use client";

import { BookOpen, School } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { saveMyTeacherProfile, type TeacherProfile } from "@/lib/teacher-profile";

const operationModes: Array<{
  id: TeacherProfile["operationMode"];
  title: string;
  description: string;
  example: string;
  icon: typeof School;
}> = [
  {
    id: "class-first",
    title: "학급 우선",
    description: "담임교사처럼 학급 안에서 과목과 활동을 관리합니다.",
    example: "5학년 2반 → 국어 → 활동",
    icon: School,
  },
  {
    id: "subject-first",
    title: "과목 우선",
    description: "교과 전담교사처럼 과목을 중심으로 여러 학급 활동을 관리합니다.",
    example: "과학 → 활동 → 5학년 1·2반",
    icon: BookOpen,
  },
];

export default function TeacherOnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<TeacherProfile["operationMode"] | null>(null);
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function completeOnboarding() {
    if (!user?.email || !selectedMode || displayName.trim().length < 2) {
      setError("이름과 수업 운영 방식을 모두 확인해 주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await saveMyTeacherProfile({
        email: user.email,
        displayName: displayName.trim(),
        operationMode: selectedMode,
      });
      await refreshProfile();
      router.replace("/teacher");
    } catch (caughtError) {
      console.error("Failed to save teacher profile", caughtError);
      setError("운영 방식을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-8 text-zinc-950">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">First setup</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">수업 운영 방식을 선택하세요</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            대시보드에서 학급과 과목을 보여주는 기본 순서를 정합니다. 나중에 설정에서 변경할 수 있습니다.
          </p>
        </header>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            교사 이름
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="h-11 rounded-md border border-zinc-300 px-3 font-normal focus:border-emerald-600"
              placeholder="김선생"
            />
          </label>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          {operationModes.map((mode) => {
            const Icon = mode.icon;
            const selected = mode.id === selectedMode;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`rounded-lg border p-6 text-left transition ${
                  selected
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                    : "border-zinc-200 bg-white hover:border-emerald-300"
                }`}
                aria-pressed={selected}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-md ${selected ? "bg-emerald-700 text-white" : "bg-zinc-100 text-zinc-700"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-5 block text-lg font-semibold">{mode.title}</span>
                <span className="mt-2 block text-sm leading-6 text-zinc-600">{mode.description}</span>
                <span className="mt-4 block rounded-md bg-white/80 px-3 py-2 text-xs font-medium text-zinc-500">{mode.example}</span>
              </button>
            );
          })}
        </section>

        {error ? (
          <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => void completeOnboarding()}
            disabled={submitting || !selectedMode}
            className="h-11 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {submitting ? "저장 중..." : "설정 완료하고 대시보드 열기"}
          </button>
        </div>
      </div>
    </main>
  );
}
