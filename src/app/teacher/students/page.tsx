"use client";

import { DragEvent, useMemo, useState } from "react";
import { Download, FileSpreadsheet, GripVertical, KeyRound, Plus, Trash2, Upload, Users, Workflow } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { classes as initialClasses, groups, students } from "@/lib/mock-data";

type GroupAssignment = Record<string, string[]>;
type ManagedGroup = { id: string; name: string };

const initialGroupAssignments = groups.reduce<GroupAssignment>((assignment, group) => {
  assignment[group.id] = group.studentIds;
  return assignment;
}, {});

export default function StudentsPage() {
  const [classList, setClassList] = useState(initialClasses);
  const [selectedClassName, setSelectedClassName] = useState(initialClasses[0]);
  const [newClassName, setNewClassName] = useState("");
  const [managedGroups, setManagedGroups] = useState<ManagedGroup[]>(groups.map((group) => ({ id: group.id, name: group.name })));
  const [groupAssignments, setGroupAssignments] = useState(initialGroupAssignments);

  const selectedStudents = useMemo(
    () => students.filter((student) => student.className === selectedClassName),
    [selectedClassName]
  );

  const assignedStudentIds = new Set(Object.values(groupAssignments).flat());
  const unassignedStudents = selectedStudents.filter((student) => !assignedStudentIds.has(student.id));

  function addClass() {
    const trimmed = newClassName.trim();
    if (!trimmed || classList.includes(trimmed)) return;
    setClassList((current) => [...current, trimmed]);
    setSelectedClassName(trimmed);
    setNewClassName("");
  }

  function deleteClass(className: string) {
    const nextClasses = classList.filter((item) => item !== className);
    setClassList(nextClasses);
    if (selectedClassName === className) setSelectedClassName(nextClasses[0] ?? "");
  }

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
    const nextNumber = managedGroups.length + 1;
    const id = `g-${Date.now()}`;
    setManagedGroups((current) => [...current, { id, name: `${nextNumber}모둠` }]);
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

  return (
    <AppShell>
      <PageHeader
        eyebrow="학급 관리"
        title="학급, 학생, 모둠 관리"
        description="상단에서 학급을 선택하고, 선택한 학급의 학생과 모둠을 한 화면에서 관리합니다."
      />

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-semibold">학급 목록</h2>
            <p className="mt-1 text-sm text-zinc-600">학급 카드를 선택하면 아래 학생 관리와 모둠 관리가 함께 바뀝니다.</p>
          </div>
          <div className="flex gap-2">
            <input
              value={newClassName}
              onChange={(event) => setNewClassName(event.target.value)}
              className="h-10 min-w-0 rounded-md border border-zinc-300 px-3 text-sm"
              placeholder="예: 6학년 1반"
            />
            <button
              type="button"
              onClick={addClass}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              추가
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          {classList.map((className) => {
            const studentCount = students.filter((student) => student.className === className).length;

            return (
              <div
                key={className}
                className={`rounded-lg border p-4 ${
                  selectedClassName === className ? "border-emerald-300 bg-emerald-50" : "border-zinc-200 bg-stone-50"
                }`}
              >
                <button type="button" onClick={() => setSelectedClassName(className)} className="block w-full text-left">
                  <span className="block font-semibold">{className}</span>
                  <span className="mt-2 block text-sm text-zinc-600">등록 학생 {studentCount}명</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteClass(className)}
                  className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-semibold text-zinc-600 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">{selectedClassName || "선택된 학급 없음"} 학생 관리</h2>
            </div>
            <p className="mt-2 text-sm text-zinc-600">CSV 또는 XLSX로 학생을 일괄 등록하고 비밀번호를 발급합니다.</p>
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-semibold">
            <KeyRound className="h-4 w-4" />
            비밀번호 다운로드
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-stone-50 text-center">
              <FileSpreadsheet className="h-8 w-8 text-emerald-700" />
              <p className="mt-3 text-sm font-medium">CSV 또는 XLSX 파일 업로드</p>
              <p className="mt-1 text-xs text-zinc-500">필수 컬럼: 학급, 학번, 이름</p>
              <button className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white">
                <Upload className="h-4 w-4" />
                파일 선택
              </button>
            </div>
            <button className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white text-sm font-semibold">
              <Download className="h-4 w-4" />
              샘플 CSV 다운로드
            </button>
          </div>

          <div className="overflow-x-auto rounded-md border border-zinc-200">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">학번</th>
                  <th className="px-4 py-3">이름</th>
                  <th className="px-4 py-3">비밀번호</th>
                  <th className="px-4 py-3">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {selectedStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-3 font-mono text-xs">{student.studentNumber}</td>
                    <td className="px-4 py-3 font-medium">{student.name}</td>
                    <td className="px-4 py-3 text-emerald-700">발급됨</td>
                    <td className="px-4 py-3">
                      <button className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold">
                        재발급
                      </button>
                    </td>
                  </tr>
                ))}
                {selectedStudents.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-sm text-zinc-500" colSpan={4}>
                      아직 등록된 학생이 없습니다.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-emerald-700" />
              <h2 className="font-semibold">{selectedClassName || "선택된 학급 없음"} 모둠 관리</h2>
            </div>
            <p className="mt-2 text-sm text-zinc-600">학생 카드를 드래그해서 원하는 모둠 영역에 놓으면 배정됩니다.</p>
          </div>
          <button
            type="button"
            onClick={addGroup}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            모둠 추가
          </button>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <h3 className="font-semibold">학생 대기 목록</h3>
            <div className="mt-3 grid gap-2">
              {(unassignedStudents.length > 0 ? unassignedStudents : selectedStudents).map((student) => (
                <StudentDragCard key={student.id} studentId={student.id} onDragStart={dragStudent} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {managedGroups.map((group) => {
              const groupStudents = (groupAssignments[group.id] ?? [])
                .map((studentId) => students.find((student) => student.id === studentId))
                .filter((student) => student?.className === selectedClassName);

              return (
                <div
                  key={group.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => dropStudent(event, group.id)}
                  className="min-h-52 rounded-lg border border-dashed border-zinc-300 bg-stone-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <span className="mt-1 block text-sm font-medium text-zinc-500">{groupStudents.length}명</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteGroup(group.id)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-semibold text-zinc-600 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      제거
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {groupStudents.map((student) => (
                      <StudentDragCard key={student?.id} studentId={student?.id ?? ""} onDragStart={dragStudent} />
                    ))}
                    {groupStudents.length === 0 ? (
                      <div className="rounded-md border border-zinc-200 bg-white px-3 py-6 text-center text-sm text-zinc-500">
                        여기에 학생을 놓으세요.
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function StudentDragCard({
  studentId,
  onDragStart,
}: {
  studentId: string;
  onDragStart: (event: DragEvent<HTMLElement>, studentId: string) => void;
}) {
  const student = students.find((item) => item.id === studentId);
  if (!student) return null;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, student.id)}
      className="flex cursor-grab items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4 text-zinc-400" />
      <span className="font-medium">{student.name}</span>
      <span className="ml-auto text-xs text-zinc-500">{student.studentNumber}</span>
    </div>
  );
}
