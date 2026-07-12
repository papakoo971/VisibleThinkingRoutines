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
- `firebase.json` enables the Firebase Authentication email/password provider.
- `TeacherProfile` stores the authenticated teacher's name and default operation mode using the Firebase Auth UID as its key.

## Values to replace

After creating the Firebase SQL Connect service, update `dataconnect/dataconnect.yaml` with the real Firebase Console values:

```yaml
serviceId: visible-thinking
location: asia-northeast3
schema:
  source: ./schema
  datasource:
    postgresql:
      database: visible-thinking
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

The current API routes use the in-memory store by default:

```text
CREATED_ACTIVITY_STORE=memory
```

After SQL Connect is provisioned, migrated, and the generated SDK has been regenerated, switch created activity API persistence to SQL Connect:

```text
CREATED_ACTIVITY_STORE=sql-connect
```

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

This repository is currently linked to the Firebase project `visible-thinking-routines` through `.firebaserc`.

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

## Current SQL-backed store state

The SQL Connect implementation is available behind:

```text
CREATED_ACTIVITY_STORE=sql-connect
```

It currently writes activities, class assignments, attendance, activity groups, group members, submission status, and group agreement state through the generated SDK in:

```text
src/lib/dataconnect-generated
```

The live Firebase project has been provisioned, migrated, and smoke-tested. Local development now uses `CREATED_ACTIVITY_STORE=sql-connect`; keep `memory` available as an offline fallback.

SQL-backed activity deletion is implemented through the generated `DeleteActivity` mutation. Related activity rows are removed through the schema's cascading foreign keys.

## Current prototype caveat

Teacher profile and teacher activity operations require Firebase Authentication and derive ownership from `auth.uid`. The Next.js Route Handlers verify bearer ID tokens and forward the verified token to SQL Connect, where transactional ownership checks protect dependent writes and deletion.

`SchoolClass` and `Student` writes derive teacher ownership from `auth.uid`. Their storage IDs are UID-scoped so separate teachers can reuse the same class name and external student ID, while API responses restore the external student ID expected by the UI.

Student accounts are linked through nullable, unique `Student.authUid`. `GetMyStudent`, `ListMyStudentActivities`, and `GetMyStudentActivity` require Firebase Authentication and only return activities where the linked student has `PRESENT` attendance. Teacher detail reads use a separate owner-filtered operation.

`LinkStudentAuth` and `UnlinkStudentAuth` provide the ownership-checked connector boundary used by the teacher account-issuance flow.

The teacher student-management page now supports CSV import. Its authenticated Route Handler validates the teacher profile, rejects duplicate teacher-scoped student numbers, creates Firebase student accounts, links `authUid`, and returns one-time temporary credentials for CSV download. XLSX parsing and password reissuance remain follow-up work.
