"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import readXlsxFile from "read-excel-file/browser";
import { Download, FileSpreadsheet, GripVertical, KeyRound, Plus, Trash2, Upload, Users, Workflow } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { getFirebaseAuth } from "@/lib/firebase-auth";
import { assignStudentToDefaultGroup, createClass, createDefaultGroup, deleteClass, deleteDefaultGroup, deleteStudent, fetchClassManagement, randomizeDefaultGroups, resetStudentPassword, updateStudent, type ClassManagement } from "@/lib/class-management";

type GroupAssignment = Record<string, string[]>;
type IssuedCredential = { className: string; studentNumber: string; name: string; email: string; password: string };
type ImportResult = {
  total: number;
  successCount: number;
  errorCount: number;
  credentials: IssuedCredential[];
  errors: Array<{ row: number; message: string }>;
};

export default function StudentsPage() {
  const [management, setManagement] = useState<ClassManagement | null>(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [randomMode, setRandomMode] = useState<"groupSize" | "groupCount">("groupSize");
  const [randomValue, setRandomValue] = useState(4);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [managementError, setManagementError] = useState<string | null>(null);
  const [issuedPassword, setIssuedPassword] = useState<{ studentName: string; password: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    void fetchClassManagement().then((data) => {
      if (!active) return;
      setManagement(data);
      setSelectedClassId((current) => current || data.classes[0]?.id || "");
    }).catch((error: unknown) => active && setManagementError(error instanceof Error ? error.message : "학급 정보를 불러오지 못했습니다."));
    return () => { active = false; };
  }, []);

  const classList = management?.classes ?? [];
  const selectedClass = classList.find((item) => item.id === selectedClassId);
  const selectedClassName = selectedClass?.name ?? "";
  const students = management?.students ?? [];
  const managedGroups = (management?.groups ?? []).filter((group) => group.classId === selectedClassId);
  const groupAssignments = managedGroups.reduce<GroupAssignment>((result, group) => ({ ...result, [group.id]: group.studentIds }), {});
  const selectedStudents = students.filter((student) => student.classId === selectedClassId);

  const assignedStudentIds = new Set(Object.values(groupAssignments).flat());
  const unassignedStudents = selectedStudents.filter((student) => !assignedStudentIds.has(student.id));

  async function addClass() {
    const trimmed = newClassName.trim();
    if (!trimmed || classList.some((item) => item.name === trimmed)) return;
    try {
      const next = await createClass(trimmed);
      setManagement(next);
      setSelectedClassId(next.classes.find((item) => item.name === trimmed)?.id ?? selectedClassId);
      setNewClassName("");
      setManagementError(null);
    } catch (error) { setManagementError(error instanceof Error ? error.message : "학급을 추가하지 못했습니다."); }
  }

  async function removeClass(classId: string) {
    try {
      const next = await deleteClass(classId);
      setManagement(next);
      if (selectedClassId === classId) setSelectedClassId(next.classes[0]?.id ?? "");
      setManagementError(null);
    } catch (error) { setManagementError(error instanceof Error ? error.message : "학급을 삭제하지 못했습니다."); }
  }

  function dragStudent(event: DragEvent<HTMLElement>, studentId: string) {
    event.dataTransfer.setData("text/plain", studentId);
    event.dataTransfer.effectAllowed = "move";
  }

  function dropStudent(event: DragEvent<HTMLElement>, targetGroupId: string) {
    event.preventDefault();
    const studentId = event.dataTransfer.getData("text/plain");
    if (!studentId) return;

    void assignStudentToDefaultGroup(selectedClassId, targetGroupId, studentId).then(setManagement).catch((error: unknown) => setManagementError(error instanceof Error ? error.message : "학생을 이동하지 못했습니다."));
  }

  function addGroup() {
    if (!selectedClassId) return;
    const nextNumber = managedGroups.length + 1;
    void createDefaultGroup(selectedClassId, `${nextNumber}모둠`).then(setManagement).catch((error: unknown) => setManagementError(error instanceof Error ? error.message : "모둠을 추가하지 못했습니다."));
  }

  function removeGroup(groupId: string) {
    void deleteDefaultGroup(groupId).then(setManagement).catch((error: unknown) => setManagementError(error instanceof Error ? error.message : "모둠을 삭제하지 못했습니다."));
  }

  function randomizeGroups() {
    if (!selectedClassId) return;
    void randomizeDefaultGroups(selectedClassId, randomMode, randomValue).then(setManagement).catch((error: unknown) => setManagementError(error instanceof Error ? error.message : "자동 배정에 실패했습니다."));
  }

  async function importStudents(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImporting(true);
    setImportError(null);

    try {
      let rows;
      if (file.name.toLowerCase().endsWith(".xlsx")) {
        const workbook = await readXlsxFile(file);
        rows = parseStudentRows((workbook[0]?.data ?? []).map((row) => row.map((cell) => cell == null ? "" : String(cell))));
      } else {
        rows = parseStudentCsv(await file.text());
      }
      const user = getFirebaseAuth().currentUser;
      if (!user) throw new Error("교사 로그인이 필요합니다.");
      const response = await fetch("/api/teacher/students/import", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user.getIdToken()}` },
        body: JSON.stringify({ rows }),
      });
      const result = (await response.json()) as ImportResult & { message?: string };
      if (!response.ok) throw new Error(result.message ?? "학생 등록에 실패했습니다.");
      setImportResult(result);
      if (result.credentials[0]) {
        const next = await fetchClassManagement();
        setManagement(next);
        setSelectedClassId(next.classes.find((item) => item.name === result.credentials[0].className)?.id ?? selectedClassId);
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "학생 명단 파일을 처리하지 못했습니다.");
    } finally {
      setImporting(false);
    }
  }

  function downloadCredentials() {
    if (!importResult?.credentials.length) return;
    const header = "학급,학번,이름,로그인 이메일,임시 비밀번호";
    const lines = importResult.credentials.map((item) => [item.className, item.studentNumber, item.name, item.email, item.password].map(csvCell).join(","));
    downloadTextFile(`student-credentials-${new Date().toISOString().slice(0, 10)}.csv`, `\uFEFF${[header, ...lines].join("\n")}`);
  }

  function downloadSample() {
    downloadTextFile("student-import-sample.csv", "\uFEFF학급,학번,이름\n5학년 1반,20260101,김민준\n");
  }

  async function editStudent(student: ClassManagement["students"][number]) {
    const name = window.prompt("학생 이름", student.name)?.trim();
    if (!name) return;
    const studentNumber = window.prompt("학번", student.studentNumber)?.trim();
    if (!studentNumber) return;
    try {
      await updateStudent(student.id, { name, studentNumber, classId: student.classId });
      setManagement(await fetchClassManagement());
      setManagementError(null);
    } catch (error) { setManagementError(error instanceof Error ? error.message : "학생 정보를 수정하지 못했습니다."); }
  }

  async function reissuePassword(student: ClassManagement["students"][number]) {
    try {
      const result = await resetStudentPassword(student.id);
      if (!result.password) throw new Error("새 비밀번호를 받지 못했습니다.");
      setIssuedPassword({ studentName: student.name, password: result.password });
      setManagementError(null);
    } catch (error) { setManagementError(error instanceof Error ? error.message : "비밀번호를 재발급하지 못했습니다."); }
  }

  async function removeStudent(student: ClassManagement["students"][number]) {
    if (!window.confirm(`${student.name} 학생과 로그인 계정을 삭제할까요? 활동 기록도 함께 삭제될 수 있습니다.`)) return;
    try {
      await deleteStudent(student.id);
      setManagement(await fetchClassManagement());
      setManagementError(null);
    } catch (error) { setManagementError(error instanceof Error ? error.message : "학생을 삭제하지 못했습니다."); }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="학급 관리"
        title="학급, 학생, 모둠 관리"
        description="상단에서 학급을 선택하고, 선택한 학급의 학생과 모둠을 한 화면에서 관리합니다."
      />
      {managementError ? <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{managementError}</p> : null}
      {!management && !managementError ? <p className="mb-4 text-sm text-zinc-500">학급 정보를 불러오는 중...</p> : null}

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
          {classList.map((schoolClass) => {
            const studentCount = students.filter((student) => student.classId === schoolClass.id).length;

            return (
              <div
                key={schoolClass.id}
                className={`rounded-lg border p-4 ${
                  selectedClassId === schoolClass.id ? "border-emerald-300 bg-emerald-50" : "border-zinc-200 bg-stone-50"
                }`}
              >
                <button type="button" onClick={() => setSelectedClassId(schoolClass.id)} className="block w-full text-left">
                  <span className="block font-semibold">{schoolClass.name}</span>
                  <span className="mt-2 block text-sm text-zinc-600">등록 학생 {studentCount}명</span>
                </button>
                <button
                  type="button"
                  onClick={() => void removeClass(schoolClass.id)}
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
          <button type="button" onClick={downloadCredentials} disabled={!importResult?.credentials.length} className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:text-zinc-400">
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
              <input ref={fileInputRef} onChange={importStudents} type="file" accept=".csv,text/csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={importing} className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white disabled:bg-zinc-400">
                <Upload className="h-4 w-4" />
                {importing ? "등록 중..." : "CSV/XLSX 파일 선택"}
              </button>
            </div>
            <button type="button" onClick={downloadSample} className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white text-sm font-semibold">
              <Download className="h-4 w-4" />
              샘플 CSV 다운로드
            </button>
            {importError ? <p role="alert" className="mt-3 text-sm text-red-700">{importError}</p> : null}
            {issuedPassword ? <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950"><p className="font-semibold">{issuedPassword.studentName} 임시 비밀번호</p><p className="mt-2 font-mono text-lg font-bold">{issuedPassword.password}</p><p className="mt-1 text-xs">이 창을 닫으면 다시 확인할 수 없습니다.</p><button type="button" onClick={() => void navigator.clipboard.writeText(issuedPassword.password)} className="mt-2 rounded border border-emerald-300 px-2 py-1 text-xs font-semibold">복사</button><button type="button" onClick={() => setIssuedPassword(null)} className="ml-2 rounded border border-emerald-300 px-2 py-1 text-xs font-semibold">닫기</button></div> : null}
            {importResult ? (
              <div className="mt-3 rounded-md border border-zinc-200 bg-stone-50 p-3 text-sm">
                <p className="font-semibold">총 {importResult.total}행 · 성공 {importResult.successCount} · 오류 {importResult.errorCount}</p>
                {importResult.errors.map((error) => <p key={`${error.row}-${error.message}`} className="mt-1 text-red-700">{error.row}행: {error.message}</p>)}
              </div>
            ) : null}
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
                    <td className="px-4 py-3 text-emerald-700">{student.passwordIssued ? "발급됨" : "미발급"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1"><button type="button" onClick={() => void editStudent(student)} className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold">수정</button><button type="button" onClick={() => void reissuePassword(student)} className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold">재발급</button><button type="button" onClick={() => void removeStudent(student)} className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700">삭제</button></div>
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
          <div className="flex flex-wrap gap-2">
            <select value={randomMode} onChange={(event) => setRandomMode(event.target.value as "groupSize" | "groupCount")} className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm"><option value="groupSize">모둠당 인원</option><option value="groupCount">모둠 수</option></select>
            <input type="number" min={2} max={20} value={randomValue} onChange={(event) => setRandomValue(Number(event.target.value))} className="h-10 w-20 rounded-md border border-zinc-300 px-3 text-sm" aria-label="자동 배정 기준값" />
            <button type="button" onClick={randomizeGroups} className="h-10 rounded-md border border-emerald-300 bg-emerald-50 px-3 text-sm font-semibold text-emerald-900">무작위 배정</button>
            <button type="button" onClick={addGroup} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white"><Plus className="h-4 w-4" />모둠 추가</button>
          </div>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <h3 className="font-semibold">학생 대기 목록</h3>
            <div className="mt-3 grid gap-2">
              {unassignedStudents.map((student) => (
                <StudentDragCard key={student.id} student={student} onDragStart={dragStudent} />
              ))}
              {unassignedStudents.length === 0 ? <p className="text-sm text-zinc-500">미배정 학생이 없습니다.</p> : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {managedGroups.map((group) => {
              const groupStudents = (groupAssignments[group.id] ?? [])
                .map((studentId) => students.find((student) => student.id === studentId))
                .filter((student) => student?.classId === selectedClassId);

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
                      onClick={() => removeGroup(group.id)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-semibold text-zinc-600 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      제거
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {groupStudents.map((student) => student ? <StudentDragCard key={student.id} student={student} onDragStart={dragStudent} /> : null)}
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
  student,
  onDragStart,
}: {
  student: ClassManagement["students"][number];
  onDragStart: (event: DragEvent<HTMLElement>, studentId: string) => void;
}) {
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

function parseStudentCsv(source: string) {
  const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  return parseStudentRows(lines.map(parseCsvLine));
}

function parseStudentRows(rows: string[][]) {
  if (rows.length < 2) throw new Error("헤더와 학생 데이터가 포함된 파일을 선택해 주세요.");
  const headers = rows[0].map((header) => header.trim().toLowerCase());
  const classIndex = headers.findIndex((header) => ["학급", "class", "classname"].includes(header));
  const numberIndex = headers.findIndex((header) => ["학번", "studentnumber", "student_number"].includes(header));
  const nameIndex = headers.findIndex((header) => ["이름", "name"].includes(header));
  if ([classIndex, numberIndex, nameIndex].some((index) => index < 0)) throw new Error("필수 헤더는 학급, 학번, 이름입니다.");

  return rows.slice(1).filter((cells) => cells.some((cell) => cell.trim())).map((cells) => {
    return { className: cells[classIndex] ?? "", studentNumber: cells[numberIndex] ?? "", name: cells[nameIndex] ?? "" };
  });
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }
  cells.push(current.trim());
  return cells;
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function downloadTextFile(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
