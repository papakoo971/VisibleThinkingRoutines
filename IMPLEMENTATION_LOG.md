# Implementation Log

## 2026-07-12 Activity Ownership

### Completed

- Added `teacherId` to the SQL Connect `Activity` model.
- Replaced the unsafe activity upsert operation with an authenticated create operation that assigns `teacherId` from `auth.uid`.
- Restricted teacher activity listing to the authenticated owner's UID.
- Added transactional `@check` and `@redact` ownership checks before activity deletion and dependent activity writes.
- Added Firebase ID token forwarding from browser API calls and UID-scoped local storage keys.
- Added Route Handler bearer-token validation boundaries for teacher activity list, create, and delete requests.
- Added Firebase Admin Auth ID-token verification with lazy server initialization.
- Forwarded the verified ID token to SQL Connect REST operations so `auth.uid` is evaluated in the original user context.
- Added `403 Forbidden` responses for cross-owner activity deletion attempts.
- Migrated the live `Activity` table and deployed the ownership-aware `teacher` connector.

### Ownership Verification

- Unauthenticated teacher activity list requests return `401`.
- Teacher A can create, list, and delete its own activity.
- Teacher B receives an empty owned activity list and a `403` response when deleting Teacher A's activity.
- A denied cross-owner delete leaves the activity intact.
- Direct cross-owner `UpsertActivityClass` connector calls fail with `PERMISSION_DENIED` and roll back.
- All smoke-test activities and Firebase Auth accounts were removed after verification.
- `SchoolClass` and `Student` remain shared prototype records; their teacher ownership migration is the next data-isolation follow-up.

## 2026-07-12

### Live SQL Connect Activation

- Migrated the live `visible-thinking-sql:visible-thinking` PostgreSQL database to the local SQL Connect schema.
- Deployed the `teacher` connector and schema to Firebase project `visible-thinking-routines` in `asia-northeast3`.
- Regenerated the JavaScript SDK and switched local runtime persistence to `CREATED_ACTIVITY_STORE=sql-connect`.
- Ran live API smoke tests for create, list, detail, update, and delete.
- Fixed stale activity lists and details by using the Data Connect `SERVER_ONLY` query policy in the server-side store.
- Added and deployed the generated `DeleteActivity` mutation; cascading foreign keys remove related activity data.
- Removed the smoke-test activity after verification.

### Verification

- Live SQL Connect create returned `201`, and list/detail returned the persisted payload.
- Updating the activity was immediately visible from detail reads.
- Delete returned `200`, the deleted detail returned `404`, and the final list was empty.
- `npm run check` passed: ESLint, TypeScript, and the Next.js 16.2.7 production build with all 57 static pages/routes.

### Teacher Authentication And Onboarding

- Enabled the Firebase Authentication email/password provider through project configuration.
- Added the SQL Connect `TeacherProfile` model keyed by Firebase Auth UID.
- Added authenticated profile read, upsert, and self-delete operations using `auth.uid` server expressions.
- Added teacher signup and login routes with Korean validation and Firebase error messages.
- Added a shared Firebase auth state provider and protected the `/teacher` route tree.
- Added first-login onboarding for class-first or subject-first operation mode.
- Applied the saved operation mode to the teacher dashboard default view.
- Added authenticated teacher identity and logout to the teacher sidebar.
- Replaced the dashboard mock teacher name with the authenticated profile name.

### Authentication Verification

- Verified the home, signup, onboarding, and teacher dashboard screens in a real browser with no Next.js error overlay.
- Verified live Firebase signup, profile creation, class-first dashboard routing, refresh persistence, logout, unauthorized route redirect, and returning-user login.
- Removed the smoke-test teacher profile and Firebase Auth account after verification.
- Kept activity operations public until activity ownership and server-side token verification are implemented together.

## 2026-07-11

### Phase 0 Development Baseline

- Resolved all existing ESLint errors and warnings.
- Split async activity loading from stateful student and teacher result workspaces so state resets use keyed component boundaries instead of synchronous effect updates.
- Removed unnecessary manual memoization that conflicted with the React compiler lint rules.
- Excluded the Firebase Data Connect generated SDK from ESLint while keeping the source GraphQL operations in lint scope.
- Added `typecheck` and combined `check` npm scripts.
- Replaced build-time Google Fonts downloads with a network-independent system font stack.
- Replaced the create-next-app README with project-specific setup, verification, route, storage, and limitation documentation.

### Verification

- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed with Next.js 16.2.7 and generated all 54 static pages plus dynamic routes.
- The sandboxed build initially hit a Turbopack local port-binding restriction during PostCSS evaluation; the same production build passed outside that restriction.

### Firebase Project Provisioning

- Registered the Firebase project `visible-thinking-routines` as the local default project.
- Provisioned SQL Connect service `visible-thinking` in `asia-northeast3`.
- Provisioned Cloud SQL instance `visible-thinking-sql` with PostgreSQL database `visible-thinking`.
- Added the Firebase CLI as a project development dependency.
- Logged in with Firebase CLI, confirmed the live SQL Connect service, and successfully compiled the local schema and connector.
- Kept `CREATED_ACTIVITY_STORE=memory` until migration, connector deployment, and API smoke testing are complete.

