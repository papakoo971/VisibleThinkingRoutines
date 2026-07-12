"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";

export function DashboardModeSync({ hasExplicitView }: { hasExplicitView: boolean }) {
  const { profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hasExplicitView || !profile) return;
    router.replace(`/teacher?view=${profile.operationMode === "class-first" ? "class" : "subject"}`);
  }, [hasExplicitView, profile, router]);

  return null;
}
