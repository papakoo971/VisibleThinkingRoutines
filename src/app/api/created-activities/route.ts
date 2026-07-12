import { listCreatedActivityPayloads, upsertCreatedActivityPayload } from "@/lib/created-activity-store";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    return Response.json({ activities: await listCreatedActivityPayloads(user.uid) });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const payload = (await request.json()) as CreatedActivityPayload;

    if (!payload?.activity?.id) {
      return Response.json({ message: "activity.id is required" }, { status: 400 });
    }

    return Response.json({ activity: await upsertCreatedActivityPayload(payload, user.uid) }, { status: 201 });
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
