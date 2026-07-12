# Implementation Log

## 2026-07-12 Card Tags Filtering And Student Visibility

### Completed

- Added an owner-checked transactional mutation for updating thinking-card tags and public visibility.
- Added teacher result API validation for up to eight unique tags with a 30-character limit.
- Connected default tag toggles, custom tag entry, and student-public visibility controls to live cards.
- Added dynamic result filtering across default and custom tags.
- Returned tags from student work only when `tagsPublic` is enabled.
- Displayed public teacher tags beneath cards in the student activity workspace.
- Deployed the updated connector and regenerated the SDK.

### Verification

- The owning teacher can save default and custom tags and read them back from live results.
- A non-owner receives `403` when attempting to modify another teacher's card tags.
- Public tags appear in the assigned student's work response.
- Private teacher tags return as an empty student-visible tag list.
- Test activities, cards, tags, links, and Firebase Auth users are removed after verification.

## 2026-07-12 Activity Materials Codes And QR

### Completed

- Added nullable activity instructions, material URL, and material filename fields and migrated the live PostgreSQL schema.
- Added client-side JPG/PNG/WebP/PDF validation with a 10MB limit and teacher/activity-scoped Firebase Storage paths.
- Added one-time random five-character activity code generation without ambiguous characters.
- Added local QR PNG generation with no external QR service dependency.
- Added a public active-code resolver that returns only the activity ID; activity detail still requires student authentication and assignment.
- Added authenticated student activity-code entry and dynamic navigation.
- Rendered persisted instructions and image/PDF material in the student activity workspace.
- Added Storage rules restricting writes to the owning teacher UID path and reads to authenticated users.
- Added the optional Storage bucket environment variable with a current Firebase default-bucket fallback.

### Verification

- Material URL, filename, type, and instructions persist and return in assigned-student activity detail.
- Active activity codes resolve to the correct activity ID, closed codes return `404`, and reopened codes resolve again.
- QR generation returns a valid PNG data URL.
- Student and home pages render without a Next.js error overlay.

### Storage Activation

- Initialized default bucket `visible-thinking-routines.firebasestorage.app` and deployed `storage.rules`.
- Verified owner-path upload, authenticated read, and owner delete with a real PNG object.
- Verified that an authenticated user receives `403` when writing to another teacher UID path.
- Split create/update validation from delete authorization because Storage delete requests do not include `request.resource`.
- Added `scripts/storage-rules-smoke.mjs` for repeatable rule verification and automatic account/object cleanup.

## 2026-07-12 Live Teacher Results And Activity Closing

### Completed

- Added owner-filtered teacher result queries returning attendance, students, individual submissions, and thinking cards.
- Added a transactional owner-checked activity status mutation for closing and reopening activities.
- Added authenticated teacher result GET/PATCH Route Handlers with minimal result DTOs.
- Connected created-activity result boards, participating students, submission badges, card counts, and anonymous view to live PostgreSQL data.
- Added live student submission detail pages for dynamically created activities.
- Added activity close/reopen controls to the teacher result screen.
- Disabled student card editing, adding, deleting, and submission controls when an activity is closed.
- Kept the SQL Connect active-status check as the authoritative write boundary and normalized denied writes to `403`.
- Deployed the updated connector and regenerated the SDK.

### Verification

- The teacher result API returns a student's newly saved card and submission state.
- The owner can close an activity, after which the assigned student's write returns `403`.
- Reopening restores student editing and submission writes.
- A non-owner receives `404` for results and `403` for status changes.
- Test activities, cards, links, and Firebase Auth users are removed after verification.

## 2026-07-12 Student Card Autosave And Submission

### Completed

- Added authenticated student work queries for the linked student's cards and individual submission status.
- Added transactional card upsert/delete and submission mutations that verify Firebase UID, present attendance, and active activity status.
- Derived card storage IDs inside SQL Connect from `auth.uid` and the client card ID so direct connector calls cannot target another student's card.
- Added a bearer-token-protected student work Route Handler with card count, column, and content-length validation.
- Implemented full-snapshot synchronization so deleted cards are removed from PostgreSQL as part of autosave.
- Loaded persisted cards and draft/submitted/modified state into the student activity workspace.
- Added a 700ms debounced autosave indicator with stale-response protection.
- Persisted `DRAFT`, `SUBMITTED`, and post-submission `MODIFIED` status transitions.
- Deployed the updated connector and regenerated the SQL Connect SDK.

