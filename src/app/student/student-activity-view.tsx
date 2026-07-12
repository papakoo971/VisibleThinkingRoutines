"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, FileText, Plus, Save, Trash2, Users } from "lucide-react";
import {
  activities,
  activityAttendance,
  activityGroups,
  groupSubmissions,
  individualSubmissions,
  students,
} from "@/lib/mock-data";
import type { RoutineColumn } from "@/lib/mock-data";
import { fetchCreatedActivityPayload } from "@/lib/local-created-activities";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { fetchStudentWork, saveStudentWork, type StudentWork } from "@/lib/student-work";

type LocalCard = {
  id: string;
  column: RoutineColumn;
  content: string;
};

const columns: { id: RoutineColumn; label: string; helper: string }[] = [
  { id: "see", label: "See", helper: "실제로 보이는 것" },
  { id: "think", label: "Think", helper: "그것을 보고 생각한 것" },
  { id: "wonder", label: "Wonder", helper: "더 궁금해진 것" },
];

const currentStudent = students[0];
const individualInitialCards: LocalCard[] = [
  { id: "local-1", column: "see", content: "높은 건물과 넓은 도로가 보인다." },
  { id: "local-2", column: "think", content: "도시가 자동차 이동을 중심으로 만들어진 것 같다." },
  { id: "local-3", column: "wonder", content: "사람들이 걸어 다니기에는 안전할까?" },
];

