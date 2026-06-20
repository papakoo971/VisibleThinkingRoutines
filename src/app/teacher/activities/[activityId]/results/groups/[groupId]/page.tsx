import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Brain, CheckCircle2, Users } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import {
  activities,
  activityAttendance,
  activityGroups,
  groupSubmissions,
  getStudentName,
  students,
} from "@/lib/mock-data";
import type { RoutineColumn } from "@/lib/mock-data";

const columns: { id: RoutineColumn; label: string; description: string }[] = [
  { id: "see", label: "See", description: "모둠이 함께 관찰한 것" },
  { id: "think", label: "Think", description: "모둠이 함께 해석한 생각" },
  { id: "wonder", label: "Wonder", description: "모둠이 함께 만든 질문" },
];

export function generateStaticParams() {
  return activityGroups.map((group) => ({ activityId: group.activityId, groupId: group.id }));
}

export default async function GroupSubmissionPage({
  params,
}: {
  params: Promise<{ activityId: string; groupId: string }>;
}) {
  const { activityId, groupId } = await params;
  const activity = activities.find((item) => item.id === activityId);
  const group = activityGroups.find((item) => item.activityId === activityId && item.id === groupId);

  if (!activity || !group) notFound();

  const groupMembers = group.studentIds.map((studentId) => students.find((student) => student.id === studentId)).filter(Boolean);
  const presentMembers = groupMembers.filter(
    (student) => student && activityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status !== "absent"
  );
  const absentMembers = groupMembers.filter(
    (student) => student && activityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status === "absent"
  );
  const groupSubmission = groupSubmissions.find((submission) => submission.activityId === activity.id && submission.groupId === group.id);
  const agreedMembers = presentMembers.filter((student) =>
    groupSubmission?.agreements.some((agreement) => agreement.studentId === student?.id && agreement.agreed)
  );
  const cards = groupSubmission?.cards ?? [];

  return (
    <AppShell>
      <PageHeader
        eyebrow="모둠 제출 조회"
        title={`${group.name} 공동 제출`}
        description={`${activity.title} · 모둠원이 함께 작성한 결과입니다.`}
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

      <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-700" />
            <h2 className="font-semibold">모둠원</h2>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {groupMembers.map((student) => {
              const absent = student ? absentMembers.some((item) => item?.id === student.id) : false;
              const agreed = student ? agreedMembers.some((item) => item?.id === student.id) : false;

              return student ? (
                <div
                  key={student.id}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    absent ? "border-amber-200 bg-amber-50 text-amber-950" : "border-zinc-200 bg-stone-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{student.name}</span>
                    <span className="text-xs font-semibold">{absent ? "결석 제외" : agreed ? "동의 완료" : "동의 필요"}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{student.studentNumber}</p>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-800" />
            <h2 className="font-semibold text-emerald-950">제출 동의 상태</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-emerald-950">
            출석 모둠원 {presentMembers.length}명 중 {agreedMembers.length}명이 동의했습니다. 결석 {absentMembers.length}명은 동의 대상에서 제외됩니다.
          </p>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => {
          const columnCards = cards.filter((card) => card.column === column.id);

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
                    <p className="mt-3 text-xs font-semibold text-zinc-500">마지막 수정: {getStudentName(card.updatedByStudentId)}</p>
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
          <h2 className="font-semibold">모둠 AI 분석</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
          관찰과 질문이 구체적으로 연결되어 있습니다. 다음 피드백에서는 도시 개발의 장점과 부담을 근거와 함께 비교하도록 안내할 수 있습니다.
        </p>
      </section>
    </AppShell>
  );
}
