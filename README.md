# Visible Thinking Routines Platform

교사가 사고 시각화 루틴 활동을 만들고, 학생이 개인 또는 모둠으로 참여하며, 교사가 결과를 검토하는 수업 운영 플랫폼의 MVP 프로토타입입니다.

현재 구현은 See-Think-Wonder 활동 흐름과 Firebase SQL Connect 저장소 전환 준비에 집중합니다. 제품 요구사항은 `PRODUCT_PRD.md`, 단계별 기획은 `PRODUCT_PLAN.md`, 작업 이력은 `IMPLEMENTATION_LOG.md`에서 확인할 수 있습니다.

## 기술 구성

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Firebase SDK
- Firebase Data Connect / Cloud SQL for PostgreSQL 준비 구조

프로젝트 규칙상 Next.js 코드를 변경하기 전에 설치된 버전의 문서인 `node_modules/next/dist/docs/`를 확인해야 합니다.

## 로컬 실행

요구 환경:

- Node.js 20.9 이상
- npm

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. Firebase를 아직 연결하지 않았다면 `CREATED_ACTIVITY_STORE=memory`를 사용합니다. 이 저장소는 서버 프로세스가 재시작되면 초기화되며, 클라이언트는 `localStorage`를 임시 폴백으로 사용합니다.

Firebase SQL Connect 설정은 `dataconnect/SETUP.md`를 따릅니다. 실제 프로젝트 연결 전에는 `CREATED_ACTIVITY_STORE=sql-connect`를 활성화하지 마세요.

## 품질 검사

```bash
npm run lint
npm run typecheck
npm run build
```

세 검사를 순서대로 한 번에 실행하려면 다음 명령을 사용합니다.

```bash
npm run check
```

## 주요 경로

- `/` — 프로토타입 진입 화면
- `/teacher` — 교사 대시보드
- `/teacher/students` — 학급·학생·모둠 관리
- `/teacher/activities` — 교사 활동 목록
- `/teacher/activities/new` — 활동 생성
- `/student` — 학생 활동 목록 진입 화면
- `/student/activities/[activityId]` — 학생 활동 화면
- `/api/created-activities` — 프로토타입 활동 저장 API

## 현재 범위와 제한

구현된 범위:

- 교사 대시보드와 학급/학생/모둠 관리 UI
- 개인/모둠 활동 생성 흐름
- 출결과 활동별 모둠 설정 UI
- 학생 See-Think-Wonder 카드 작성 UI
- 학생/모둠 결과 검토 UI
- 메모리 저장소와 SQL Connect 저장소 어댑터
- Data Connect 스키마, 작업, 생성 SDK

아직 운영 기능으로 연결되지 않은 범위:

- 교사와 학생 인증 및 권한 분리
- CSV/XLSX 학생 등록과 비밀번호 발급
- 학급/학생/모둠 영속 저장
- 이미지/PDF 업로드와 실제 QR 생성
- 학생 카드 자동 저장과 제출 영속화
- 활동 마감, 태그, AI 분석
- 운영 배포 환경 변수와 인증 기반 SQL Connect 권한

현재 Data Connect 작업은 프로토타입용 공개 권한을 사용합니다. 인증과 소유권 검사가 구현되기 전에는 공개 배포 환경에서 사용하면 안 됩니다.