export function StudentActivityView({ activityId }: { activityId: string }) {
  const [createdPayload, setCreatedPayload] = useState<CreatedActivityPayload | null | undefined>(undefined);
  const [studentWork, setStudentWork] = useState<StudentWork | null>(null);
  const mockActivity = activities.find((item) => item.id === activityId);

  useEffect(() => {
    let ignore = false;

    if (!mockActivity) {
      Promise.all([fetchCreatedActivityPayload(activityId), fetchStudentWork(activityId).catch(() => null)]).then(([payload, work]) => {
        if (!ignore) {
          setCreatedPayload(payload ?? null);
          setStudentWork(work);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [activityId, mockActivity]);

  if (!mockActivity && createdPayload === undefined) {
    return <main className="min-h-screen bg-stone-50 p-6 text-sm text-zinc-600">배정된 활동을 확인하고 있습니다.</main>;
  }

  if (!mockActivity && createdPayload === null) {
    return <main className="min-h-screen bg-stone-50 p-6 text-sm text-zinc-600">이 활동을 볼 권한이 없거나 활동을 찾을 수 없습니다.</main>;
  }

  const activity = mockActivity ?? createdPayload?.activity;
  if (!activity) return null;

  return (
    <StudentActivityWorkspace
      key={`${activity.id}-${activity.activityMode}`}
      activityId={activityId}
      createdPayload={createdPayload ?? null}
      studentWork={studentWork}
    />
  );
}

function StudentActivityWorkspace({
  activityId,
  createdPayload,
  studentWork,
}: {
  activityId: string;
  createdPayload: CreatedActivityPayload | null;
  studentWork: StudentWork | null;
}) {
  const mockActivity = activities.find((item) => item.id === activityId);
  const activity = mockActivity ?? createdPayload?.activity ?? activities[0];
  const readOnly = activity.status === "closed";
  const allActivityAttendance = [...activityAttendance, ...(createdPayload?.activityAttendance ?? [])];
  const allActivityGroups = [...activityGroups, ...(createdPayload?.activityGroups ?? [])];
  const allGroupSubmissions = [...groupSubmissions, ...(createdPayload?.groupSubmissions ?? [])];
  const allIndividualSubmissions = [...individualSubmissions, ...(createdPayload?.individualSubmissions ?? [])];
  const currentGroup = allActivityGroups.find((group) => group.activityId === activity.id && group.studentIds.includes(currentStudent.id));
  const groupSubmission = allGroupSubmissions.find((submission) => submission.activityId === activity.id && submission.groupId === currentGroup?.id);
  const individualSubmission = allIndividualSubmissions.find((submission) => submission.activityId === activity.id && submission.studentId === currentStudent.id);
  const initialCards: LocalCard[] = studentWork?.cards ?? (
    activity.activityMode === "group" && currentGroup
      ? (groupSubmission?.cards ?? []).map((card) => ({ id: card.id, column: card.column, content: card.content }))
      : (individualSubmission?.cards ?? (createdPayload ? [] : individualInitialCards)).map((card) => ({ id: card.id, column: card.column, content: card.content }))
  );

  const [cards, setCards] = useState(initialCards);
  const [activeColumn, setActiveColumn] = useState<RoutineColumn>("see");
  const [submitted, setSubmitted] = useState(studentWork?.status === "submitted" || studentWork?.status === "modified");
  const [modifiedAfterSubmit, setModifiedAfterSubmit] = useState(studentWork?.status === "modified");
  const [saveState, setSaveState] = useState<"saved" | "saving" | "error">("saved");
  const saveVersion = useRef(0);
  const [agreements, setAgreements] = useState<Record<string, boolean>>(
    Object.fromEntries(
      (groupSubmission?.agreements ?? []).map((agreement) => [agreement.studentId, agreement.agreed])
    )
  );

  const groupMembers = useMemo(() => {
    if (!currentGroup) return [];
    return currentGroup.studentIds.map((studentId) => students.find((student) => student.id === studentId)).filter(Boolean);
  }, [currentGroup]);

  const presentMembers = groupMembers.filter(
    (student) => student && allActivityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status !== "absent"
  );
  const absentMembers = groupMembers.filter(
    (student) => student && allActivityAttendance.find((item) => item.activityId === activity.id && item.studentId === student.id)?.status === "absent"
  );
  const allPresentMembersAgreed = presentMembers.length > 0 && presentMembers.every((student) => student && agreements[student.id]);

  const statusLabel = useMemo(() => {
    if (!submitted) return "작성 중";
    if (modifiedAfterSubmit) return "제출 후 수정됨";
    return "제출 완료";
  }, [modifiedAfterSubmit, submitted]);

  useEffect(() => {
    if (!createdPayload || activity.activityMode !== "individual" || !studentWork || readOnly) return;
    const version = saveVersion.current;
    const timeout = window.setTimeout(() => {
      saveStudentWork(activityId, {
        cards,
        status: submitted ? (modifiedAfterSubmit ? "modified" : "submitted") : "draft",
      }).then(() => {
        if (saveVersion.current === version) setSaveState("saved");
      }).catch(() => {
        if (saveVersion.current === version) setSaveState("error");
      });
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [activity.activityMode, activityId, cards, createdPayload, modifiedAfterSubmit, readOnly, studentWork, submitted]);

  function addCard(column: RoutineColumn) {
    if (readOnly) return;
    setCards((current) => [...current, { id: crypto.randomUUID(), column, content: "" }]);
    saveVersion.current += 1;
    setSaveState("saving");
    if (submitted) setModifiedAfterSubmit(true);
  }

  function updateCard(id: string, content: string) {
    if (readOnly) return;
    setCards((current) => current.map((card) => (card.id === id ? { ...card, content } : card)));
    saveVersion.current += 1;
    setSaveState("saving");
    if (submitted) setModifiedAfterSubmit(true);
  }

  function deleteCard(id: string) {
    if (readOnly) return;
    setCards((current) => current.filter((card) => card.id !== id));
    saveVersion.current += 1;
    setSaveState("saving");
    if (submitted) setModifiedAfterSubmit(true);
  }

  function toggleAgreement(studentId: string) {
    setAgreements((current) => ({ ...current, [studentId]: !current[studentId] }));
    if (submitted) setModifiedAfterSubmit(true);
  }

  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{activity.routine}</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">{activity.title}</h1>
            <p className="mt-1 text-sm text-zinc-600">
              {studentWork?.student.name ?? currentStudent.name} · {studentWork?.student.className ?? currentStudent.className} · {activity.activityMode === "group" ? currentGroup?.name : "개인 활동"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-stone-50 px-3 text-sm font-medium">
              <Save className="h-4 w-4 text-emerald-700" />
              {saveState === "saving" ? "저장 중..." : saveState === "error" ? "저장 실패" : "자동 저장됨"}
            </span>
            <span className="inline-flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium">
              {statusLabel}
            </span>
            <button
              onClick={() => { saveVersion.current += 1; setSubmitted(true); setModifiedAfterSubmit(false); setSaveState("saving"); }}
              disabled={readOnly || (activity.activityMode === "group" && !allPresentMembersAgreed)}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              <CheckCircle2 className="h-4 w-4" />
              {readOnly ? "마감됨" : "제출"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[380px_1fr]">
        <aside className="grid gap-5">
          <section className="rounded-lg border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 px-4 py-3">
              <h2 className="font-semibold">중심 자료</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                자료를 자세히 관찰한 뒤 보이는 것, 생각한 것, 궁금한 것을 카드로 나누어 작성하세요.
              </p>
            </div>
            <div className="p-4">
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-zinc-200 bg-[linear-gradient(135deg,#e7f5ef_0%,#f4f1e8_50%,#dfe7f1_100%)]">
                <div className="rounded-lg border border-white/70 bg-white/80 px-4 py-3 text-center shadow-sm">
                  <FileText className="mx-auto h-8 w-8 text-emerald-700" />
                  <p className="mt-2 text-sm font-semibold">이미지/PDF 미리보기 영역</p>
                  <p className="mt-1 text-xs text-zinc-500">Firebase Storage 연결 후 실제 자료 표시</p>
                </div>
              </div>
            </div>
          </section>

          {activity.activityMode === "group" ? (
            <section className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-700" />
                <h2 className="font-semibold">모둠 공동 제출 동의</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                출석한 모둠원 전원이 최종 내용을 확인하고 동의해야 제출할 수 있습니다.
              </p>
              <div className="mt-4 grid gap-2">
                {presentMembers.map((student) =>
                  student ? (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => toggleAgreement(student.id)}
                      className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                        agreements[student.id] ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-zinc-200 bg-stone-50"
                      }`}
                    >
                      <span className="font-semibold">{student.name}</span>
                      <span>{agreements[student.id] ? "동의 완료" : "동의 필요"}</span>
                    </button>
                  ) : null
                )}
                {absentMembers.map((student) =>
                  student ? (
                    <div key={student.id} className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                      <span className="font-semibold">{student.name}</span>
                      <span>결석 제외</span>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          ) : null}
        </aside>

        <section className="rounded-lg border border-zinc-200 bg-white p-3">
          <div className="mb-3 grid grid-cols-3 gap-2 lg:hidden">
            {columns.map((column) => (
              <button
                key={column.id}
                onClick={() => setActiveColumn(column.id)}
                className={`h-10 rounded-md text-sm font-semibold ${
                  activeColumn === column.id ? "bg-zinc-950 text-white" : "border border-zinc-200 bg-white"
                }`}
              >
                {column.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {columns.map((column) => (
              <RoutineColumnBoard
                key={column.id}
                column={column}
                cards={cards.filter((card) => card.column === column.id)}
                isVisible={activeColumn === column.id}
                onAdd={() => addCard(column.id)}
                onChange={updateCard}
                onDelete={deleteCard}
                readOnly={readOnly}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function RoutineColumnBoard({
  column,
  cards,
  isVisible,
  onAdd,
  onChange,
  onDelete,
  readOnly,
}: {
  column: { id: RoutineColumn; label: string; helper: string };
  cards: LocalCard[];
  isVisible: boolean;
  onAdd: () => void;
  onChange: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  readOnly: boolean;
}) {
  return (
    <div className={`${isVisible ? "block" : "hidden"} rounded-md border border-zinc-200 bg-stone-50 p-3 lg:block`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">{column.label}</h2>
          <p className="mt-1 text-xs text-zinc-500">{column.helper}</p>
        </div>
        <button type="button" onClick={onAdd} disabled={readOnly} className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm disabled:cursor-not-allowed disabled:text-zinc-300">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-2">
        {cards.map((card) => (
          <div key={card.id} className="rounded-md border border-zinc-200 bg-white p-2 shadow-sm">
            <textarea
              value={card.content}
              disabled={readOnly}
              onChange={(event) => onChange(card.id, event.target.value)}
              className="min-h-24 w-full border-0 bg-transparent p-1 text-sm leading-6 outline-none"
              placeholder={`${column.label} 카드 작성`}
            />
            <div className="flex justify-end">
              <button type="button" onClick={() => onDelete(card.id)} disabled={readOnly} className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-zinc-500 hover:bg-zinc-100 disabled:hidden">
                <Trash2 className="h-3.5 w-3.5" />
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
