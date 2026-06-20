import type { CreatedActivityPayload } from "@/lib/local-created-activities";

type CreatedActivityGlobal = typeof globalThis & {
  __visibleThinkingCreatedActivities?: CreatedActivityPayload[];
};

function getStore() {
  const globalStore = globalThis as CreatedActivityGlobal;
  globalStore.__visibleThinkingCreatedActivities ??= [];
  return globalStore.__visibleThinkingCreatedActivities;
}

export function listCreatedActivityPayloads() {
  return getStore();
}

export function getCreatedActivityPayload(activityId: string) {
  return getStore().find((payload) => payload.activity.id === activityId);
}

export function upsertCreatedActivityPayload(payload: CreatedActivityPayload) {
  const store = getStore();
  const next = [payload, ...store.filter((item) => item.activity.id !== payload.activity.id)];
  (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = next;
  return payload;
}

export function deleteCreatedActivityPayload(activityId: string) {
  const store = getStore();
  (globalThis as CreatedActivityGlobal).__visibleThinkingCreatedActivities = store.filter((item) => item.activity.id !== activityId);
}
