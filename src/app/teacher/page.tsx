import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell, PageHeader, PrimaryLink, StatusBadge } from "@/components/app-shell";
import { activities, classes, teacherProfile } from "@/lib/mock-data";
import type { Activity } from "@/lib/mock-data";

export default async function TeacherDashboard({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; subject?: string; className?: string }>;
}) {
  const { view = "subject", subject, className } = await searchParams;
  const subjects = Array.from(new Set(activities.map((activity) => activity.subject)));
  const selectedSubject = subject ?? subjects[0];
  const subjectClasses = classes.filter((item) =>
    activities.some((activity) => activity.subject === selectedSubject && activity.classes.includes(item))
  );
  const selectedSubjectClassName = className && subjectClasses.includes(className) ? className : subjectClasses[0];
  const selectedClassName = className ?? classes[0];
  const classSubjects = subjects.filter((item) =>
    activities.some((activity) => activity.subject === item && activity.classes.includes(selectedClassName))
  );
  const selectedClassSubject = subject && classSubjects.includes(subject) ? subject : classSubjects[0];

  return (
    <AppShell>
      <PageHeader
        eyebrow={teacherProfile.schoolLabel}
        title={`${teacherProfile.name}의 수업 운영`}
        description="학급, 학생, 모둠, 활동을 관리하고 사고 루틴 결과를 확인합니다."
        action={<PrimaryLink href="/teacher/activities/new">활동 만들기</PrimaryLink>}
      />

      <section>
        <div className="rounded-lg border border-zinc-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex rounded-md border border-zinc-200 bg-stone-50 p-1">
              <Link
                href="/teacher?view=subject"
                className={`rounded px-3 py-1.5 text-sm font-semibold ${
                  view === "class" ? "text-zinc-600 hover:bg-white" : "bg-white text-emerald-900 shadow-sm"
                }`}
              >
                과목 우선 보기
              </Link>
              <Link
                href="/teacher?view=class"
                className={`rounded px-3 py-1.5 text-sm font-semibold ${
                  view === "class" ? "bg-white text-emerald-900 shadow-sm" : "text-zinc-600 hover:bg-white"
                }`}
              >
                학급 우선 보기
              </Link>
            </div>
            <Link href="/teacher/activities/new" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Plus className="h-4 w-4" />새 활동
            </Link>
          </div>
          <div className="grid gap-6 p-5">
            {view === "class" ? (
              <DashboardClassFlow
                selectedClassName={selectedClassName}
                selectedSubject={selectedClassSubject}
                subjects={classSubjects}
              />
            ) : (
              <DashboardSubjectFlow
                selectedSubject={selectedSubject}
                selectedClassName={selectedSubjectClassName}
                classNames={subjectClasses}
              />
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function DashboardSubjectFlow({
  selectedSubject,
  selectedClassName,
  classNames,
}: {
  selectedSubject: string;
  selectedClassName?: string;
  classNames: string[];
}) {
  const subjects = Array.from(new Set(activities.map((activity) => activity.subject)));
  const selectedActivities = activities.filter(
    (activity) => activity.subject === selectedSubject && activity.classes.includes(selectedClassName ?? "")
  );

  return (
    <>
      <Selector title="1. 과목 선택" columns="md:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject}
            href={`/teacher?view=subject&subject=${encodeURIComponent(subject)}`}
            className={`rounded-md border px-3 py-2 text-sm font-semibold ${
              subject === selectedSubject ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200 hover:bg-stone-50"
            }`}
          >
            <span className="block text-base">{subject}</span>
            <span className="mt-1 block text-xs font-medium text-zinc-500">
              {activities.filter((activity) => activity.subject === subject).length}개 활동
            </span>
          </Link>
        ))}
      </Selector>

      <Selector title={`2. ${selectedSubject} 활동 학급`} columns="md:grid-cols-3">
        {classNames.map((className) => (
          <Link
            key={className}
            href={`/teacher?view=subject&subject=${encodeURIComponent(selectedSubject)}&className=${encodeURIComponent(className)}`}
            className={`rounded-md border px-4 py-3 ${
              className === selectedClassName ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200 hover:bg-stone-50"
            }`}
          >
            <span className="block font-semibold">{className}</span>
            <span className="mt-1 block text-sm text-zinc-600">
              {activities.filter((activity) => activity.subject === selectedSubject && activity.classes.includes(className)).length}개 활동
            </span>
          </Link>
        ))}
      </Selector>

      <ActivityList title={`3. ${selectedSubject} · ${selectedClassName ?? "학급"} 활동`} activities={selectedActivities} />
    </>
  );
}

function DashboardClassFlow({
  selectedClassName,
  selectedSubject,
  subjects,
}: {
  selectedClassName: string;
  selectedSubject?: string;
  subjects: string[];
}) {
  const selectedActivities = activities.filter(
    (activity) => activity.subject === selectedSubject && activity.classes.includes(selectedClassName)
  );

  return (
    <>
      <Selector title="1. 학급 선택" columns="md:grid-cols-3">
        {classes.map((className) => (
          <Link
            key={className}
            href={`/teacher?view=class&className=${encodeURIComponent(className)}`}
            className={`rounded-md border px-3 py-2 text-sm font-semibold ${
              className === selectedClassName ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200 hover:bg-stone-50"
            }`}
          >
            <span className="block text-base">{className}</span>
            <span className="mt-1 block text-xs font-medium text-zinc-500">
              {activities.filter((activity) => activity.classes.includes(className)).length}개 활동
            </span>
          </Link>
        ))}
      </Selector>

      <Selector title={`2. ${selectedClassName} 활동 과목`} columns="md:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject}
            href={`/teacher?view=class&className=${encodeURIComponent(selectedClassName)}&subject=${encodeURIComponent(subject)}`}
            className={`rounded-md border px-4 py-3 ${
              subject === selectedSubject ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-zinc-200 hover:bg-stone-50"
            }`}
          >
            <span className="block font-semibold">{subject}</span>
            <span className="mt-1 block text-sm text-zinc-600">
              {activities.filter((activity) => activity.subject === subject && activity.classes.includes(selectedClassName)).length}개 활동
            </span>
          </Link>
        ))}
      </Selector>

      <ActivityList title={`3. ${selectedClassName} · ${selectedSubject ?? "과목"} 활동`} activities={selectedActivities} />
    </>
  );
}

