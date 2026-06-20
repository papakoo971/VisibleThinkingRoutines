# Implementation Log

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