### Verification

- An assigned student can save and restore a draft card.
- Card content and column changes persist across reads.
- Submission and post-submission modification states persist.
- Removing all cards deletes their database records while preserving the modified submission state.
- An unassigned authenticated user cannot write student work, and anonymous activity access remains denied.
- Integration-test activities, cards, links, and Firebase Auth users are removed after verification.

## 2026-07-12 CSV Student Import And Account Issuance

### Completed

- Added an owner-filtered student list query for server-side duplicate student-number checks.
- Added a teacher-profile-protected CSV import Route Handler with a 200-row request limit and field validation.
- Created missing classes, persisted students, created Firebase email/password accounts, and linked their UIDs in one import flow.
- Generated 12-character temporary passwords and returned them only in the one-time import response.
- Added CSV header parsing for Korean and English columns, sample CSV download, per-row errors, and credentials CSV download.
- Added compensating cleanup when Firebase account linking or student persistence fails.
- Added ownership-checked student and class deletion operations for CRUD and integration-test cleanup.
- Deployed the updated SQL Connect connector and regenerated the SDK.

### Verification

- A CSV row creates its class, student record, Firebase account, and UID link.
- The issued email and temporary password successfully authenticate the student session.
- Re-importing the same teacher-scoped student number returns a duplicate-row error without another account.
- A linked student account receives `403` when calling the teacher-only CSV import endpoint.
- Smoke-test teacher/student accounts, profiles, class, and student rows are removed after verification.

## 2026-07-12 Student Authentication And Assigned Activity Access

### Completed

- Added nullable, unique `Student.authUid` for linking Firebase Authentication users without breaking existing student rows or allowing one account to be linked twice.
- Replaced the public activity detail operation with separate teacher-owner and assigned-student queries.
- Added authenticated student profile, assigned activity list, and assigned activity detail SQL Connect operations.
- Limited student activity access to linked students with `PRESENT` attendance.
- Added ownership-checked student account link and unlink mutations for the account-issuance workflow.
- Added a bearer-token-protected student session Route Handler and a real Firebase email/password student login screen.
- Removed the mock activity list from the student portal; authenticated students now see only live assigned activities.
- Added explicit loading and access-denied states for dynamic student activity pages.
- Migrated the live PostgreSQL schema and deployed the updated SQL Connect connector.
- Added `scripts/student-access-smoke.mjs` with automatic activity, account-link, and Firebase Auth cleanup.

### Access Verification

- An assigned student can load their profile, activity list, and activity detail.
- An authenticated but unassigned user receives `403` for the student session and `404` for activity detail.
- An anonymous activity detail request receives `401`.
- A teacher can still read and remove their own activity.
- The student login page renders without a Next.js error overlay.

## 2026-07-12 Class And Student Ownership

### Completed

- Added nullable `teacherId` ownership fields to `SchoolClass` and `Student` while preserving legacy rows.
- Added `Student.externalId` and widened storage IDs for UID-scoped class and student identifiers.
- Derived class and student ownership and storage IDs from `auth.uid` in authenticated SQL Connect mutations.
- Added transactional ownership checks to class assignment, attendance, group membership, individual submission, and group agreement writes.
- Restored external student IDs in activity detail responses so the UI continues to use IDs such as `s1`.
- Migrated the live PostgreSQL schema and deployed the updated `teacher` connector.
- Added `scripts/teacher-data-isolation-smoke.mjs` for repeatable two-teacher integration verification and automatic cleanup.

### Ownership Verification

- Two teachers can independently reuse `5학년 1반` and external student ID `s1` without storage collisions.
- Attendance, group membership, and agreement responses restore `s1` instead of exposing UID-scoped storage IDs.
- A direct attempt by Teacher B to attach Teacher A's student fails with the connector ownership check.
- Each teacher's activity list contains only their own activity.
- Test activities and Firebase Auth accounts are removed after verification.

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
