"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";

export function TeacherAuthGate({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, profileError, refreshProfile } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isOnboarding = pathname === "/teacher/onboarding";

  useEffect(() => {
    if (loading || profileError) return;

    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!profile && !isOnboarding) {
      router.replace("/teacher/onboarding");
      return;
    }

    if (profile && isOnboarding) {
      router.replace("/teacher");
    }
  }, [isOnboarding, loading, pathname, profile, profileError, router, user]);

  if (loading || (!user && !profileError) || (!profile && !isOnboarding && !profileError)) {
    return <GateMessage title="로그인 상태를 확인하고 있습니다" description="잠시만 기다려 주세요." />;
  }

  if (profileError) {
    return (
      <GateMessage title="프로필을 불러오지 못했습니다" description={profileError}>
        <button
          type="button"
          onClick={() => void refreshProfile()}
          className="mt-5 h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          다시 시도
        </button>
      </GateMessage>
    );
  }

  if (!user || (profile && isOnboarding) || (!profile && !isOnboarding)) return null;

  return children;
}

function GateMessage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-zinc-950">{title}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
        {children}
      </div>
    </main>
  );
}
