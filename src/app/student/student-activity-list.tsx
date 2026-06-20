"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/app-shell";
import { fetchCreatedActivityPayloads } from "@/lib/local-created-activities";
import type { Activity } from "@/lib/mock-data";

type DisplayActivity = Omit<Activity, "routine" | "materialType"> & {
  routine: string;
  materialType: string;
};

export function StudentActivityList({ initialActivities }: { initialActivities: Activity[] }) {
  const [createdActivities, setCreatedActivities] = useState<DisplayActivity[]>([]);

  useEffect(() => {
    fetchCreatedActivityPayloads().then((payloads) => setCreatedActivities(payloads.map((payload) => payload.activity)));
  }, []);

  const activities = [...createdActivities, ...initialActivities];

  return (
    <div className="divide-y divide-zinc-100">
      {activities.map((activity) => (
        <Link
          key={activity.id}
          href={`/student/activities/${activity.id}`}
          className="grid gap-3 px-5 py-4 hover:bg-stone-50 sm:grid-cols-[1fr_auto]"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium">{activity.title}</h3>
              <StatusBadge status={activity.status} />
            </div>
            <p className="mt-1 text-sm text-zinc-600">
              {activity.subject} · {activity.activityMode === "group" ? "모둠 활동" : "개인 활동"} · {activity.routine}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            {activity.status === "active" ? "참여하기" : "결과 보기"}
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      ))}
    </div>
  );
}
