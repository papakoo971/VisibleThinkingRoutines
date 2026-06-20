import type { ActivityMode, AttendanceStatus } from "@/lib/mock-data";

export type CreatedActivityPayload = {
  activity: {
    id: string;
    title: string;
    routine: string;
    activityMode: ActivityMode;
    subject: string;
    classes: string[];
    status: "active" | "closed";
    code: string;
    materialType: string;
    activityDate: string;
    submittedCount: number;
    targetCount: number;
  };
  activityAttendance: { activityId: string; studentId: string; status: AttendanceStatus }[];
  activityGroups: { id: string; activityId: string; name: string; studentIds: string[] }[];
  groupSubmissions: {
    activityId: string;
    groupId: string;
    status: string;
    cards: never[];
    agreements: { activityId: string; groupId: string; studentId: string; agreed: boolean }[];
  }[];
  individualSubmissions: { activityId: string; studentId: string; status: string; cards: never[] }[];
  routes: {
    teacherResults: string;
    studentEntry: string;
  };
};

const storageKey = "visible-thinking-created-activities";

export function readCreatedActivityPayloads() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as CreatedActivityPayload[]) : [];
  } catch {
    return [];
  }
}

export function saveCreatedActivityPayload(payload: CreatedActivityPayload) {
  if (typeof window === "undefined") return;

  const current = readCreatedActivityPayloads().filter((item) => item.activity.id !== payload.activity.id);
  window.localStorage.setItem(storageKey, JSON.stringify([payload, ...current]));
}

export function findCreatedActivityPayload(activityId: string) {
  return readCreatedActivityPayloads().find((payload) => payload.activity.id === activityId);
}

export async function fetchCreatedActivityPayloads() {
  try {
    const response = await fetch("/api/created-activities", { cache: "no-store" });
    if (!response.ok) return readCreatedActivityPayloads();

    const data = (await response.json()) as { activities?: CreatedActivityPayload[] };
    return data.activities ?? [];
  } catch {
    return readCreatedActivityPayloads();
  }
}

export async function fetchCreatedActivityPayload(activityId: string) {
  try {
    const response = await fetch(`/api/created-activities/${activityId}`, { cache: "no-store" });
    if (!response.ok) return findCreatedActivityPayload(activityId);

    const data = (await response.json()) as { activity?: CreatedActivityPayload };
    return data.activity;
  } catch {
    return findCreatedActivityPayload(activityId);
  }
}

export async function persistCreatedActivityPayload(payload: CreatedActivityPayload) {
  saveCreatedActivityPayload(payload);

  try {
    const response = await fetch("/api/created-activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return payload;

    const data = (await response.json()) as { activity?: CreatedActivityPayload };
    return data.activity ?? payload;
  } catch {
    return payload;
  }
}
