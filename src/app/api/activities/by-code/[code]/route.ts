import { QueryFetchPolicy } from "firebase/data-connect";
import { findActivityByCode } from "@/lib/dataconnect-generated";
import { getVisibleThinkingDataConnect } from "@/lib/firebase-sql-connect";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  const normalized = code.trim().toUpperCase();
  if (!/^STW-[A-Z2-9]{5}$/.test(normalized)) return Response.json({ message: "Invalid activity code" }, { status: 400 });
  const { data } = await findActivityByCode(getVisibleThinkingDataConnect(), { code: normalized }, { fetchPolicy: QueryFetchPolicy.SERVER_ONLY });
  const activity = data.activities[0];
  return activity ? Response.json({ activityId: activity.id }) : Response.json({ message: "Activity not found" }, { status: 404 });
}
