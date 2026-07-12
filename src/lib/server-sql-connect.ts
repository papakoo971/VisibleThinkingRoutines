type SqlConnectResponse<Data> = {
  data: Data;
  errors?: Array<{ message?: string }>;
};

export class SqlConnectAuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SqlConnectAuthorizationError";
  }
}

async function executeSqlConnect<Data, Variables>(
  operationType: "Query" | "Mutation",
  operationName: string,
  variables: Variables,
  idToken: string
) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!projectId || !apiKey || !appId) {
    throw new Error("Firebase server configuration is incomplete.");
  }

  const connectorPath = `projects/${projectId}/locations/asia-northeast3/services/visible-thinking/connectors/teacher`;
  const endpoint = `https://firebasedataconnect.googleapis.com/v1/${connectorPath}:execute${operationType}?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-Auth-Token": idToken,
      "x-firebase-gmpid": appId,
    },
    body: JSON.stringify({
      name: connectorPath,
      operationName,
      variables,
    }),
    cache: "no-store",
  });
  const result = (await response.json()) as SqlConnectResponse<Data> & { message?: string };

  if (!response.ok || result.errors?.length) {
    const message = result.errors?.map((error) => error.message).filter(Boolean).join("; ") || result.message;
    if (message?.includes("Only the activity owner") || message?.includes("do not have access") || message?.includes("permission denied")) {
      throw new SqlConnectAuthorizationError(message);
    }
    throw new Error(message || `SQL Connect ${operationName} failed with ${response.status}.`);
  }

  return result.data;
}

export function executeUserQuery<Data, Variables>(operationName: string, variables: Variables, idToken: string) {
  return executeSqlConnect<Data, Variables>("Query", operationName, variables, idToken);
}

export function executeUserMutation<Data, Variables>(operationName: string, variables: Variables, idToken: string) {
  return executeSqlConnect<Data, Variables>("Mutation", operationName, variables, idToken);
}
