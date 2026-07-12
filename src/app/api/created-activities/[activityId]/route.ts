import { deleteCreatedActivityPayload, getCreatedActivityPayload } from "@/lib/created-activity-store";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await context.params;
  const activity = await getCreatedActivityPayload(activityId);

  if (!activity) {
    return Response.json({ message: "Activity not found" }, { status: 404 });
  }

  return Response.json({ activity });
}

export async function DELETE(_request: Request, context: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await context.params;
  await deleteCreatedActivityPayload(activityId);

  return Response.json({ ok: true });
}
