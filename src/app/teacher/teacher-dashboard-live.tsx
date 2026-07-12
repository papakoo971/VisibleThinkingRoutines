"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { StatusBadge } from "@/components/app-shell";
import { DashboardModeSync } from "@/components/dashboard-mode-sync";
import { TeacherDashboardShell } from "@/components/teacher-dashboard-header";
import { fetchClassManagement } from "@/lib/class-management";
import { fetchCreatedActivityPayloads, type CreatedActivityPayload } from "@/lib/local-created-activities";

type Activity = CreatedActivityPayload["activity"];

export function TeacherDashboardLive({ view, subject, className, hasExplicitView }: { view: "subject" | "class"; subject?: string; className?: string; hasExplicitView: boolean }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCreatedActivityPayloads(), fetchClassManagement()]).then(([payloads, management]) => {
      setActivities(payloads.map((payload) => payload.activity));
      setClasses(management.classes.map((item) => item.name));
    }).finally(() => setLoading(false));
  }, []);

  const subjects = Array.from(new Set(activities.map((activity) => activity.subject)));
  const selectedClass = className && classes.includes(className) ? className : classes[0];
  const selectedSubject = subject && subjects.includes(subject) ? subject : subjects[0];
  const filtered = activities.filter((activity) => (view === "class" ? activity.classes.includes(selectedClass ?? "") && (!selectedSubject || activity.subject === selectedSubject) : activity.subject === selectedSubject && (!selectedClass || activity.classes.includes(selectedClass))));

  return (
    <TeacherDashboardShell>
      <DashboardModeSync hasExplicitView={hasExplicitView} />
      <section className="rounded-lg border border-zinc-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-md border border-zinc-200 bg-stone-50 p-1">
            <Link href="/teacher?view=subject" className={`rounded px-3 py-1.5 text-sm font-semibold ${view === "subject" ? "bg-white text-emerald-900 shadow-sm" : "text-zinc-600"}`}>과목 우선 보기</Link>
            <Link href="/teacher?view=class" className={`rounded px-3 py-1.5 text-sm font-semibold ${view === "class" ? "bg-white text-emerald-900 shadow-sm" : "text-zinc-600"}`}>학급 우선 보기</Link>
          </div>
          <Link href="/teacher/activities/new" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700"><Plus className="h-4 w-4" />새 활동</Link>
        </div>
        {loading ? <p className="p-6 text-sm text-zinc-500">대시보드를 불러오는 중...</p> : !classes.length ? <p className="p-6 text-sm text-zinc-500">먼저 학급과 학생을 등록해 주세요.</p> : (
          <div className="grid gap-6 p-5">
            <Selector title={view === "class" ? "1. 학급 선택" : "1. 과목 선택"}>
              {(view === "class" ? classes : subjects).map((item) => <Link key={item} href={`/teacher?view=${view}&${view === "class" ? "className" : "subject"}=${encodeURIComponent(item)}`} className={`rounded-md border px-4 py-3 text-sm font-semibold ${(view === "class" ? selectedClass : selectedSubject) === item ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200"}`}>{item}</Link>)}
            </Selector>
            <Selector title={view === "class" ? "2. 과목 선택" : "2. 학급 선택"}>
              {(view === "class" ? subjects : classes).map((item) => <Link key={item} href={`/teacher?view=${view}&subject=${encodeURIComponent(view === "class" ? item : selectedSubject ?? "")}&className=${encodeURIComponent(view === "class" ? selectedClass ?? "" : item)}`} className={`rounded-md border px-4 py-3 text-sm font-semibold ${(view === "class" ? selectedSubject : selectedClass) === item ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200"}`}>{item}</Link>)}
            </Selector>
            <div><h2 className="mb-3 font-semibold">3. 활동</h2><div className="grid gap-2">{filtered.map((activity) => <Link key={activity.id} href={`/teacher/activities/${activity.id}/results`} className="flex flex-col gap-2 rounded-md border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between"><span><span className="font-semibold">{activity.title}</span><span className="mt-1 block text-sm text-zinc-500">{activity.subject} · {activity.classes.join(", ")}</span></span><StatusBadge status={activity.status} /></Link>)}{!filtered.length ? <p className="text-sm text-zinc-500">조건에 맞는 활동이 없습니다.</p> : null}</div></div>
          </div>
        )}
      </section>
    </TeacherDashboardShell>
  );
}

function Selector({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="mb-3 font-semibold">{title}</h2><div className="grid gap-2 md:grid-cols-3">{children}</div></div>;
}
