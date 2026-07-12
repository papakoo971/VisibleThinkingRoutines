import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/app-shell";
type DisplayActivity = {
  id: string;
  title: string;
  routine: string;
  activityMode: "individual" | "group";
  subject: string;
  classes: string[];
  status: "active" | "closed";
  code: string;
  materialType: string;
  activityDate: string;
  submittedCount: number;
  targetCount: number;
};

export function StudentActivityList({ activities }: { activities: DisplayActivity[] }) {
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
