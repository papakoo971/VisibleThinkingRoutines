import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-8 text-zinc-950">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-emerald-950 p-8 text-white sm:p-10">
            <Link href="/" className="text-sm font-semibold text-emerald-200">
              Visible Thinking
            </Link>
            <h1 className="mt-16 text-3xl font-semibold tracking-tight">
              {isSignup ? "교사 계정을 만들고 수업 준비를 시작하세요." : "교사 수업 운영 공간으로 돌아오세요."}
            </h1>
            <p className="mt-4 text-sm leading-7 text-emerald-100/80">
              학급과 활동을 관리하고 학생의 See-Think-Wonder 사고 기록을 한 흐름에서 확인합니다.
            </p>
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Teacher account</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{isSignup ? "교사 회원가입" : "교사 로그인"}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {isSignup ? "가입 후 수업 운영 방식을 선택합니다." : "등록한 이메일과 비밀번호를 입력하세요."}
            </p>
            <AuthForm mode={mode} />
          </div>
        </section>
      </div>
    </main>
  );
}
