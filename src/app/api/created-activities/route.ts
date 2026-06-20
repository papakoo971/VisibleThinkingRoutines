import { listCreatedActivityPayloads, upsertCreatedActivityPayload } from "@/lib/created-activity-store";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ activities: listCreatedActivityPayloads() });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as CreatedActivityPayload;

  if (!payload?.activity?.id) {
    return Response.json({ message: "activity.id is required" }, { status: 400 });
  }

  return Response.json({ activity: upsertCreatedActivityPayload(payload) }, { status: 201 });
}
