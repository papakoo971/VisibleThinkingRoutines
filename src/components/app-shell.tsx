"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { BookOpenCheck, ClipboardList, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";

const navItems = [
  { href: "/teacher", label: "대시보드", icon: LayoutDashboard },
  { href: "/teacher/students", label: "학급 관리", icon: Users },
  { href: "/teacher/activities/new", label: "활동 만들기", icon: BookOpenCheck },
  { href: "/teacher/activities", label: "내가 만든 활동", icon: ClipboardList },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950">
      <aside
        className={`fixed inset-y-0 left-0 hidden border-r border-zinc-200 bg-white transition-[width] lg:block ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className={`flex items-center gap-3 border-b border-zinc-200 py-4 ${sidebarCollapsed ? "px-3" : "px-5"}`}>
            <Link href="/" className={sidebarCollapsed ? "sr-only" : "min-w-0 flex-1"}>
              <span className="block text-sm font-semibold text-emerald-700">Visible Thinking</span>
              <span className="mt-1 block text-xl font-semibold tracking-tight">수업 운영실</span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarCollapsed((current) => !current)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900"
              aria-label={sidebarCollapsed ? "왼쪽 패널 펼치기" : "왼쪽 패널 접기"}
              title={sidebarCollapsed ? "왼쪽 패널 펼치기" : "왼쪽 패널 접기"}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>
          <nav className={`flex flex-1 flex-col gap-1 py-4 ${sidebarCollapsed ? "px-3" : "px-3"}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-md py-2.5 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900 ${
                    sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
                  }`}
                  title={item.label}
                >
                  <Icon className="h-4 w-4" />
                  {sidebarCollapsed ? <span className="sr-only">{item.label}</span> : item.label}
                </Link>
              );
            })}
          </nav>
          {sidebarCollapsed ? null : (
            <div className="border-t border-zinc-200 px-6 py-4 text-xs text-zinc-500">
              Firebase SQL Connect와 Gemini API 연결 전 목업 환경
            </div>
          )}
        </div>
      </aside>
      <div className={`transition-[padding] ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/" className="text-sm font-semibold text-emerald-800">
            Visible Thinking
          </Link>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: "active" | "closed" }) {
  const label = status === "active" ? "진행 중" : "마감됨";
  const classes =
    status === "active"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-zinc-200 bg-zinc-100 text-zinc-700";
  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${classes}`}>{label}</span>;
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800"
    >
      {children}
    </Link>
  );
}
