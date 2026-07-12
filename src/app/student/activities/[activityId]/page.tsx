import { StudentActivityView } from "../../student-activity-view";
import { activities } from "@/lib/mock-data";

export function generateStaticParams() {
  return activities.map((activity) => ({ activityId: activity.id }));
}

export default async function StudentActivityPage({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;
  const activity = activities.find((item) => item.id === activityId);

  return <StudentActivityView activityId={activity?.id ?? activityId} />;
}
