import { LockKeyhole, UserRound } from "lucide-react";
import { activities } from "@/lib/mock-data";
import { StudentActivityList } from "./student-activity-list";

export default function StudentPortalPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-6 text-zinc-950">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">학생 접속</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">내 활동 목록</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">학번, 이름, 비밀번호를 입력하면 배정된 활동을 확인합니다.</p>

          <form className="mt-5 grid gap-3">
            <label className="text-sm font-medium">
              학번
              <input className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" defaultValue="20260101" />
            </label>
            <label className="text-sm font-medium">
              이름
              <input className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" defaultValue="김민준" />
            </label>
            <label className="text-sm font-medium">
              비밀번호
              <input className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" defaultValue="M24-K7P9" type="password" />
            </label>
            <button className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 text-sm font-semibold text-white">
              <LockKeyhole className="h-4 w-4" />
              접속하기
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-5 py-4">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">김민준 학생의 활동</h2>
            </div>
          </div>
          <StudentActivityList initialActivities={activities} />
        </section>
      </div>
    </main>
  );
}
