# Firebase SQL Connect setup

This project uses Firebase SQL Connect as the target persistent store.

## What is already prepared

- `firebase.json` points Firebase CLI to `dataconnect/`.
- `dataconnect/dataconnect.yaml` defines the SQL Connect service placeholder.
- `dataconnect/schema/schema.gql` defines the relational data model for classes, students, activities, groups, attendance, submissions, cards, and group agreements.
- `dataconnect/teacher/activities.gql` defines the first teacher-facing queries and mutations.

## Values to update after creating the Firebase resources

Edit `dataconnect/dataconnect.yaml`:

```yaml
serviceId: visible-thinking
location: asia-northeast3
schema:
  datasource:
    postgresql:
      database: visible_thinking
      cloudSql:
        instanceId: visible-thinking-sql
```

Use the actual values from Firebase Console:

- `serviceId`: Firebase SQL Connect service ID.
- `location`: service region.
- `database`: PostgreSQL database name.
- `instanceId`: Cloud SQL for PostgreSQL instance ID.

## User steps

1. Create or select a Firebase project in Firebase Console.
2. Enable Firebase SQL Connect.
3. Create a Cloud SQL for PostgreSQL instance through SQL Connect.
4. Choose the region. For Korea, start with `asia-northeast3` unless your Firebase project uses another region.
5. Install or update Firebase CLI locally.
6. Run Firebase login:

```bash
firebase login
```

7. Link this project directory to your Firebase project:

```bash
firebase use --add
```

8. Initialize SQL Connect if the CLI requires project metadata:

```bash
firebase init dataconnect
```

Keep the existing `dataconnect/` directory when prompted.

9. Copy `.env.local.example` to `.env.local` and fill in the Firebase Web App values from Firebase Console:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

10. Compile the local SQL Connect schema and connector:

```bash
firebase dataconnect:compile
```

11. Start the SQL Connect emulator from VS Code Firebase extension, or with the Firebase CLI if available.
12. Generate the JavaScript SDK after the connector validates:

```bash
firebase dataconnect:sdk:generate
```

The connector is configured to generate into:

```text
src/lib/dataconnect-generated
```

## Next code step

The generated SDK currently exists in:

```text
src/lib/dataconnect-generated
```

The Firebase app and SQL Connect client initialization helpers are:

```text
src/lib/firebase-client.ts
src/lib/firebase-sql-connect.ts
```

After the Firebase project and SQL Connect service are connected, replace the current server memory store in:

```text
src/lib/created-activity-store.ts
```

with calls to the generated SQL Connect SDK operations from:

```text
src/lib/dataconnect-generated
```

Until that SDK exists, the app keeps using the current API and memory fallback so development can continue.
