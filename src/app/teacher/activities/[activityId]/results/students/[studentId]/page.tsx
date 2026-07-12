import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Brain, Tag } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { activities, individualSubmissions, students } from "@/lib/mock-data";
import type { RoutineColumn } from "@/lib/mock-data";
import { LiveStudentSubmission } from "../live-student-submission";

const columns: { id: RoutineColumn; label: string; description: string }[] = [
  { id: "see", label: "See", description: "실제로 관찰한 것" },
  { id: "think", label: "Think", description: "관찰에서 떠올린 생각" },
  { id: "wonder", label: "Wonder", description: "더 궁금해진 질문" },
];

export function generateStaticParams() {
  return activities.flatMap((activity) => students.map((student) => ({ activityId: activity.id, studentId: student.id })));
}

export default async function StudentSubmissionPage({
  params,
}: {
  params: Promise<{ activityId: string; studentId: string }>;
}) {
  const { activityId, studentId } = await params;
  const activity = activities.find((item) => item.id === activityId);
  const student = students.find((item) => item.id === studentId);

  if (!activity) return <LiveStudentSubmission activityId={activityId} studentId={studentId} />;
  if (!student) notFound();

  const studentCards = individualSubmissions.find((submission) => submission.activityId === activity.id && submission.studentId === student.id)?.cards ?? [];

  return (
    <AppShell>
      <PageHeader
        eyebrow="학생 제출 조회"
        title={`${student.name} 제출 내용`}
        description={`${student.className} · ${student.studentNumber} · ${activity.title}`}
        action={
          <Link
            href={`/teacher/activities/${activity.id}/results`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-semibold hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Link>
        }
      />

      <section className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        제출 완료 · 제출 후 수정됨 · 개인 AI 분석 갱신 필요
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => {
          const columnCards = studentCards.filter((card) => card.column === column.id);

          return (
            <div key={column.id} className="rounded-lg border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 px-5 py-4">
                <h2 className="font-semibold">{column.label}</h2>
                <p className="mt-1 text-sm text-zinc-600">{column.description}</p>
              </div>
              <div className="grid gap-3 p-4">
                {columnCards.map((card) => (
                  <div key={card.id} className="rounded-md border border-zinc-200 bg-stone-50 p-4">
                    <p className="text-sm leading-6">{card.content}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {columnCards.length === 0 ? (
                  <div className="rounded-md border border-zinc-200 bg-stone-50 p-4 text-sm text-zinc-500">
                    아직 제출된 카드가 없습니다.
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-emerald-700" />
          <h2 className="font-semibold">개인 AI 분석</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
          관찰과 질문이 구체적입니다. 다음에는 생각을 쓸 때 관찰한 장면과 더 분명히 연결해 보세요.
        </p>
        <button className="mt-4 h-9 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white">학생에게 공개</button>
      </section>
    </AppShell>
  );
}
