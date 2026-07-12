import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase-admin";

export class UnauthorizedError extends Error {
  constructor() {
    super("A valid Firebase ID token is required.");
    this.name = "UnauthorizedError";
  }
}

export type VerifiedFirebaseUser = {
  claims: DecodedIdToken;
  idToken: string;
};

export async function requireFirebaseUser(request: Request): Promise<VerifiedFirebaseUser> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) throw new UnauthorizedError();

  try {
    return {
      claims: await getFirebaseAdminAuth().verifyIdToken(token),
      idToken: token,
    };
  } catch {
    throw new UnauthorizedError();
  }
}

export function unauthorizedResponse() {
  return Response.json({ message: "Authentication required" }, { status: 401 });
}
