import { notFound } from "next/navigation";
import { ActivityResultsView } from "../../activity-results-view";
import { activities } from "@/lib/mock-data";

export function generateStaticParams() {
  return activities.map((activity) => ({ activityId: activity.id }));
}

export default async function ActivityResultsPage({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;
  const activity = activities.find((item) => item.id === activityId);

  if (!activity && !activityId.startsWith("new-")) notFound();

  return <ActivityResultsView activityId={activity?.id ?? activityId} />;
}
