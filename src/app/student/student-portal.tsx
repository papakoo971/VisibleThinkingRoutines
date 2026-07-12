"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, LogOut, UserRound } from "lucide-react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase-auth";
import { fetchStudentSession, type StudentSession } from "@/lib/student-session";
import { StudentActivityList } from "./student-activity-list";

export function StudentPortal() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(getFirebaseAuth(), async (user) => {
    if (!user) {
      setSession(null);
      setLoading(false);
      return;
    }

    try {
      setSession(await fetchStudentSession());
      setError(null);
    } catch (sessionError) {
      setSession(null);
      setError(sessionError instanceof Error ? sessionError.message : "학생 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }), []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    try {
      await signInWithEmailAndPassword(
        getFirebaseAuth(),
        String(form.get("email") ?? "").trim(),
        String(form.get("password") ?? "")
      );
    } catch {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await signOut(getFirebaseAuth());
    setSession(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-6 text-zinc-950">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">학생 접속</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">내 활동 목록</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">교사가 발급한 학생 계정으로 로그인하면 배정된 활동만 확인할 수 있습니다.</p>

          {session ? (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-950">{session.student.name}</p>
              <p className="mt-1 text-sm text-emerald-900">{session.student.className} · {session.student.studentNumber}</p>
              <button type="button" onClick={handleLogout} className="mt-4 inline-flex h-9 items-center gap-2 rounded-md border border-emerald-300 bg-white px-3 text-sm font-semibold text-emerald-950">
                <LogOut className="h-4 w-4" /> 로그아웃
              </button>
            </div>
          ) : (
            <form className="mt-5 grid gap-3" onSubmit={handleLogin}>
              <label className="text-sm font-medium">
                학생 계정 이메일
                <input name="email" type="email" autoComplete="username" required className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" />
              </label>
              <label className="text-sm font-medium">
                비밀번호
                <input name="password" type="password" autoComplete="current-password" required className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" />
              </label>
              {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
              <button disabled={submitting || loading} className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 text-sm font-semibold text-white disabled:bg-zinc-400">
                <LockKeyhole className="h-4 w-4" /> {submitting ? "확인 중..." : "접속하기"}
              </button>
            </form>
          )}
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-5 py-4">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">{session ? `${session.student.name} 학생의 활동` : "배정된 활동"}</h2>
            </div>
          </div>
          {loading ? <p className="p-5 text-sm text-zinc-600">학생 정보를 확인하고 있습니다.</p> : null}
          {!loading && session ? <StudentActivityList activities={session.activities.map((item) => item.activity)} /> : null}
          {!loading && !session ? <p className="p-5 text-sm text-zinc-600">로그인하면 현재 배정된 활동이 표시됩니다.</p> : null}
        </section>
      </div>
    </main>
  );
}
