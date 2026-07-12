import { deleteCreatedActivityPayload, getCreatedActivityPayload } from "@/lib/created-activity-store";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await context.params;
  const activity = await getCreatedActivityPayload(activityId);

  if (!activity) {
    return Response.json({ message: "Activity not found" }, { status: 404 });
  }

  return Response.json({ activity });
}

export async function DELETE(request: Request, context: { params: Promise<{ activityId: string }> }) {
  try {
    const user = await requireFirebaseUser(request);
    const { activityId } = await context.params;
    await deleteCreatedActivityPayload(activityId, user.uid);

    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
