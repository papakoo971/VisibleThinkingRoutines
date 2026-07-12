import Link from "next/link";
import { CalendarDays, ClipboardList, School } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MyActivitiesClient } from "./my-activities-client";

const views = [
  { id: "class", label: "학급별 보기", icon: School },
  { id: "activity", label: "활동별 보기", icon: ClipboardList },
  { id: "date", label: "활동 날짜별 보기", icon: CalendarDays },
];

export default async function MyActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "class" } = await searchParams;

  return (
    <AppShell>
      <PageHeader
        eyebrow="내가 만든 활동"
        title={views.find((item) => item.id === view)?.label ?? "학급별 보기"}
        description="생성한 활동을 학급, 활동, 날짜 기준으로 빠르게 찾아 결과를 확인합니다."
      />

      <section className="grid gap-6 xl:grid-cols-[220px_1fr]">
        <nav className="rounded-lg border border-zinc-200 bg-white p-3">
          {views.map((item) => {
            const Icon = item.icon;
            const active = item.id === view;
            return (
              <Link
                key={item.id}
                href={`/teacher/activities?view=${item.id}`}
                className={`mb-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold ${
                  active ? "bg-emerald-50 text-emerald-900" : "text-zinc-700 hover:bg-stone-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MyActivitiesClient view={view} />
      </section>
    </AppShell>
  );
}
