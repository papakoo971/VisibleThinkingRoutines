"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/app-shell";
import { fetchCreatedActivityPayloads } from "@/lib/local-created-activities";
import type { Activity } from "@/lib/mock-data";

type DisplayActivity = Omit<Activity, "routine" | "materialType"> & {
  routine: string;
  materialType: string;
};

export function MyActivitiesClient({
  view,
  initialActivities,
  classes,
}: {
  view: string;
  initialActivities: Activity[];
  classes: string[];
}) {
  const [createdActivities, setCreatedActivities] = useState<DisplayActivity[]>([]);

  useEffect(() => {
    fetchCreatedActivityPayloads().then((payloads) => setCreatedActivities(payloads.map((payload) => payload.activity)));
  }, []);

  const activities = [...createdActivities, ...initialActivities];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
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
