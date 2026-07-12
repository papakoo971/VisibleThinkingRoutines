"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { fetchTeacherActivityResults, type TeacherActivityResults } from "@/lib/teacher-results";
import type { RoutineColumn } from "@/lib/mock-data";

const columns: Array<{ id: RoutineColumn; label: string }> = [
  { id: "see", label: "See" },
  { id: "think", label: "Think" },
  { id: "wonder", label: "Wonder" },
];

export function LiveStudentSubmission({ activityId, studentId }: { activityId: string; studentId: string }) {
  const [results, setResults] = useState<TeacherActivityResults | null | undefined>(undefined);

  useEffect(() => {
    let ignore = false;
    fetchTeacherActivityResults(activityId).then((data) => {
      if (!ignore) setResults(data);
    }).catch(() => {
      if (!ignore) setResults(null);
    });
    return () => { ignore = true; };
  }, [activityId]);

  if (results === undefined) return <main className="min-h-screen bg-stone-50 p-6 text-sm text-zinc-600">학생 제출 내용을 불러오고 있습니다.</main>;
  const student = results?.students.find((item) => item.id === studentId);
  const submission = results?.submissions.find((item) => item.studentId === studentId);
  if (!results || !student) return <main className="min-h-screen bg-stone-50 p-6 text-sm text-zinc-600">학생 제출 내용을 찾을 수 없습니다.</main>;

  return (
    <AppShell>
      <PageHeader
        eyebrow="학생 제출 조회"
        title={`${student.name} 제출 내용`}
        description={`${student.className} · ${student.studentNumber} · ${results.activity.title}`}
        action={<Link href={`/teacher/activities/${activityId}/results`} className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-semibold"><ArrowLeft className="h-4 w-4" />목록으로</Link>}
      />
      <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 text-sm">
        제출 상태: {submission?.status === "submitted" ? "제출 완료" : submission?.status === "modified" ? "제출 후 수정됨" : "작성 중"}
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => {
          const cards = submission?.cards.filter((card) => card.column === column.id) ?? [];
          return (
            <div key={column.id} className="rounded-lg border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 px-5 py-4"><h2 className="font-semibold">{column.label}</h2></div>
              <div className="grid gap-3 p-4">
                {cards.map((card) => <div key={card.id} className="rounded-md border border-zinc-200 bg-stone-50 p-4 text-sm leading-6">{card.content}</div>)}
                {cards.length === 0 ? <p className="text-sm text-zinc-500">아직 작성된 카드가 없습니다.</p> : null}
              </div>
            </div>
          );
        })}
      </section>
    </AppShell>
  );
}
