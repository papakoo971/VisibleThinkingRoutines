import type { CreatedActivityPayload } from "@/lib/local-created-activities";

type CreatedActivityGlobal = typeof globalThis & {
  __visibleThinkingCreatedActivities?: CreatedActivityPayload[];
};

type CreatedActivityStore = {
  list(): Promise<CreatedActivityPayload[]>;
  get(activityId: string): Promise<CreatedActivityPayload | undefined>;
  upsert(payload: CreatedActivityPayload): Promise<CreatedActivityPayload>;
  remove(activityId: string): Promise<void>;
};

function getStore() {
  const globalStore = globalThis as CreatedActivityGlobal;
  globalStore.__visibleThinkingCreatedActivities ??= [];
  return globalStore.__visibleThinkingCreatedActivities;
}

const memoryCreatedActivityStore: CreatedActivityStore = {
  async list() {
    return getStore();
  },
  async get(activityId) {
    return getStore().find((payload) => payload.activity.id === activityId);
  },
  async upsert(payload) {
    const store = getStore();
    const next = [payload, ...store.filter((item) => item.activity.id !== payload.activity.id)];
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = next;
    return payload;
  },
  async remove(activityId) {
    const store = getStore();
    (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = store.filter((item) => item.activity.id !== activityId);
  },
};

const createdActivityStore = memoryCreatedActivityStore;

export function listCreatedActivityPayloads() {
  return createdActivityStore.list();
}

export function getCreatedActivityPayload(activityId: string) {
  return createdActivityStore.get(activityId);
}

export function upsertCreatedActivityPayload(payload: CreatedActivityPayload) {
  return createdActivityStore.upsert(payload);
}

export function deleteCreatedActivityPayload(activityId: string) {
  return createdActivityStore.remove(activityId);
}
