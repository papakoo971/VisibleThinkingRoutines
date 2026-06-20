export type RoutineColumn = "see" | "think" | "wonder";

export type Student = {
  id: string;
  className: string;
  studentNumber: string;
  name: string;
  passwordIssued: boolean;
};

export type ThinkingCard = {
  id: string;
  studentId: string;
  column: RoutineColumn;
  content: string;
  tags: string[];
  tagsPublic: boolean;
};

export type ActivityMode = "individual" | "group";
export type AttendanceStatus = "present" | "absent";

export type Activity = {
  id: string;
  title: string;
  routine: "See-Think-Wonder" | "프레이어 모델";
  activityMode: ActivityMode;
  subject: string;
  classes: string[];
  status: "active" | "closed";
  code: string;
  materialType: "image" | "pdf";
  activityDate: string;
  submittedCount: number;
  targetCount: number;
};

export type Group = {
  id: string;
  name: string;
  studentIds: string[];
};

export type ActivityGroup = Group & {
  activityId: string;
};

export type ActivityAttendance = {
  activityId: string;
  studentId: string;
  status: AttendanceStatus;
};

export type GroupThinkingCard = {
  id: string;
  activityId: string;
  groupId: string;
  column: RoutineColumn;
  content: string;
  updatedByStudentId: string;
};

export type GroupSubmissionAgreement = {
  activityId: string;
  groupId: string;
  studentId: string;
  agreed: boolean;
};

export type SubmissionStatus = "draft" | "submitted" | "modified";

export type IndividualSubmission = {
  activityId: string;
  studentId: string;
  status: SubmissionStatus;
  cards: ThinkingCard[];
};

export type GroupSubmission = {
  activityId: string;
  groupId: string;
  status: SubmissionStatus;
  cards: GroupThinkingCard[];
  agreements: GroupSubmissionAgreement[];
};

export const teacherProfile = {
  name: "김교사",
  operationMode: "subject_first",
  schoolLabel: "과목 우선 운영",
};

export const classes = ["5학년 1반", "5학년 2반", "6학년 3반"];

export const students: Student[] = [
  { id: "s1", className: "5학년 1반", studentNumber: "20260101", name: "김민준", passwordIssued: true },
  { id: "s2", className: "5학년 1반", studentNumber: "20260102", name: "이서연", passwordIssued: true },
  { id: "s3", className: "5학년 1반", studentNumber: "20260103", name: "박지후", passwordIssued: true },
  { id: "s4", className: "5학년 1반", studentNumber: "20260104", name: "최하린", passwordIssued: true },
  { id: "s5", className: "5학년 1반", studentNumber: "20260105", name: "정도윤", passwordIssued: true },
  { id: "s6", className: "5학년 2반", studentNumber: "20260201", name: "한지아", passwordIssued: true },
  { id: "s7", className: "5학년 2반", studentNumber: "20260202", name: "오시우", passwordIssued: true },
  { id: "s8", className: "6학년 3반", studentNumber: "20260301", name: "윤서준", passwordIssued: true },
];

export const groups: Group[] = [
  { id: "g1", name: "1모둠", studentIds: ["s1", "s2", "s3", "s4"] },
  { id: "g2", name: "2모둠", studentIds: ["s5", "s6", "s7", "s8"] },
];

export const activities: Activity[] = [
  {
    id: "a1",
    title: "사진 속 도시의 변화 관찰하기",
    routine: "See-Think-Wonder",
    activityMode: "group",
    subject: "사회",
    classes: ["5학년 1반", "5학년 2반"],
    status: "active",
    code: "STW-72K",
    materialType: "image",
    activityDate: "2026-06-10",
    submittedCount: 6,
    targetCount: 7,
  },
  {
    id: "a2",
    title: "과학 기사 읽고 주장 근거 찾기",
    routine: "See-Think-Wonder",
    activityMode: "individual",
    subject: "과학",
    classes: ["6학년 3반"],
    status: "closed",
    code: "STW-19Q",
    materialType: "pdf",
    activityDate: "2026-06-03",
    submittedCount: 1,
    targetCount: 1,
  },
  {
    id: "a3",
    title: "생태계 핵심 개념 정리하기",
    routine: "프레이어 모델",
    activityMode: "individual",
    subject: "과학",
    classes: ["5학년 1반"],
    status: "active",
    code: "FRY-48M",
    materialType: "pdf",
    activityDate: "2026-06-13",
    submittedCount: 4,
    targetCount: 5,
  },
];

export const activityGroups: ActivityGroup[] = [
  { id: "ag1", activityId: "a1", name: "1모둠", studentIds: ["s1", "s2", "s3", "s4"] },
  { id: "ag2", activityId: "a1", name: "2모둠", studentIds: ["s5"] },
];