## 2026-06-20

### Context

This session focused on making the prototype easier to continue safely:

- Initialized local Git history.
- Connected the repository to GitHub.
- Clarified Firebase SQL Connect setup instructions.
- Added a storage adapter boundary before switching persistence from memory to SQL Connect.
- Added the first SQL Connect-backed created activity store implementation behind an environment toggle.

### Git And Repository Setup

- Recreated the local `.git` directory with the current Windows user after the first initialization had ownership issues.
- Renamed the default branch to `main`.
- Added GitHub remote:
  - `https://github.com/papakoo971/VisibleThinkingRoutines.git`
- Pushed all work to `origin/main`.
- Current latest commit:
  - `e29f187 Add SQL Connect created activity store`

### Firebase SQL Connect Setup Documentation

- Updated `.env.local.example` with clearer sections for:
  - Firebase Web App config
  - SQL Connect emulator settings
  - server-side created activity store selection
- Reworked `dataconnect/SETUP.md` around:
  - prepared repo files
  - Firebase Console values to replace
  - `.env.local` setup
  - Firebase CLI setup order
  - SQL migration and SDK regeneration
  - current SQL-backed store state
- Clarified that `.env.local` remains uncommitted.
- Clarified that `CREATED_ACTIVITY_STORE=memory` is the default until Firebase SQL Connect is provisioned and migrated.

### Storage Adapter Work

- Added a `CreatedActivityStore` interface in `src/lib/created-activity-store.ts`.
- Wrapped the existing process-memory store in a `memoryCreatedActivityStore` implementation.
- Kept the existing exported API functions:
  - `listCreatedActivityPayloads`
  - `getCreatedActivityPayload`
  - `upsertCreatedActivityPayload`
  - `deleteCreatedActivityPayload`
- Updated Next.js Route Handlers to await the async store boundary.
- Preserved the existing API response shape for current UI callers.

### SQL Connect Store Implementation

- Added `src/lib/sql-connect-created-activity-store.ts`.
- Added SQL Connect write support for:
  - school classes
  - students referenced by created activity payloads
  - activities
  - activity-class assignments
  - attendance
  - activity groups
  - group members
  - individual submission status
  - group submission status
  - group submission agreement state
- Added SQL Connect list/detail read mapping back into `CreatedActivityPayload`.
- Extended `GetActivity` in `dataconnect/teacher/activities.gql` to include:
  - individual submissions
  - group submissions
  - group submission agreements
- Regenerated `src/lib/dataconnect-generated`.
- Added store selection:
  - `CREATED_ACTIVITY_STORE=memory`
  - `CREATED_ACTIVITY_STORE=sql-connect`
- Kept `memory` as the default behavior.
- SQL-backed activity deletion now returns `501` until a generated delete mutation is added.

### Verification Done

- `firebase.cmd dataconnect:compile --non-interactive` succeeded.
- `npm.cmd run build` succeeded after each storage/setup change.
- GitHub push succeeded after each completed step.

### Known Limitations

- Firebase project is still not linked locally.
- `.env.local` is still not filled.
- `dataconnect/dataconnect.yaml` still uses placeholder service/database values.
- `CREATED_ACTIVITY_STORE=sql-connect` has not been smoke-tested against a real Firebase SQL Connect service yet.
- SQL-backed delete requires a delete mutation.
- SQL-backed card content persistence is not fully wired into the created activity payload flow yet.
- `npm run lint` currently fails on pre-existing issues:
  - React hook lint in `student-activity-view.tsx`
  - React hook/manual memoization lint in `activity-results-view.tsx`
  - generated CommonJS SDK `require()` lint in `src/lib/dataconnect-generated/index.cjs.js`

### Next Steps

1. Create or select the Firebase project.
2. Add a Firebase Web App and fill `.env.local`.
3. Enable Firebase SQL Connect and create the Cloud SQL for PostgreSQL instance.
4. Replace `dataconnect/dataconnect.yaml` placeholder values.
5. Run `firebase use --add`.
6. Run `firebase dataconnect:compile`.
7. Run `firebase dataconnect:sql:setup` if required.
8. Run `firebase dataconnect:sql:migrate`.
9. Run `firebase dataconnect:sdk:generate`.
10. Set `CREATED_ACTIVITY_STORE=sql-connect`.
11. Run API smoke tests for create/list/detail.
12. Add generated delete mutation before enabling SQL-backed activity deletion.

## 2026-06-14

### Context

This project is a Next.js App Router prototype for a Visible Thinking Routines classroom platform. The current implementation focuses on teacher dashboards, class and group management, activity creation, student participation, and teacher result review.

The persistent storage direction is now fixed as Firebase SQL Connect backed by Cloud SQL for PostgreSQL.

### Implemented UI And Workflow

