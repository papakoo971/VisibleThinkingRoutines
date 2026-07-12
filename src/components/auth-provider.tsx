"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase-auth";
import { fetchMyTeacherProfile, type TeacherProfile } from "@/lib/teacher-profile";

type AuthContextValue = {
  user: User | null;
  profile: TeacherProfile | null;
  loading: boolean;
  profileError: string | null;
  refreshProfile: () => Promise<TeacherProfile | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  async function loadProfile() {
    try {
      const nextProfile = await fetchMyTeacherProfile();
      setProfile(nextProfile);
      setProfileError(null);
      return nextProfile;
    } catch (error) {
      console.error("Failed to load teacher profile", error);
      setProfile(null);
      setProfileError("교사 프로필을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return null;
    }
  }

  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), async (nextUser) => {
      setUser(nextUser);

      if (nextUser) {
        await loadProfile();
      } else {
        setProfile(null);
        setProfileError(null);
      }

      setLoading(false);
    });
  }, []);

  async function refreshProfile() {
    if (!user) {
      setProfile(null);
      return null;
    }

    return loadProfile();
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, profileError, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
