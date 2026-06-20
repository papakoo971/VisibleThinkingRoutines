"use client";

import { Shuffle, Users } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { groups as initialGroups, students } from "@/lib/mock-data";

export default function GroupsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="모둠 관리"
        title="학급 기본 모둠"
        description="무작위 자동 배정 후 필요한 학생만 수동으로 조정하는 흐름을 기준으로 설계합니다."
      />

      <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold">자동 생성</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm font-medium">
              기준
              <select className="mt-1 h-10 w-full rounded-md border border-zinc-300 bg-white px-3">
                <option>모둠당 인원수</option>
                <option>모둠 수</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              값
              <input className="mt-1 h-10 w-full rounded-md border border-zinc-300 px-3" defaultValue="4" />
            </label>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 text-sm font-semibold text-white">
              <Shuffle className="h-4 w-4" />
              무작위 배정
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {initialGroups.map((group) => (
            <div key={group.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{group.name}</h3>
                <Users className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="grid gap-2">
                {group.studentIds.map((studentId) => {
                  const student = students.find((item) => item.id === studentId);
                  return (
                    <div key={studentId} className="rounded-md border border-zinc-200 bg-stone-50 px-3 py-2 text-sm">
                      <span className="font-medium">{student?.name}</span>
                      <span className="ml-2 text-xs text-zinc-500">{student?.studentNumber}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