- Added a collapsible left teacher sidebar with icon-only mode.
- Reworked the teacher dashboard around subject-first and class-first toggle views.
- Renamed the student tab concept to class management.
- Added class management layout with class cards, student management, and group management.
- Added drag-and-drop group assignment.
- Added group add/remove controls.
- Added activity template selection before activity setup.
- Added activity mode toggle: individual or group.
- Added pre-activity attendance modal for marking present/absent students.
- Added compact attendance student cards with five cards per row on wide screens.
- Added group setup modal during activity creation.
- Added group submission agreement rule: all present group members must agree before final group submission.
- Treated absent students as recorded but excluded from group agreement requirements.
- Added “My Activities” teacher tab with class/activity/date views.
- Reworked activity result review to show student/group cards and detail screens.
- Added group result detail where group members see the same submitted group work.
- Added dynamic student activity pages for individual and group activities.

### Data Model Progress

- Expanded mock data for:
  - activities
  - classes
  - students
  - activity groups
  - attendance
  - individual submissions
  - group submissions
  - group agreement state
  - group thinking cards
- Added generated activity preview payload with:
  - `activity`
  - `activityAttendance`
  - `activityGroups`
  - `groupSubmissions`
  - `individualSubmissions`
  - result/student routes
- Added temporary browser persistence with `localStorage`.
- Added Next.js API routes backed by server memory:
  - `GET /api/created-activities`
  - `POST /api/created-activities`
  - `GET /api/created-activities/[activityId]`
  - `DELETE /api/created-activities/[activityId]`
- The app currently uses API-first created activity reads/writes, with `localStorage` fallback.

### Firebase SQL Connect Preparation

- Confirmed Firebase SQL Connect is the target storage.
- Added Firebase SQL Connect project structure:
  - `firebase.json`
  - `dataconnect/dataconnect.yaml`
  - `dataconnect/schema/schema.gql`
  - `dataconnect/teacher/connector.yaml`
  - `dataconnect/teacher/activities.gql`
- Modeled relational SQL Connect schema for:
  - school classes
  - students
  - activities
  - activity-class assignments
  - attendance
  - activity groups
  - group members
  - individual submissions
  - group submissions
  - thinking cards
  - group thinking cards
  - group submission agreements
- Added initial SQL Connect operations for:
  - listing activities
  - getting activity detail
  - upserting classes
  - upserting students
  - upserting activities
  - upserting activity classes
  - upserting attendance
  - upserting activity groups
  - upserting group members
  - upserting individual submissions
  - upserting group submissions
  - upserting group agreement state
- Ran `firebase dataconnect:compile --non-interactive` successfully.
- Generated SQL Connect TypeScript SDK into:
  - `src/lib/dataconnect-generated`
- Added Firebase client helpers:
  - `src/lib/firebase-client.ts`
  - `src/lib/firebase-sql-connect.ts`
- Added `.env.local.example` for Firebase Web App config and Data Connect emulator settings.
- Added `dataconnect/SETUP.md` for Firebase SQL Connect setup steps.

### Current Storage State

Final target:

- Firebase SQL Connect
- Cloud SQL for PostgreSQL

Current runtime fallback:

- Next.js Route Handlers
- server memory store
- `localStorage` fallback

The next storage step is to replace `src/lib/created-activity-store.ts` internals with calls to the generated Firebase SQL Connect SDK after the Firebase project and Cloud SQL instance are connected.

### Verification Done

- `npm.cmd run build` passes after the UI work.
- `npm.cmd run build` passes after API route work.
- `npm.cmd run build` passes after Firebase SQL Connect files and SDK generation.
- API smoke test passed:
  - POST created activity returned `201 Created`.
  - GET created activity returned `200 OK`.
  - DELETE test activity returned `200 OK`.
  - GET deleted activity returned `404`.
- `firebase dataconnect:compile --non-interactive` succeeded and generated the SDK.

### Known Limitations

- Firebase project is not linked yet.
- `.env.local` is not filled yet.
- SQL Connect service values in `dataconnect/dataconnect.yaml` are placeholders.
- Current API route persistence is process memory and disappears when the server restarts.
- `@auth(level: PUBLIC)` is used in SQL Connect operations for prototype work only.
- Teacher/student authentication is not implemented.
- Uploaded images/PDFs are represented by UI placeholders; Cloud Storage is not connected.
- AI analysis UI is still mock/static.

### Next Steps

1. Create or select the Firebase project.
2. Enable Firebase SQL Connect and create the Cloud SQL for PostgreSQL instance.
3. Replace placeholder values in `dataconnect/dataconnect.yaml`.
4. Create `.env.local` from `.env.local.example`.
5. Run `firebase use --add`.
6. Run `firebase dataconnect:compile`.
7. Run `firebase dataconnect:sql:setup` if required by the Firebase project.
8. Run `firebase dataconnect:sql:migrate`.
9. Run `firebase dataconnect:sdk:generate`.
10. Replace memory store logic with generated SQL Connect SDK calls.
11. Tighten SQL Connect auth directives from prototype `PUBLIC` to authenticated teacher/student flows.
