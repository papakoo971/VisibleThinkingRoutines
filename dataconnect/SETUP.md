# Firebase SQL Connect setup

This project uses Firebase SQL Connect as the target persistent store, backed by Cloud SQL for PostgreSQL.

## Prepared in this repo

- `firebase.json` points the Firebase CLI to `dataconnect/`.
- `dataconnect/dataconnect.yaml` defines the SQL Connect service, schema directory, datasource, and connector directories.
- `dataconnect/schema/schema.gql` defines the relational model for classes, students, activities, groups, attendance, submissions, cards, and group agreements.
- `dataconnect/teacher/connector.yaml` configures the teacher connector and generated JavaScript SDK output.
- `dataconnect/teacher/activities.gql` defines the first teacher-facing queries and mutations.
- `src/lib/dataconnect-generated/` contains the generated SDK from the current schema and connector.
- `src/lib/firebase-client.ts` and `src/lib/firebase-sql-connect.ts` initialize Firebase and SQL Connect.

## Values to replace

After creating the Firebase SQL Connect service, update `dataconnect/dataconnect.yaml` with the real Firebase Console values:

```yaml
serviceId: visible-thinking
location: asia-northeast3
schema:
  source: ./schema
  datasource:
    postgresql:
      database: visible_thinking
      cloudSql:
        instanceId: visible-thinking-sql
        schemaValidation: COMPATIBLE
connectorDirs:
  - ./teacher
```

Replace these fields:

- `serviceId`: SQL Connect service ID.
- `location`: SQL Connect service region.
- `database`: PostgreSQL database name.
- `instanceId`: Cloud SQL for PostgreSQL instance ID.

`schemaValidation: COMPATIBLE` is intentional for this prototype because compatible migrations leave unused database tables and columns in place.

## Environment file

Copy `.env.local.example` to `.env.local` and fill in the Firebase Web App config:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Keep `.env.local` uncommitted. It is ignored by `.gitignore`.

For local SQL Connect emulator work, set:

```text
NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR=true
NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_HOST=localhost
NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_PORT=9399
```

Use `false` when running against the live Firebase SQL Connect service.

## Firebase setup steps

1. Create or select a Firebase project in Firebase Console.
2. Add a Web App to the Firebase project and copy its config into `.env.local`.
3. Enable Firebase SQL Connect.
4. Create a Cloud SQL for PostgreSQL instance through SQL Connect.
5. Choose the service region. For Korea, start with `asia-northeast3` unless the project requires another region.
6. Update `dataconnect/dataconnect.yaml` with the real service and database values.
7. Log in and link this local directory to the Firebase project:

```bash
firebase login
firebase use --add
```

8. Validate the local schema and connector:

```bash
firebase dataconnect:compile
```

9. Configure SQL permissions if required by the Firebase project:

```bash
firebase dataconnect:sql:setup
```

10. Apply database schema migrations:

```bash
firebase dataconnect:sql:migrate
```

11. Regenerate the JavaScript SDK declared in `dataconnect/teacher/connector.yaml`:

```bash
firebase dataconnect:sdk:generate
```

The generated SDK should remain in:

```text
src/lib/dataconnect-generated
```

## Next code step

After the Firebase project and SQL Connect service are connected, replace the current process-memory implementation in:

```text
src/lib/created-activity-store.ts
```

with calls to the generated SQL Connect SDK operations from:

```text
src/lib/dataconnect-generated
```

Until that replacement is complete, the app keeps using the existing Next.js API routes, in-memory server store, and `localStorage` fallback.

## Current prototype caveat

The operations in `dataconnect/teacher/activities.gql` still use prototype `@auth(level: PUBLIC)` directives. Tighten those directives after Firebase Auth teacher/student flows are implemented.
