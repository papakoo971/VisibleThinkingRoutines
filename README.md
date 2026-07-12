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
- AI SDK 6 / OpenAI / Anthropic Claude / Google Gemini

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
- CSV/XLSX 학생 일괄 등록, 학급 자동 생성, Firebase 학생 계정과 임시 비밀번호 발급
- 학생 이름·학번 수정, 학생 및 연결 로그인 계정 삭제, 기존 학생 임시 비밀번호 재발급
- 개인 See-Think-Wonder 카드 자동 저장과 제출·제출 후 수정 상태 영속화
- 교사 실시간 학생 카드·제출 상태 결과 조회와 활동 마감·다시 열기
- 활동별 안내문·자료 메타데이터, 짧은 코드, 내부 생성 QR 접속 흐름
- Firebase Storage 자료 업로드와 교사 UID 경로 보안 규칙
- 기본·사용자 정의 카드 태그, 결과 필터, 학생 공개 설정
- 교사별 암호화 API 키, provider·모델 버전 선택을 사용하는 개인·학급 AI 분석, 결과·모델·토큰 사용량 영속화, 카드 변경 감지
- 저장된 AI 키·모델 연결 확인, provider 오류 구분, 호출 제한 시간·재시도·출력 상한
- 학급 AI 보고서 제출 인원·제출률 및 낮은 제출률 안내, 제출 완료 후 개인 분석 제한
- 교사 승인 기반 개인 AI 피드백 공개와 학생 본인 전용 피드백 조회
- SQL Connect 카드 단위 저장과 2초 동기화를 사용하는 모둠 공동 편집, 출석 모둠원 전원 동의 제출
- 교사 결과 화면의 실제 모둠 카드·작성자·동의·제출 상태 및 모둠 제출률 조회
- 실제 학급·학생 목록과 기본 모둠 생성·드래그 배정·무작위 자동 배정 영속화
- 교사 대시보드·활동 목록·활동 생성의 실제 학급·학생·기본 모둠 데이터 연결

아직 운영 기능으로 연결되지 않은 범위:

- 운영 배포 환경 변수와 인증 기반 SQL Connect 권한

교사 프로필, 활동, 활동에 연결된 학급·학생 데이터는 Firebase Auth UID 소유권으로 격리됩니다. 학생은 교사가 연결한 Firebase 계정으로 로그인하며, 출석 상태가 `PRESENT`인 배정 활동만 조회할 수 있습니다. Route Handler는 Firebase ID 토큰을 검증하고 SQL Connect는 `auth.uid`를 기준으로 교사 소유권 또는 학생 배정을 다시 평가합니다.

기존 학생 비밀번호 재발급과 연결 계정 삭제에는 서버 측 Firebase Admin 자격 증명이 필요합니다. 로컬에서는 `.env.local.example`의 `FIREBASE_SERVICE_ACCOUNT_JSON`을 설정하고, 배포 환경에서는 동등한 Admin 자격 증명을 안전한 서버 환경 변수로 제공해야 합니다.

AI 설정의 “연결 확인”은 사용자가 저장한 provider 키로 최소 토큰 호출을 실행하므로 해당 provider 계정에 소량의 사용량이 기록될 수 있습니다. 저장된 키는 응답이나 클라이언트 상태로 반환되지 않습니다.
