"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brain, CheckCircle2, EyeOff, RefreshCw, Tag, UserRound, Users } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import {
  activities,
  activityAttendance,
  activityGroups,
  defaultTags,
  getStudentById,
  getStudentName,
  groupSubmissions,
  individualSubmissions,
  students,
} from "@/lib/mock-data";
import type { RoutineColumn, ThinkingCard } from "@/lib/mock-data";
import { fetchCreatedActivityPayload } from "@/lib/local-created-activities";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { fetchTeacherActivityResults, updateTeacherActivityStatus, updateTeacherCardTags, type TeacherActivityResults } from "@/lib/teacher-results";

const columns: { id: RoutineColumn; label: string }[] = [
  { id: "see", label: "See" },
  { id: "think", label: "Think" },
  { id: "wonder", label: "Wonder" },
];

export function ActivityResultsView({ activityId }: { activityId: string }) {
  const [createdPayload, setCreatedPayload] = useState<CreatedActivityPayload | null>(null);
  const [liveResults, setLiveResults] = useState<TeacherActivityResults | null>(null);
  const mockActivity = activities.find((item) => item.id === activityId);

  useEffect(() => {
    let ignore = false;

    if (!mockActivity) {
      Promise.all([fetchCreatedActivityPayload(activityId), fetchTeacherActivityResults(activityId).catch(() => null)]).then(([payload, results]) => {
        if (!ignore) {
          setCreatedPayload(payload ?? null);
          setLiveResults(results);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [activityId, mockActivity]);

  const activity = mockActivity ?? createdPayload?.activity ?? activities[0];

  return (
    <ActivityResultsWorkspace
      key={`${activity.id}-${activity.activityMode}`}
      activityId={activityId}
      createdPayload={createdPayload}
      liveResults={liveResults}
      onStatusChange={(status) => setLiveResults((current) => current ? { ...current, activity: { ...current.activity, status } } : current)}
      onCardTagsChange={async (cardId, tags, tagsPublic) => {
        await updateTeacherCardTags(activityId, cardId, tags, tagsPublic);
        setLiveResults((current) => current ? {
          ...current,
          submissions: current.submissions.map((submission) => ({
            ...submission,
            cards: submission.cards.map((card) => card.id === cardId ? { ...card, tags, tagsPublic } : card),
          })),
        } : current);
      }}
    />
  );
}

function ActivityResultsWorkspace({
  activityId,
  createdPayload,
  liveResults,
  onStatusChange,
  onCardTagsChange,
}: {
  activityId: string;
  createdPayload: CreatedActivityPayload | null;
  liveResults: TeacherActivityResults | null;
  onStatusChange: (status: "active" | "closed") => void;
  onCardTagsChange: (cardId: string, tags: string[], tagsPublic: boolean) => Promise<void>;
}) {
  const [anonymous, setAnonymous] = useState(false);
  const [tagFilter, setTagFilter] = useState("전체");
  const [changingStatus, setChangingStatus] = useState(false);
  const mockActivity = activities.find((item) => item.id === activityId);
  const baseActivity = mockActivity ?? createdPayload?.activity ?? activities[0];
  const activity = liveResults ? { ...baseActivity, status: liveResults.activity.status } : baseActivity;
  const [resultView, setResultView] = useState<"students" | "groups">(activity.activityMode === "group" ? "groups" : "students");
  const allActivityAttendance = [...activityAttendance, ...(createdPayload?.activityAttendance ?? [])];
  const allActivityGroups = [...activityGroups, ...(createdPayload?.activityGroups ?? [])];
  const allGroupSubmissions = [...groupSubmissions, ...(createdPayload?.groupSubmissions ?? [])];
  const allIndividualSubmissions = [...individualSubmissions, ...(createdPayload?.individualSubmissions ?? [])];
  const activityIndividualSubmissions = liveResults
    ? liveResults.submissions.map((submission) => ({ activityId: activity.id, ...submission }))
    : allIndividualSubmissions.filter((submission) => submission.activityId === activity.id);
  const activityGroupSubmissions = allGroupSubmissions.filter((submission) => submission.activityId === activity.id);
  const activityCards = activity.activityMode === "group"
    ? activityGroupSubmissions.flatMap((submission) =>
        submission.cards.map((card) => ({
          id: card.id,
          studentId: card.updatedByStudentId,
          column: card.column,
          content: card.content,
          tags: [],
          tagsPublic: false,
        }))
      )
    : activityIndividualSubmissions.flatMap((submission) => submission.cards);

  const filteredCards = tagFilter === "전체" ? activityCards : activityCards.filter((card) => card.tags.includes(tagFilter));
  const availableTags = Array.from(new Set([...defaultTags, ...activityCards.flatMap((card) => card.tags)]));

  const participatingStudents = liveResults
    ? liveResults.students.filter((student) => activityIndividualSubmissions.some((submission) => submission.studentId === student.id))
    : students.filter((student) => activityIndividualSubmissions.some((submission) => submission.studentId === student.id));
  const participatingGroups = allActivityGroups.filter((group) => group.activityId === activity.id);

  return (
    <AppShell>
      <PageHeader
        eyebrow="결과 조회"
        title={activity.title}
        description={`${activity.activityMode === "group" ? "모둠 활동" : "개인 활동"} · ${activity.subject} · ${activity.routine}`}
      />

      {liveResults ? (
        <section className="mb-6 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">활동 상태: {activity.status === "active" ? "진행 중" : "마감됨"}</p>
            <p className="mt-1 text-sm text-zinc-600">마감하면 학생 화면은 읽기 전용으로 전환됩니다.</p>
          </div>
          <button
            type="button"
            disabled={changingStatus}
            onClick={async () => {
              setChangingStatus(true);
              const nextStatus = activity.status === "active" ? "closed" : "active";
              try {
                await updateTeacherActivityStatus(activity.id, nextStatus);
                onStatusChange(nextStatus);
              } finally {
                setChangingStatus(false);
              }
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white disabled:bg-zinc-400"
          >
            {changingStatus ? "변경 중..." : activity.status === "active" ? "활동 마감" : "다시 열기"}
          </button>
        </section>
      ) : null}

      <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">학급 AI 분석 보고서</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              제출률 6/7명, 86%. 많이 나온 관찰은 도로, 건물, 공원이며 흥미로운 질문은 보행 안전과 환경 변화에
              집중되어 있습니다.
            </p>
          </div>
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-semibold">
            <RefreshCw className="h-4 w-4" />
            분석 갱신
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <ReportItem title="오개념 가능성" body="공장이 생기면 항상 도시가 더 나빠진다는 단정적 표현이 일부 보입니다." />
          <ReportItem title="다음 발문" body="도시 개발이 사람과 자연에 주는 이익과 부담을 어떻게 비교할 수 있을까요?" />
          <ReportItem title="추천 루틴" body="다음 활동은 Claim-Support-Question으로 주장과 근거를 연결하는 흐름을 추천합니다." />
        </div>
      </section>

      <section className="grid gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setResultView("groups")}
              className={`rounded-md px-4 py-3 text-sm font-semibold ${
                resultView === "groups" ? "bg-emerald-50 text-emerald-900" : "hover:bg-stone-50"
              }`}
            >
              모둠별 보기
            </button>
            <button
              type="button"
              onClick={() => setResultView("students")}
              className={`rounded-md px-4 py-3 text-sm font-semibold ${
                resultView === "students" ? "bg-emerald-50 text-emerald-900" : "hover:bg-stone-50"
              }`}
            >
              학생별 보기
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold">학급 전체 보기</h2>
              <p className="mt-1 text-sm text-zinc-600">전체 카드 흐름을 먼저 확인하고, 아래 목록에서 상세 결과로 이동합니다.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={tagFilter}
                onChange={(event) => setTagFilter(event.target.value)}
                className="h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm"
              >
                <option>전체</option>
                {availableTags.map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>
              <button
                onClick={() => setAnonymous((current) => !current)}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-semibold"
              >
                <EyeOff className="h-4 w-4" />
                {anonymous ? "이름 표시" : "익명 보기"}
              </button>
            </div>
          </div>

          <div className="grid gap-3 p-4 lg:grid-cols-3">
            {columns.map((column) => (
              <div key={column.id} className="rounded-md border border-zinc-200 bg-stone-50 p-3">
                <h3 className="font-semibold">{column.label}</h3>
                <div className="mt-3 grid gap-2">
                  {filteredCards
                    .filter((card) => card.column === column.id)
                    .map((card) => (
                        <ResultCard key={card.id} card={card} anonymous={anonymous} studentName={participatingStudents.find((student) => student.id === card.studentId)?.name} editable={Boolean(liveResults)} onUpdate={onCardTagsChange} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {resultView === "groups" ? (
          <section className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <h2 className="font-semibold">참여 모둠</h2>
              <p className="mt-1 text-sm text-zinc-600">모둠을 클릭하면 공동 제출 내용과 동의 상태를 확인합니다.</p>
            </div>
            <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
              {participatingGroups.map((group) => {
                const groupMembers = group.studentIds.map((studentId) => students.find((student) => student.id === studentId)).filter(Boolean);
                const presentMembers = groupMembers.filter(
                  (student) => student && allActivityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status !== "absent"
                );
                const absentMembers = groupMembers.filter(
                  (student) => student && allActivityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status === "absent"
                );
                const groupSubmission = activityGroupSubmissions.find((submission) => submission.groupId === group.id);
                const agreedCount = presentMembers.filter((student) =>
                  groupSubmission?.agreements.some((agreement) => agreement.studentId === student?.id && agreement.agreed)
                ).length;
                const submittedCards = groupSubmission?.cards ?? [];

                return (
                  <Link
                    key={group.id}
                    href={`/teacher/activities/${activity.id}/results/groups/${group.id}`}
                    className="rounded-lg border border-zinc-200 bg-stone-50 p-4 hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-emerald-800">
                        <Users className="h-5 w-5" />
                      </div>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-zinc-700">
                        동의 {agreedCount}/{presentMembers.length}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{group.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      출석 {presentMembers.length}명 · 결석 {absentMembers.length}명 제외
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                      {groupMembers.map((student) => student?.name).join(", ")}
                    </p>
                    <p className="mt-3 text-sm font-medium text-zinc-700">{submittedCards.length}개 공동 카드</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-5 py-4">
              <h2 className="font-semibold">참여 학생</h2>
              <p className="mt-1 text-sm text-zinc-600">학생 이름을 클릭하면 해당 학생의 제출 내용을 새 화면에서 확인합니다.</p>
            </div>
            <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
              {participatingStudents.map((student) => {
                const submittedCards = activityIndividualSubmissions.find((submission) => submission.studentId === student.id)?.cards ?? [];
                const submittedColumns = new Set(submittedCards.map((card) => card.column));

                return (
                  <Link
                    key={student.id}
                    href={`/teacher/activities/${activity.id}/results/students/${student.id}`}
                    className="rounded-lg border border-zinc-200 bg-stone-50 p-4 hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-emerald-800">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" />
                        제출
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{student.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      {student.className} · {student.studentNumber}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {columns.map((column) => (
                        <span
                          key={column.id}
                          className={`rounded-md px-2 py-1 text-xs font-semibold ${
                            submittedColumns.has(column.id) ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {column.label}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-medium text-zinc-700">{submittedCards.length}개 카드 제출</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </AppShell>
  );
}

function ResultCard({
  card,
  anonymous,
  studentName,
  editable,
  onUpdate,
}: {
  card: ThinkingCard;
  anonymous: boolean;
  studentName?: string;
  editable: boolean;
  onUpdate: (cardId: string, tags: string[], tagsPublic: boolean) => Promise<void>;
}) {
  const student = getStudentById(card.studentId);
  const [customTag, setCustomTag] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(tags: string[], tagsPublic = card.tagsPublic) {
    setSaving(true);
    try {
      await onUpdate(card.id, tags, tagsPublic);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-3 shadow-sm">
      <p className="text-sm leading-6">{card.content}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {!anonymous ? <span className="text-xs font-semibold text-zinc-600">{studentName ?? (student ? getStudentName(student.id) : "익명")}</span> : null}
        {card.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>
      {editable ? (
        <div className="mt-3 border-t border-zinc-100 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {defaultTags.map((tag) => {
              const selected = card.tags.includes(tag);
              return <button type="button" disabled={saving} key={tag} onClick={() => save(selected ? card.tags.filter((item) => item !== tag) : [...card.tags, tag])} className={`rounded-md px-2 py-1 text-xs font-semibold ${selected ? "bg-emerald-700 text-white" : "bg-zinc-100 text-zinc-600"}`}>{tag}</button>;
            })}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={customTag} onChange={(event) => setCustomTag(event.target.value)} maxLength={30} placeholder="사용자 태그" className="h-8 min-w-0 flex-1 rounded-md border border-zinc-300 px-2 text-xs" />
            <button type="button" disabled={saving || !customTag.trim()} onClick={async () => { const tag = customTag.trim(); if (!card.tags.includes(tag)) await save([...card.tags, tag]); setCustomTag(""); }} className="rounded-md border border-zinc-200 px-2 text-xs font-semibold">추가</button>
          </div>
          <label className="mt-2 flex items-center gap-2 text-xs text-zinc-600"><input type="checkbox" checked={card.tagsPublic} disabled={saving} onChange={(event) => save(card.tags, event.target.checked)} />학생에게 태그 공개</label>
        </div>
      ) : null}
    </div>
  );
}

function ReportItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-stone-50 p-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{body}</p>
    </div>
  );
}
