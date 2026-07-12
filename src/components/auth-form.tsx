"use client";

import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase-auth";

type AuthMode = "login" | "signup";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const displayName = String(formData.get("displayName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

    if (isSignup && displayName.length < 2) {
      setError("이름은 두 글자 이상 입력해 주세요.");
      setSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상 입력해 주세요.");
      setSubmitting(false);
      return;
    }

    if (isSignup && password !== passwordConfirm) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      setSubmitting(false);
      return;
    }

    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
        await updateProfile(credential.user, { displayName });
        router.replace("/teacher/onboarding");
      } else {
        await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
        const requestedPath = searchParams.get("next");
        router.replace(requestedPath?.startsWith("/teacher") ? requestedPath : "/teacher");
      }
    } catch (caughtError) {
      setError(authErrorMessage(caughtError));
      setSubmitting(false);
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="mt-8 grid gap-5">
      {isSignup ? (
        <FormField label="이름" name="displayName" type="text" autoComplete="name" placeholder="김선생" />
      ) : null}
      <FormField label="이메일" name="email" type="email" autoComplete="email" placeholder="teacher@example.com" />
      <FormField
        label="비밀번호"
        name="password"
        type="password"
        autoComplete={isSignup ? "new-password" : "current-password"}
        placeholder="8자 이상 입력"
      />
      {isSignup ? (
        <FormField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호 다시 입력"
        />
      ) : null}

      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="h-11 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {submitting ? "처리 중..." : isSignup ? "교사 계정 만들기" : "로그인"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        {isSignup ? "이미 계정이 있나요?" : "교사 계정이 없나요?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-emerald-700 hover:text-emerald-900">
          {isSignup ? "로그인" : "회원가입"}
        </Link>
      </p>
    </form>
  );
}

function FormField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-800">
      {label}
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-600"
      />
    </label>
  );
}

function authErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "인증 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
    "auth/invalid-email": "올바른 이메일 주소를 입력해 주세요.",
    "auth/invalid-credential": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "auth/weak-password": "더 안전한 비밀번호를 입력해 주세요.",
    "auth/too-many-requests": "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
    "auth/network-request-failed": "네트워크 연결을 확인해 주세요.",
    "auth/operation-not-allowed": "이메일 로그인이 아직 활성화되지 않았습니다.",
  };

  return messages[error.code] ?? "인증 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}
