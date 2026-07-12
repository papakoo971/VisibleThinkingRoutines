"use client";

import { DragEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, GripVertical, ImageUp, Plus, QrCode, Trash2, Users, X } from "lucide-react";
import { fetchClassManagement, type ClassManagement } from "@/lib/class-management";
import { persistCreatedActivityPayload } from "@/lib/local-created-activities";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { generateActivityCode, generateActivityQr, uploadActivityMaterial } from "@/lib/activity-assets";

type ActivityTemplate = {
  id: string;
  title: string;
  routine: string;
  description: string;
  defaultTitle: string;
  guide: string;
};

type GroupAssignment = Record<string, string[]>;
type ManagedGroup = { id: string; name: string };
type ActivityMode = "individual" | "group";
type AttendanceStatus = "present" | "absent";
type GeneratedActivityPreview = CreatedActivityPayload;
type LiveStudent = ClassManagement["students"][number];

export function ActivitySetupForm({ selectedTemplate }: { selectedTemplate: ActivityTemplate }) {
  const [activityMode, setActivityMode] = useState<ActivityMode>("individual");
  const [management, setManagement] = useState<ClassManagement | null>(null);
  const [targetClasses, setTargetClasses] = useState<string[]>([]);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [managedGroups, setManagedGroups] = useState<ManagedGroup[]>([]);
  const [groupAssignments, setGroupAssignments] = useState<GroupAssignment>({});
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceByStudent, setAttendanceByStudent] = useState<Record<string, AttendanceStatus>>(
    {}
  );
  const [generatedPreview, setGeneratedPreview] = useState<GeneratedActivityPreview | null>(null);
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const classes = management?.classes.map((schoolClass) => schoolClass.name) ?? [];
  const students = management?.students ?? [];

  useEffect(() => {
    let active = true;
    void fetchClassManagement().then((data) => {
      if (!active) return;
      setManagement(data);
      const classNames = data.classes.map((schoolClass) => schoolClass.name);
      setTargetClasses(classNames);
      setSelectedClassName(classNames[0] ?? "");
      setAttendanceByStudent(Object.fromEntries(data.students.map((student) => [student.id, "present" as const])));
      const firstClassId = data.classes[0]?.id;
      const defaults = data.groups.filter((group) => group.classId === firstClassId);
      setManagedGroups(defaults.map((group) => ({ id: group.id, name: group.name })));
      setGroupAssignments(Object.fromEntries(defaults.map((group) => [group.id, group.studentIds])));
    }).catch((error: unknown) => active && setCreateError(error instanceof Error ? error.message : "학급 정보를 불러오지 못했습니다."));
    return () => { active = false; };
  }, []);

  const selectedStudents = students.filter((student) => student.className === selectedClassName);
  const absentStudents = selectedStudents.filter((student) => attendanceByStudent[student.id] === "absent");
  const presentStudents = selectedStudents.filter((student) => attendanceByStudent[student.id] !== "absent");
  const assignedStudentIds = new Set(Object.values(groupAssignments).flat());
  const unassignedStudents = selectedStudents.filter((student) => !assignedStudentIds.has(student.id));

  function dragStudent(event: DragEvent<HTMLElement>, studentId: string) {
    event.dataTransfer.setData("text/plain", studentId);
    event.dataTransfer.effectAllowed = "move";
  }

  function dropStudent(event: DragEvent<HTMLElement>, targetGroupId: string) {
    event.preventDefault();
    const studentId = event.dataTransfer.getData("text/plain");
    if (!studentId) return;

    setGroupAssignments((current) => {
      const next = Object.fromEntries(
        Object.entries(current).map(([groupId, studentIds]) => [groupId, studentIds.filter((id) => id !== studentId)])
      ) as GroupAssignment;

      next[targetGroupId] = [...(next[targetGroupId] ?? []), studentId];
      return next;
    });
  }

  function addGroup() {
    const id = `activity-group-${Date.now()}`;
    setManagedGroups((current) => [...current, { id, name: `${current.length + 1}모둠` }]);
    setGroupAssignments((current) => ({ ...current, [id]: [] }));
  }

  function deleteGroup(groupId: string) {
    setManagedGroups((current) => current.filter((group) => group.id !== groupId));
    setGroupAssignments((current) => {
      const next = { ...current };
      delete next[groupId];
      return next;
    });
  }

  function setAttendance(studentId: string, status: AttendanceStatus) {
    setAttendanceByStudent((current) => ({ ...current, [studentId]: status }));
  }

  function applyDefaultGroups(className: string, data = management) {
    const classId = data?.classes.find((schoolClass) => schoolClass.name === className)?.id;
    const defaults = data?.groups.filter((group) => group.classId === classId) ?? [];
    setManagedGroups(defaults.map((group) => ({ id: group.id, name: group.name })));
    setGroupAssignments(Object.fromEntries(defaults.map((group) => [group.id, group.studentIds])));
  }

  function selectClass(className: string) {
    setSelectedClassName(className);
    applyDefaultGroups(className);
  }

  function toggleTargetClass(className: string) {
    setTargetClasses((current) => {
      const next = current.includes(className) ? current.filter((item) => item !== className) : [...current, className];
      if (!next.includes(selectedClassName)) selectClass(next[0] ?? "");
      return next;
    });
  }

  async function createActivityPreview(formData: FormData) {
    setCreating(true);
    setCreateError(null);
    const activityId = `new-${selectedTemplate.id}-${Date.now()}`;
    try {
    const material = materialFile ? await uploadActivityMaterial(activityId, materialFile) : null;
    const activityCode = generateActivityCode();
    const targetStudents = students.filter((student) => targetClasses.includes(student.className));
    const targetInternalIds = new Set(targetStudents.map((student) => student.id));
    const externalIdByInternalId = new Map(targetStudents.map((student) => [student.id, student.externalId ?? student.studentNumber]));
    const attendanceByExternalId = new Map(targetStudents.map((student) => [student.externalId ?? student.studentNumber, attendanceByStudent[student.id] ?? "present"]));
    const targetStudentIds = targetStudents.map((student) => student.externalId ?? student.studentNumber);
    const activityGroups =
      activityMode === "group"
        ? managedGroups
            .map((group) => ({
              id: `${activityId}-${group.id}`,
              activityId,
              name: group.name,
              studentIds: (groupAssignments[group.id] ?? []).filter((studentId) => targetInternalIds.has(studentId)).map((studentId) => externalIdByInternalId.get(studentId)!),
            }))
            .filter((group) => group.studentIds.length > 0)
        : [];
    const activityAttendance = targetStudents.map((student) => ({
      activityId,
      studentId: student.externalId ?? student.studentNumber,
      status: attendanceByStudent[student.id] ?? "present",
    }));
    const groupSubmissions =
      activityMode === "group"
        ? activityGroups.map((group) => ({
            activityId,
            groupId: group.id,
            status: "draft",
            cards: [],
            agreements: group.studentIds
              .filter((studentId) => attendanceByExternalId.get(studentId) !== "absent")
              .map((studentId) => ({ activityId, groupId: group.id, studentId, agreed: false })),
          }))
        : [];
    const individualSubmissions =
      activityMode === "individual"
        ? targetStudentIds.map((studentId) => ({ activityId, studentId, status: "draft", cards: [] }))
        : [];

    const generatedPayload: GeneratedActivityPreview = {
      activity: {
        id: activityId,
        title: String(formData.get("title") || selectedTemplate.defaultTitle),
        routine: selectedTemplate.routine,
        activityMode,
        subject: String(formData.get("subject") || "사회"),
        classes: targetClasses,
        status: "active",
        code: activityCode,
        materialType: material?.type ?? "none",
        materialUrl: material?.url,
        materialName: material?.name,
        instructions: String(formData.get("instructions") || selectedTemplate.guide),
        activityDate: new Date().toISOString().slice(0, 10),
        submittedCount: 0,
        targetCount: activityMode === "group" ? activityGroups.length : targetStudentIds.length,
      },
      activityAttendance,
      activityGroups,
      groupSubmissions,
      individualSubmissions,
      routes: {
        teacherResults: `/teacher/activities/${activityId}/results`,
        studentEntry: `/student/activities/${activityId}`,
      },
    };

    const savedPayload = await persistCreatedActivityPayload(generatedPayload);
    setGeneratedPreview(savedPayload);
    setQrDataUrl(await generateActivityQr(`${window.location.origin}/student?activityId=${encodeURIComponent(activityId)}`));
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "활동을 생성하지 못했습니다.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <form
        className="rounded-lg border border-zinc-200 bg-white p-5"
        onSubmit={(event) => {
          event.preventDefault();
          createActivityPreview(new FormData(event.currentTarget));
        }}
      >
        <div className="grid gap-5">
          <label className="text-sm font-medium">
            활동 제목
            <input name="title" className="mt-1 h-11 w-full rounded-md border border-zinc-300 px-3" defaultValue={selectedTemplate.defaultTitle} />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">
              과목
              <input name="subject" className="mt-1 h-11 w-full rounded-md border border-zinc-300 px-3" defaultValue="사회" />
            </label>
            <label className="text-sm font-medium">
              사고 루틴
              <select className="mt-1 h-11 w-full rounded-md border border-zinc-300 bg-white px-3">
                <option>{selectedTemplate.routine}</option>
              </select>
            </label>
          </div>

          <fieldset className="rounded-md border border-zinc-200 p-4">
            <legend className="px-1 text-sm font-semibold">활동 방식</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <ModeButton active={activityMode === "individual"} title="개인 활동" body="학생별로 각자 제출합니다." onClick={() => setActivityMode("individual")} />
              <ModeButton active={activityMode === "group"} title="모둠 활동" body="모둠원이 하나의 공동 결과물을 제출합니다." onClick={() => setActivityMode("group")} />
            </div>
          </fieldset>

          <fieldset className="rounded-md border border-zinc-200 p-4">
            <legend className="px-1 text-sm font-semibold">대상 학급</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {classes.map((className) => (
                <label key={className} className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm">
                  <input
                    type="checkbox"
                    checked={targetClasses.includes(className)}
                    onChange={() => toggleTargetClass(className)}
                  />
                  {className}
                </label>
              ))}
            </div>
            {activityMode === "group" ? (
              <label className="mt-4 block text-sm font-medium">
                모둠 편성 확인 학급
                <select
                  value={selectedClassName}
                  onChange={(event) => selectClass(event.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-zinc-300 bg-white px-3"
                >
                  {targetClasses.map((className) => (
                    <option key={className}>{className}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </fieldset>

          <AttendanceSummary
            selectedClassName={selectedClassName}
            presentCount={presentStudents.length}
            absentStudents={absentStudents}
            onOpenModal={() => setAttendanceModalOpen(true)}
          />

          {attendanceModalOpen ? (
            <AttendanceModal
              selectedClassName={selectedClassName}
              selectedStudents={selectedStudents}
              attendanceByStudent={attendanceByStudent}
              onSetAttendance={setAttendance}
              onClose={() => setAttendanceModalOpen(false)}
            />
          ) : null}

          {activityMode === "group" ? (
            <GroupSummary
              selectedClassName={selectedClassName}
              managedGroups={managedGroups}
              groupAssignments={groupAssignments}
              selectedStudents={selectedStudents}
              unassignedStudents={unassignedStudents}
              attendanceByStudent={attendanceByStudent}
              onOpenModal={() => setGroupModalOpen(true)}
            />
          ) : null}

          {activityMode === "group" && groupModalOpen ? (
            <GroupSetupModal
              selectedClassName={selectedClassName}
              managedGroups={managedGroups}
              groupAssignments={groupAssignments}
              selectedStudents={selectedStudents}
              unassignedStudents={unassignedStudents}
              attendanceByStudent={attendanceByStudent}
              onClose={() => setGroupModalOpen(false)}
              onAddGroup={addGroup}
              onDeleteGroup={deleteGroup}
              onDragStudent={dragStudent}
              onDropStudent={dropStudent}
            />
          ) : null}

          <label className="text-sm font-medium">
            안내 텍스트
            <textarea name="instructions" className="mt-1 min-h-28 w-full rounded-md border border-zinc-300 p-3" defaultValue={selectedTemplate.guide} />
          </label>

          <div className="rounded-lg border border-dashed border-zinc-300 bg-stone-50 p-6 text-center">
            <ImageUp className="mx-auto h-8 w-8 text-emerald-700" />
            <p className="mt-2 text-sm font-medium">이미지 또는 PDF 중심 자료 업로드</p>
            <p className="mt-1 text-xs text-zinc-500">초기 구현은 중심 자료 1개만 사용합니다.</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={(event) => setMaterialFile(event.target.files?.[0] ?? null)}
              className="mt-4 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-zinc-950 file:px-3 file:py-2 file:font-semibold file:text-white"
            />
            {materialFile ? <p className="mt-2 text-xs text-zinc-600">선택: {materialFile.name}</p> : null}
          </div>

          {createError ? <p role="alert" className="text-sm text-red-700">{createError}</p> : null}
          <button disabled={creating} className="h-11 rounded-md bg-zinc-950 text-sm font-semibold text-white disabled:bg-zinc-400">{creating ? "업로드 및 생성 중..." : "활동 생성"}</button>
        </div>
      </form>

      <aside className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="font-semibold">생성 후 제공 정보</h2>
        <div className="mt-4 rounded-lg border border-zinc-200 p-4 text-center">
          {qrDataUrl ? <Image src={qrDataUrl} alt="학생 활동 접속 QR 코드" width={160} height={160} unoptimized className="mx-auto h-40 w-40" /> : <QrCode className="mx-auto h-20 w-20 text-zinc-800" />}
          <p className="mt-3 text-sm font-semibold">활동 코드</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider">{generatedPreview?.activity.code ?? "생성 후 표시"}</p>
        </div>
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-800" />
            <h3 className="text-sm font-semibold text-emerald-950">모둠 제출 조건</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-emerald-950">
            모둠 활동은 모든 출석 모둠원이 최종 내용을 확인하고 동의해야 제출됩니다.
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-600">
          활동 생성 후 학생 접속 URL을 담은 QR 코드와 짧은 활동 코드를 제공합니다.
        </p>
        {generatedPreview ? (
          <div className="mt-5 rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="rounded-md border border-emerald-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <h3 className="text-sm font-semibold text-emerald-950">활동 생성 준비 완료</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                현재 브라우저 임시 저장소에 저장되었습니다. 실제 DB/API 연결 시 아래 payload를 같은 구조로 넘기면 됩니다.
              </p>
              <div className="mt-3 grid gap-2 text-xs">
                <div className="rounded-md border border-zinc-200 bg-stone-50 p-2">
                  <span className="font-semibold text-zinc-600">교사용 결과 경로</span>
                  <code className="mt-1 block break-all font-mono text-zinc-950">{generatedPreview.routes.teacherResults}</code>
                </div>
                <div className="rounded-md border border-zinc-200 bg-stone-50 p-2">
                  <span className="font-semibold text-zinc-600">학생 접속 경로</span>
                  <code className="mt-1 block break-all font-mono text-zinc-950">{generatedPreview.routes.studentEntry}</code>
                </div>
              </div>
            </div>

            <h3 className="mt-4 text-sm font-semibold">생성될 저장 구조</h3>
            <dl className="mt-3 grid gap-2 text-sm">
              <PreviewRow label="Activity" value={`${generatedPreview.activity.id} · ${generatedPreview.activity.activityMode === "group" ? "모둠" : "개인"} 활동`} />
              <PreviewRow label="대상 학급" value={generatedPreview.activity.classes.join(", ") || "없음"} />
              <PreviewRow label="ActivityAttendance" value={`${generatedPreview.activityAttendance.length}개`} />
              <PreviewRow label="ActivityGroup" value={`${generatedPreview.activityGroups.length}개`} />
              <PreviewRow label="GroupSubmission" value={`${generatedPreview.groupSubmissions.length}개 초기 생성`} />
              <PreviewRow label="IndividualSubmission" value={`${generatedPreview.individualSubmissions.length}개 초기 생성`} />
              <PreviewRow label="TeacherRoute" value={generatedPreview.routes.teacherResults} />
              <PreviewRow label="StudentRoute" value={generatedPreview.routes.studentEntry} />
            </dl>
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase text-zinc-500">DB insert payload</h4>
              <pre className="mt-2 max-h-80 overflow-auto rounded-md bg-zinc-950 p-3 text-xs leading-5 text-zinc-50">
                {JSON.stringify(generatedPreview, null, 2)}
              </pre>
            </div>
          </div>
        ) : null}
      </aside>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 font-medium text-zinc-600">{label}</dt>
      <dd className="text-right font-semibold text-zinc-900">{value}</dd>
    </div>
  );
}

function AttendanceSummary({
  selectedClassName,
  presentCount,
  absentStudents,
  onOpenModal,
}: {
  selectedClassName: string;
  presentCount: number;
  absentStudents: LiveStudent[];
  onOpenModal: () => void;
}) {
  return (
    <section className="rounded-md border border-zinc-200 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-sm font-semibold">{selectedClassName} 참여/결석 확인</h2>
          <p className="mt-1 text-sm text-zinc-600">활동 시작 전 결석 학생을 표시합니다. 결석자는 모둠 제출 동의 대상에서 제외됩니다.</p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-semibold hover:bg-stone-50"
        >
          참여 학생 확인
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="rounded-md bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-900">참여 {presentCount}명</span>
        <span className="rounded-md bg-amber-50 px-2.5 py-1 font-semibold text-amber-900">결석 {absentStudents.length}명</span>
      </div>
      {absentStudents.length > 0 ? (
        <p className="mt-2 text-sm leading-6 text-zinc-600">결석: {absentStudents.map((student) => student.name).join(", ")}</p>
      ) : null}
    </section>
  );
}

function AttendanceModal({
  selectedClassName,
  selectedStudents,
  attendanceByStudent,
  onSetAttendance,
  onClose,
}: {
  selectedClassName: string;
  selectedStudents: LiveStudent[];
  attendanceByStudent: Record<string, AttendanceStatus>;
  onSetAttendance: (studentId: string, status: AttendanceStatus) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/40 px-4 py-8">
      <section className="w-full max-w-5xl rounded-lg border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-zinc-200 px-5 py-4">
          <div>
            <h2 className="font-semibold">{selectedClassName} 참여/결석 확인</h2>
            <p className="mt-1 text-sm text-zinc-600">결석으로 표시한 학생은 활동 기록에는 남지만 모둠 제출 동의 대상에서 제외됩니다.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-stone-50"
            aria-label="참여/결석 확인 닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-2 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {selectedStudents.map((student) => {
            const status = attendanceByStudent[student.id] ?? "present";

            return (
              <div key={student.id} className="flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-stone-50 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{student.name}</p>
                  <p className="text-xs text-zinc-500">{student.studentNumber}</p>
                </div>
                <div className="grid shrink-0 grid-cols-2 rounded-md border border-zinc-200 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => onSetAttendance(student.id, "present")}
                    className={`rounded px-2 py-1 text-xs font-semibold ${status === "present" ? "bg-emerald-50 text-emerald-900" : "text-zinc-600"}`}
                  >
                    참여
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetAttendance(student.id, "absent")}
                    className={`rounded px-2 py-1 text-xs font-semibold ${status === "absent" ? "bg-amber-50 text-amber-900" : "text-zinc-600"}`}
                  >
                    결석
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end border-t border-zinc-200 px-5 py-4">
          <button type="button" onClick={onClose} className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white">
            확인 완료
          </button>
        </div>
      </section>
    </div>
  );
}

function ModeButton({ active, title, body, onClick }: { active: boolean; title: string; body: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border p-4 text-left ${active ? "border-emerald-300 bg-emerald-50" : "border-zinc-200 hover:bg-stone-50"}`}
    >
      <span className="block font-semibold">{title}</span>
      <span className="mt-1 block text-sm text-zinc-600">{body}</span>
    </button>
  );
}

function GroupSummary({
  selectedClassName,
  managedGroups,
  groupAssignments,
  selectedStudents,
  unassignedStudents,
  attendanceByStudent,
  onOpenModal,
}: {
  selectedClassName: string;
  managedGroups: ManagedGroup[];
  groupAssignments: GroupAssignment;
  selectedStudents: LiveStudent[];
  unassignedStudents: LiveStudent[];
  attendanceByStudent: Record<string, AttendanceStatus>;
  onOpenModal: () => void;
}) {
  return (
    <section className="rounded-md border border-zinc-200 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-700" />
            <h2 className="text-sm font-semibold">{selectedClassName} 모둠 편성 확인</h2>
          </div>
          <p className="mt-1 text-sm text-zinc-600">현재 편성을 빠르게 확인하고, 필요할 때만 모달에서 조정합니다.</p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white"
        >
          편성 변경
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {managedGroups.map((group) => {
          const groupStudents = (groupAssignments[group.id] ?? [])
            .map((studentId) => selectedStudents.find((student) => student.id === studentId))
            .filter((student) => student?.className === selectedClassName);
          const presentCount = groupStudents.filter((student) => student && attendanceByStudent[student.id] !== "absent").length;
          const absentCount = groupStudents.length - presentCount;

          return (
            <div key={group.id} className="rounded-md border border-zinc-200 bg-stone-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">{group.name}</h3>
                <span className="text-xs font-semibold text-zinc-500">동의 대상 {presentCount}명</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
                {groupStudents.length > 0 ? groupStudents.map((student) => student?.name).join(", ") : "편성된 학생 없음"}
              </p>
              {absentCount > 0 ? <p className="mt-1 text-xs font-semibold text-amber-800">결석 {absentCount}명 제외</p> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
        {unassignedStudents.length > 0
          ? `${unassignedStudents.length}명의 학생이 아직 모둠에 편성되지 않았습니다.`
          : `${selectedStudents.length}명의 학생이 모둠에 편성되어 있습니다.`}
      </div>
    </section>
  );
}

function GroupSetupModal({
  selectedClassName,
  managedGroups,
  groupAssignments,
  selectedStudents,
  unassignedStudents,
  attendanceByStudent,
  onAddGroup,
  onDeleteGroup,
  onDragStudent,
  onDropStudent,
  onClose,
}: {
  selectedClassName: string;
  managedGroups: ManagedGroup[];
  groupAssignments: GroupAssignment;
  selectedStudents: LiveStudent[];
  unassignedStudents: LiveStudent[];
  attendanceByStudent: Record<string, AttendanceStatus>;
  onAddGroup: () => void;
  onDeleteGroup: (groupId: string) => void;
  onDragStudent: (event: DragEvent<HTMLElement>, studentId: string) => void;
  onDropStudent: (event: DragEvent<HTMLElement>, targetGroupId: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/40 px-4 py-8">
      <section className="w-full max-w-6xl rounded-lg border border-zinc-200 bg-white shadow-xl">
        <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">{selectedClassName} 모둠 편성</h2>
            </div>
            <p className="mt-1 text-sm text-zinc-600">학생 카드를 드래그해서 이번 활동에 사용할 모둠을 조정합니다.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onAddGroup} className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white">
              <Plus className="h-4 w-4" />
              모둠 추가
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-stone-50"
              aria-label="모둠 편성 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
            공동 제출은 출석한 모둠원 전원이 최종 제출 전 동의해야 완료됩니다. 결석 처리된 학생은 동의 대상에서 제외하고 기록만 남깁니다.
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
              <h3 className="text-sm font-semibold">학생 대기 목록</h3>
              <div className="mt-3 grid gap-2">
                {unassignedStudents.map((student) => (
                  <StudentDragCard
                    key={student.id}
                    student={student}
                    absent={attendanceByStudent[student.id] === "absent"}
                    onDragStart={onDragStudent}
                  />
                ))}
                {unassignedStudents.length === 0 ? (
                  <div className="rounded-md border border-zinc-200 bg-white px-3 py-5 text-center text-sm text-zinc-500">
                    모든 학생이 편성되어 있습니다.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {managedGroups.map((group) => {
                const groupStudents = (groupAssignments[group.id] ?? [])
                  .map((studentId) => selectedStudents.find((student) => student.id === studentId))
                  .filter((student) => student?.className === selectedClassName);
                const presentCount = groupStudents.filter((student) => student && attendanceByStudent[student.id] !== "absent").length;
                const absentCount = groupStudents.length - presentCount;

                return (
                  <div
                    key={group.id}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => onDropStudent(event, group.id)}
                    className="min-h-64 rounded-lg border border-dashed border-zinc-300 bg-stone-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="mt-1 text-xs text-zinc-500">출석 {presentCount}명 동의 필요 · 결석 {absentCount}명 제외</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteGroup(group.id)}
                        className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 text-xs font-semibold text-zinc-600 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        제거
                      </button>
                    </div>
                    <div className="mt-3 grid gap-2">
                      {groupStudents.map((student) => (
                        <StudentDragCard
                          key={student?.id}
                          student={student!}
                          absent={student ? attendanceByStudent[student.id] === "absent" : false}
                          onDragStart={onDragStudent}
                        />
                      ))}
                      {groupStudents.length === 0 ? (
                        <div className="rounded-md border border-zinc-200 bg-white px-3 py-8 text-center text-sm text-zinc-500">
                          여기에 학생을 놓으세요.
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button type="button" onClick={onClose} className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white">
              편성 완료
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentDragCard({
  student,
  absent = false,
  onDragStart,
}: {
  student: LiveStudent;
  absent?: boolean;
  onDragStart: (event: DragEvent<HTMLElement>, studentId: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, student.id)}
      className={`flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm active:cursor-grabbing ${
        absent ? "border-amber-200 bg-amber-50 text-amber-950" : "border-zinc-200 bg-white"
      }`}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-zinc-400" />
      <span className="min-w-0 flex-1 truncate font-medium">{student.name}</span>
      {absent ? <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-900">결석</span> : null}
      <span className="shrink-0 text-xs text-zinc-500">{student.studentNumber}</span>
    </div>
  );
}
