import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { sqlConnectCreatedActivityStore } from "@/lib/sql-connect-created-activity-store";

type CreatedActivityGlobal = typeof globalThis & {
  __visibleThinkingCreatedActivities?: Array<{ teacherId: string; payload: CreatedActivityPayload }>;
};

export type CreatedActivityStore = {
  list(teacherId: string): Promise<CreatedActivityPayload[]>;
  get(activityId: string): Promise<CreatedActivityPayload | undefined>;
  upsert(payload: CreatedActivityPayload, teacherId: string): Promise<CreatedActivityPayload>;
  remove(activityId: string, teacherId: string): Promise<void>;
};

function getStore() {
  const globalStore = globalThis as CreatedActivityGlobal;
  globalStore.__visibleThinkingCreatedActivities ??= [];
  return globalStore.__visibleThinkingCreatedActivities;
}

const memoryCreatedActivityStore: CreatedActivityStore = {
  async list(teacherId) {
    return getStore().filter((item) => item.teacherId === teacherId).map((item) => item.payload);
  },
  async get(activityId) {
    return getStore().find((item) => item.payload.activity.id === activityId)?.payload;
  },
  async upsert(payload, teacherId) {
    const store = getStore();
    const next = [
      { teacherId, payload },
      ...store.filter((item) => item.teacherId !== teacherId || item.payload.activity.id !== payload.activity.id),
    ];
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = next;
    return payload;
  },
  async remove(activityId, teacherId) {
    const store = getStore();
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = store.filter(
      (item) => item.teacherId !== teacherId || item.payload.activity.id !== activityId
    );
  },
};

const createdActivityStore =
  process.env.CREATED_ACTIVITY_STORE === "sql-connect" ? sqlConnectCreatedActivityStore : memoryCreatedActivityStore;

export function listCreatedActivityPayloads(teacherId: string) {
  return createdActivityStore.list(teacherId);
}

export function getCreatedActivityPayload(activityId: string) {
  return createdActivityStore.get(activityId);
}

export function upsertCreatedActivityPayload(payload: CreatedActivityPayload, teacherId: string) {
  return createdActivityStore.upsert(payload, teacherId);
}

export function deleteCreatedActivityPayload(activityId: string, teacherId: string) {
  return createdActivityStore.remove(activityId, teacherId);
}
