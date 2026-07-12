import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase-admin";

export class UnauthorizedError extends Error {
  constructor() {
    super("A valid Firebase ID token is required.");
    this.name = "UnauthorizedError";
  }
}

export async function requireFirebaseUser(request: Request): Promise<DecodedIdToken> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) throw new UnauthorizedError();

  try {
    return await getFirebaseAdminAuth().verifyIdToken(token);
  } catch {
    throw new UnauthorizedError();
  }
}

export function unauthorizedResponse() {
  return Response.json({ message: "Authentication required" }, { status: 401 });
}
