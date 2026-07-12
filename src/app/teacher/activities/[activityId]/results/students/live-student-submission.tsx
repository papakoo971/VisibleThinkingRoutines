"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { fetchTeacherActivityResults, generateTeacherAnalysis, updateAnalysisVisibility, type TeacherActivityResults } from "@/lib/teacher-results";
import type { RoutineColumn } from "@/lib/mock-data";

const columns: Array<{ id: RoutineColumn; label: string }> = [
  { id: "see", label: "See" },
  { id: "think", label: "Think" },
  { id: "wonder", label: "Wonder" },
];

export function LiveStudentSubmission({ activityId, studentId }: { activityId: string; studentId: string }) {
  const [results, setResults] = useState<TeacherActivityResults | null | undefined>(undefined);
  const [analyzing, setAnalyzing] = useState(false);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

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
  const analysis = results.analyses.filter((item) => item.scope === "student" && item.studentId === studentId && item.status === "complete").sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const stale = Boolean(analysis && analysis.sourceFingerprint !== submission?.sourceFingerprint);

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
      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div><h2 className="font-semibold">개인 AI 분석</h2><p className="mt-2 text-sm leading-6 text-zinc-600">{analysis?.summary ?? "학생 카드가 준비되면 개인 분석을 실행할 수 있습니다."}</p>{stale ? <p className="mt-2 text-sm font-semibold text-amber-700">카드 변경으로 갱신이 필요합니다.</p> : null}{analysisError ? <p role="alert" className="mt-2 text-sm text-red-700">{analysisError}</p> : null}</div>
          <button type="button" disabled={analyzing || !submission?.cards.length} onClick={async () => { setAnalyzing(true); setAnalysisError(null); try { await generateTeacherAnalysis(activityId, "student", studentId); setResults(await fetchTeacherActivityResults(activityId)); } catch (error) { setAnalysisError(error instanceof Error ? error.message : "AI 분석에 실패했습니다."); } finally { setAnalyzing(false); } }} className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white disabled:bg-zinc-400">{analyzing ? "분석 중..." : analysis ? "분석 갱신" : "개인 분석 실행"}</button>
        </div>
        {analysis ? <><div className="mt-4 grid gap-3 md:grid-cols-2"><p className="rounded-md bg-stone-50 p-3 text-sm"><strong>강점:</strong> {analysis.strengths.join(" · ")}</p><p className="rounded-md bg-stone-50 p-3 text-sm"><strong>다음 발문:</strong> {analysis.nextQuestions.join(" · ")}</p></div><div className="mt-4 flex flex-col gap-2 rounded-md border border-zinc-200 bg-stone-50 p-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-zinc-900">학생 피드백 공개</p><p className="mt-1 text-xs text-zinc-500">공개하면 이 학생의 활동 화면에 요약, 강점, 다음 발문과 추천이 표시됩니다.</p></div><button type="button" disabled={updatingVisibility} onClick={async () => { setUpdatingVisibility(true); setAnalysisError(null); try { await updateAnalysisVisibility(activityId, analysis.id, !analysis.studentVisible); setResults(await fetchTeacherActivityResults(activityId)); } catch (error) { setAnalysisError(error instanceof Error ? error.message : "공개 설정 변경에 실패했습니다."); } finally { setUpdatingVisibility(false); } }} className={`h-9 shrink-0 rounded-md px-3 text-sm font-semibold ${analysis.studentVisible ? "border border-zinc-300 bg-white text-zinc-700" : "bg-emerald-700 text-white"}`}>{updatingVisibility ? "변경 중..." : analysis.studentVisible ? "학생에게 비공개" : "학생에게 공개"}</button></div></> : null}
      </section>
    </AppShell>
  );
}
