"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/app-shell";
import { fetchClassManagement } from "@/lib/class-management";
import { fetchCreatedActivityPayloads, type CreatedActivityPayload } from "@/lib/local-created-activities";

type DisplayActivity = CreatedActivityPayload["activity"];

export function MyActivitiesClient({ view }: { view: string }) {
  const [createdActivities, setCreatedActivities] = useState<DisplayActivity[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all");

  useEffect(() => {
    Promise.all([fetchCreatedActivityPayloads(), fetchClassManagement()]).then(([payloads, management]) => {
      setCreatedActivities(payloads.map((payload) => payload.activity));
      setClasses(management.classes.map((schoolClass) => schoolClass.name));
    }).finally(() => setLoading(false));
  }, []);

  const activities = statusFilter === "all" ? createdActivities : createdActivities.filter((activity) => activity.status === statusFilter);

  if (loading) return <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-500">활동을 불러오는 중...</div>;
  if (!createdActivities.length) return <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">아직 만든 활동이 없습니다.</div>;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex gap-2 border-b border-zinc-200 p-4">{(["all", "active", "closed"] as const).map((status) => <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${statusFilter === status ? "bg-zinc-950 text-white" : "bg-stone-100 text-zinc-600"}`}>{status === "all" ? "전체" : status === "active" ? "진행 중" : "마감됨"}</button>)}</div>
      {view === "activity" ? (
        <ActivityList activities={activities} />
      ) : view === "date" ? (
        <DateList activities={activities} />
      ) : (
        <ClassList activities={activities} classes={classes} />
      )}
    </div>
  );
}

function ClassList({ activities, classes }: { activities: DisplayActivity[]; classes: string[] }) {
  return (
    <div className="divide-y divide-zinc-100">
      {classes.map((className) => (
        <section key={className} className="p-5">
          <h2 className="font-semibold">{className}</h2>
          <div className="mt-3 grid gap-2">
            {activities
              .filter((activity) => activity.classes.includes(className))
              .map((activity) => (
                <ActivityRow key={activity.id} activity={activity} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ActivityList({ activities }: { activities: DisplayActivity[] }) {
  return (
    <div className="divide-y divide-zinc-100">
      {activities.map((activity) => (
        <div key={activity.id} className="p-5">
          <ActivityRow activity={activity} />
        </div>
      ))}
    </div>
  );
}

function DateList({ activities }: { activities: DisplayActivity[] }) {
  const dateGroups = Array.from(new Set(activities.map((activity) => activity.activityDate)))
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({
      date,
      activities: activities.filter((activity) => activity.activityDate === date),
    }));

  return (
    <div className="divide-y divide-zinc-100">
      {dateGroups.map((group) => (
        <section key={group.date} className="p-5">
          <h2 className="font-semibold">{group.date}</h2>
          <div className="mt-3 grid gap-2">
            {group.activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ActivityRow({ activity }: { activity: DisplayActivity }) {
  return (
    <Link
      href={`/teacher/activities/${activity.id}/results`}
      className="grid gap-3 rounded-md border border-zinc-200 px-4 py-3 hover:border-emerald-300 hover:bg-stone-50 md:grid-cols-[1fr_140px_120px]"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{activity.title}</h3>
          <StatusBadge status={activity.status} />
        </div>
        <p className="mt-1 text-sm text-zinc-600">
          {activity.routine} · {activity.subject} · {activity.classes.join(", ")}
        </p>
      </div>
      <div className="text-sm text-zinc-600">제출 {activity.submittedCount}/{activity.targetCount}</div>
      <div className="text-sm font-medium text-zinc-700">{activity.activityDate}</div>
    </Link>
  );
}