function Selector({ title, columns = "md:grid-cols-2", children }: { title: string; columns?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-zinc-800">{title}</h2>
      <div className={`mt-3 grid gap-3 ${columns}`}>{children}</div>
    </section>
  );
}

function ActivityList({ title, activities }: { title: string; activities: Activity[] }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          <p className="mt-1 text-sm text-zinc-600">선택한 조건에 맞는 활동을 바로 열어 결과를 확인합니다.</p>
        </div>
        <span className="text-sm font-semibold text-emerald-800">{activities.length}개 활동</span>
      </div>
      <div className="mt-3 grid gap-2">
        {activities.map((activity) => (
          <Link
            href={`/teacher/activities/${activity.id}/results`}
            key={activity.id}
            className="grid gap-3 rounded-md border border-zinc-200 bg-white px-4 py-3 hover:border-emerald-300 md:grid-cols-[1fr_130px_120px]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium">{activity.title}</h4>
                <StatusBadge status={activity.status} />
              </div>
              <p className="mt-1 text-sm text-zinc-600">
                {activity.routine} · {activity.subject} · {activity.classes.join(", ")}
              </p>
            </div>
            <div className="text-sm text-zinc-600">
              제출 {activity.submittedCount}/{activity.targetCount}
            </div>
            <div className="text-sm font-medium text-zinc-700">{activity.activityDate}</div>
          </Link>
        ))}
        {activities.length === 0 ? (
          <div className="rounded-md border border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500">
            선택한 조건에 해당하는 활동이 없습니다.
          </div>
        ) : null}
      </div>
    </section>
  );
}
