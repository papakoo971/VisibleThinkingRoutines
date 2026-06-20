import Link from "next/link";
import { ArrowRight, BookOpenCheck, QrCode, UserCheck } from "lucide-react";

const entryPoints = [
  {
    href: "/teacher",
    title: "교사 대시보드",
    description: "학급, 학생, 모둠, 활동을 관리하고 제출 결과를 확인합니다.",
    icon: BookOpenCheck,
  },
  {
    href: "/student",
    title: "학생 접속",
    description: "학번, 이름, 비밀번호로 내 활동 목록에 들어갑니다.",
    icon: UserCheck,
  },
  {
    href: "/student/activity/stw",
    title: "활동 QR 접속 예시",
    description: "See-Think-Wonder 활동에 바로 참여하는 학생 화면입니다.",
    icon: QrCode,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6">
        <header className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Visible Thinking</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">사고 루틴 수업 플랫폼</h1>
          </div>
          <span className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
            MVP Prototype
          </span>
        </header>

        <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
              첫 루틴: See-Think-Wonder 개인 활동형
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              교사의 수업 운영과 학생의 사고 기록을 한 화면 흐름으로 연결합니다.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
              이 초기 구현은 Firebase 연결 전 단계의 작동 가능한 화면 골격입니다. 학생 등록, 모둠 관리, 활동 생성,
              학생 작성, 교사 결과 조회의 핵심 인터페이스를 먼저 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-3">
            {entryPoints.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-zinc-600">{item.description}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-emerald-700" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
