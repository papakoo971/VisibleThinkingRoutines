import { TeacherDashboardLive } from "./teacher-dashboard-live";

export default async function TeacherDashboard({ searchParams }: { searchParams: Promise<{ view?: string; subject?: string; className?: string }> }) {
  const params = await searchParams;
  return <TeacherDashboardLive view={params.view === "class" ? "class" : "subject"} subject={params.subject} className={params.className} hasExplicitView={Boolean(params.view)} />;
}