export const activityAttendance: ActivityAttendance[] = [
  { activityId: "a1", studentId: "s1", status: "present" },
  { activityId: "a1", studentId: "s2", status: "present" },
  { activityId: "a1", studentId: "s3", status: "present" },
  { activityId: "a1", studentId: "s4", status: "absent" },
  { activityId: "a1", studentId: "s5", status: "present" },
];

export const groupThinkingCards: GroupThinkingCard[] = [
  {
    id: "gc1",
    activityId: "a1",
    groupId: "ag1",
    column: "see",
    content: "도로가 넓고 높은 건물이 많으며 공원은 한쪽에 작게 보인다.",
    updatedByStudentId: "s1",
  },
  {
    id: "gc2",
    activityId: "a1",
    groupId: "ag1",
    column: "think",
    content: "이 도시는 사람이 걷는 것보다 자동차 이동을 더 중요하게 생각한 것 같다.",
    updatedByStudentId: "s2",
  },
  {
    id: "gc3",
    activityId: "a1",
    groupId: "ag1",
    column: "wonder",
    content: "공원이나 보행로가 더 많아지면 사람들의 생활은 어떻게 달라질까?",
    updatedByStudentId: "s3",
  },
];

export const groupSubmissionAgreements: GroupSubmissionAgreement[] = [
  { activityId: "a1", groupId: "ag1", studentId: "s1", agreed: true },
  { activityId: "a1", groupId: "ag1", studentId: "s2", agreed: true },
  { activityId: "a1", groupId: "ag1", studentId: "s3", agreed: false },
];

export const thinkingCards: ThinkingCard[] = [
  {
    id: "c1",
    studentId: "s1",
    column: "see",
    content: "큰 도로 옆에 높은 건물이 많고 사람보다 자동차가 더 많이 보인다.",
    tags: ["좋은 관찰"],
    tagsPublic: true,
  },
  {
    id: "c2",
    studentId: "s1",
    column: "think",
    content: "사람들이 이동하기 편하게 도시가 자동차 중심으로 설계된 것 같다.",
    tags: ["토론거리"],
    tagsPublic: false,
  },
  {
    id: "c3",
    studentId: "s1",
    column: "wonder",
    content: "이 도시에는 어린이나 노인이 안전하게 다닐 수 있는 길이 충분할까?",
    tags: ["흥미로운 질문"],
    tagsPublic: true,
  },
  {
    id: "c4",
    studentId: "s2",
    column: "see",
    content: "왼쪽에는 공원이 있고 오른쪽에는 공장처럼 보이는 건물이 있다.",
    tags: [],
    tagsPublic: false,
  },
  {
    id: "c5",
    studentId: "s2",
    column: "think",
    content: "도시가 발전하면서 자연 공간과 산업 시설이 같이 생긴 것 같다.",
    tags: ["좋은 관찰"],
    tagsPublic: false,
  },
  {
    id: "c6",
    studentId: "s3",
    column: "wonder",
    content: "공장이 생기면 주변 공기나 물은 어떻게 변했을까?",
    tags: ["오개념", "토론거리"],
    tagsPublic: false,
  },
];

export const individualSubmissions: IndividualSubmission[] = [
  {
    activityId: "a2",
    studentId: "s8",
    status: "submitted",
    cards: [
      {
        id: "a2-s8-c1",
        studentId: "s8",
        column: "see",
        content: "기사에서 과학자의 주장과 실험 결과가 함께 제시되어 있다.",
        tags: ["좋은 관찰"],
        tagsPublic: true,
      },
      {
        id: "a2-s8-c2",
        studentId: "s8",
        column: "think",
        content: "주장은 실험 결과를 근거로 설명해야 더 설득력이 생기는 것 같다.",
        tags: ["토론거리"],
        tagsPublic: false,
      },
    ],
  },
  {
    activityId: "a3",
    studentId: "s1",
    status: "draft",
    cards: [
      {
        id: "a3-s1-c1",
        studentId: "s1",
        column: "see",
        content: "생태계에는 생산자, 소비자, 분해자가 함께 있다.",
        tags: [],
        tagsPublic: false,
      },
    ],
  },
];

export const groupSubmissions: GroupSubmission[] = [
  {
    activityId: "a1",
    groupId: "ag1",
    status: "modified",
    cards: groupThinkingCards.filter((card) => card.activityId === "a1" && card.groupId === "ag1"),
    agreements: groupSubmissionAgreements.filter((agreement) => agreement.activityId === "a1" && agreement.groupId === "ag1"),
  },
  {
    activityId: "a1",
    groupId: "ag2",
    status: "draft",
    cards: [],
    agreements: [],
  },
];

export const defaultTags = ["좋은 관찰", "흥미로운 질문", "오개념", "토론거리"];

export function getStudentName(studentId: string) {
  return students.find((student) => student.id === studentId)?.name ?? "알 수 없음";
}

export function getStudentById(studentId: string) {
  return students.find((student) => student.id === studentId);
}
