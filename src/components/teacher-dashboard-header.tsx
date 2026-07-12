"use client";

import { AppShell, PageHeader, PrimaryLink } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";

export function TeacherDashboardShell({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  return (
    <AppShell>
      <PageHeader
        eyebrow={profile?.operationMode === "class-first" ? "학급 우선 운영" : "과목 우선 운영"}
        title={`${profile?.displayName ?? "교사"}의 수업 운영`}
        description="학급, 학생, 모둠, 활동을 관리하고 사고 루틴 결과를 확인합니다."
        action={<PrimaryLink href="/teacher/activities/new">활동 만들기</PrimaryLink>}
      />
      {children}
    </AppShell>
  );
}
