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
- Firebase Authentication (교사 이메일/비밀번호)
- AI SDK 6 / Vercel AI Gateway

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
- `/login` — 교사 로그인
- `/signup` — 교사 회원가입
- `/teacher` — 교사 대시보드
- `/teacher/onboarding` — 최초 수업 운영 방식 선택
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
- 교사 이메일/비밀번호 인증, 프로필, 운영 방식 온보딩
- 미인증 교사 화면 접근 차단과 로그아웃
- CSV 학생 일괄 등록, 학급 자동 생성, Firebase 학생 계정과 임시 비밀번호 발급
- 개인 See-Think-Wonder 카드 자동 저장과 제출·제출 후 수정 상태 영속화
- 교사 실시간 학생 카드·제출 상태 결과 조회와 활동 마감·다시 열기
- 활동별 안내문·자료 메타데이터, 짧은 코드, 내부 생성 QR 접속 흐름
- Firebase Storage 자료 업로드와 교사 UID 경로 보안 규칙
- 기본·사용자 정의 카드 태그, 결과 필터, 학생 공개 설정
- 개인·학급 AI 분석 생성, 결과·모델·토큰 사용량 영속화, 카드 변경 감지

아직 운영 기능으로 연결되지 않은 범위:

- XLSX 학생 등록과 기존 학생 비밀번호 재발급
- 독립적인 학급/학생/모둠 관리 화면의 CRUD 영속화
- 모둠 공동 카드 자동 저장과 제출 영속화
- AI Gateway 자격 증명을 사용한 실제 모델 호출 운영 검증
- 운영 배포 환경 변수와 인증 기반 SQL Connect 권한

교사 프로필, 활동, 활동에 연결된 학급·학생 데이터는 Firebase Auth UID 소유권으로 격리됩니다. 학생은 교사가 연결한 Firebase 계정으로 로그인하며, 출석 상태가 `PRESENT`인 배정 활동만 조회할 수 있습니다. Route Handler는 Firebase ID 토큰을 검증하고 SQL Connect는 `auth.uid`를 기준으로 교사 소유권 또는 학생 배정을 다시 평가합니다.
