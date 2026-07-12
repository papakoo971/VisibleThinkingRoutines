import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { sqlConnectCreatedActivityStore } from "@/lib/sql-connect-created-activity-store";

type CreatedActivityGlobal = typeof globalThis & {
  __visibleThinkingCreatedActivities?: Array<{ teacherId: string; payload: CreatedActivityPayload }>;
};

export type CreatedActivityStore = {
  list(context: CreatedActivityStoreContext): Promise<CreatedActivityPayload[]>;
  get(activityId: string, context: CreatedActivityStoreContext): Promise<CreatedActivityPayload | undefined>;
  upsert(payload: CreatedActivityPayload, context: CreatedActivityStoreContext): Promise<CreatedActivityPayload>;
  remove(activityId: string, context: CreatedActivityStoreContext): Promise<void>;
};

export type CreatedActivityStoreContext = {
  uid: string;
  idToken: string;
};

function getStore() {
  const globalStore = globalThis as CreatedActivityGlobal;
  globalStore.__visibleThinkingCreatedActivities ??= [];
  return globalStore.__visibleThinkingCreatedActivities;
}

const memoryCreatedActivityStore: CreatedActivityStore = {
  async list(context) {
    return getStore().filter((item) => item.teacherId === context.uid).map((item) => item.payload);
  },
  async get(activityId, context) {
    return getStore().find((item) => item.teacherId === context.uid && item.payload.activity.id === activityId)?.payload;
  },
  async upsert(payload, context) {
    const store = getStore();
    const next = [
      { teacherId: context.uid, payload },
      ...store.filter((item) => item.teacherId !== context.uid || item.payload.activity.id !== payload.activity.id),
    ];
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = next;
    return payload;
  },
  async remove(activityId, context) {
    const store = getStore();
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = store.filter(
      (item) => item.teacherId !== context.uid || item.payload.activity.id !== activityId
    );
  },
};

const createdActivityStore =
  process.env.CREATED_ACTIVITY_STORE === "sql-connect" ? sqlConnectCreatedActivityStore : memoryCreatedActivityStore;

export function listCreatedActivityPayloads(context: CreatedActivityStoreContext) {
  return createdActivityStore.list(context);
}

export function getCreatedActivityPayload(activityId: string, context: CreatedActivityStoreContext) {
  return createdActivityStore.get(activityId, context);
}

export function upsertCreatedActivityPayload(payload: CreatedActivityPayload, context: CreatedActivityStoreContext) {
  return createdActivityStore.upsert(payload, context);
}

export function deleteCreatedActivityPayload(activityId: string, context: CreatedActivityStoreContext) {
  return createdActivityStore.remove(activityId, context);
}
