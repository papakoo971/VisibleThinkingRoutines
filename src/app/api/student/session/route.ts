import { requireFirebaseUser, UnauthorizedError, unauthorizedResponse } from "@/lib/server-auth";
import { getAuthenticatedStudentSession } from "@/lib/sql-connect-created-activity-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireFirebaseUser(request);
    const session = await getAuthenticatedStudentSession({ idToken: user.idToken });

    if (!session) {
      return Response.json({ message: "Student account is not linked" }, { status: 403 });
    }

    return Response.json(session);
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    throw error;
  }
}
