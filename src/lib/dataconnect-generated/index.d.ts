import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum ActivityMode {
  INDIVIDUAL = "INDIVIDUAL",
  GROUP = "GROUP",
};

export enum ActivityStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
};

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
};

export enum RoutineColumn {
  SEE = "SEE",
  THINK = "THINK",
  WONDER = "WONDER",
};

export enum SubmissionStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  MODIFIED = "MODIFIED",
};

export enum TeacherOperationMode {
  CLASS_FIRST = "CLASS_FIRST",
  SUBJECT_FIRST = "SUBJECT_FIRST",
};



export interface ActivityAttendance_Key {
  activityId: string;
  studentId: string;
  __typename?: 'ActivityAttendance_Key';
}

export interface ActivityClass_Key {
  activityId: string;
  schoolClassId: string;
  __typename?: 'ActivityClass_Key';
}

export interface ActivityGroupMember_Key {
  activityGroupId: string;
  studentId: string;
  __typename?: 'ActivityGroupMember_Key';
}

export interface ActivityGroup_Key {
  id: string;
  __typename?: 'ActivityGroup_Key';
}

export interface Activity_Key {
  id: string;
  __typename?: 'Activity_Key';
}

export interface AiAnalysis_Key {
  id: string;
  __typename?: 'AiAnalysis_Key';
}

export interface AssignDefaultGroupMemberData {
  defaultGroupMember_upsert: DefaultGroupMember_Key;
}

export interface AssignDefaultGroupMemberVariables {
  defaultGroupId: string;
  studentId: string;
  schoolClassId: string;
}

export interface CreateActivityData {
  activity_insert: Activity_Key;
}

export interface CreateActivityVariables {
  id: string;
  title: string;
  routine: string;
  activityMode: ActivityMode;
  subject: string;
  status: ActivityStatus;
  code: string;
  materialType: string;
  materialUrl?: string | null;
  materialName?: string | null;
  instructions?: string | null;
  activityDate: DateString;
  submittedCount: number;
  targetCount: number;
}

export interface CreateDefaultGroupData {
  defaultGroup_insert: DefaultGroup_Key;
}

export interface CreateDefaultGroupVariables {
  id: string;
  schoolClassId: string;
  name: string;
}

export interface DefaultGroupMember_Key {
  defaultGroupId: string;
  studentId: string;
  __typename?: 'DefaultGroupMember_Key';
}

export interface DefaultGroup_Key {
  id: string;
  __typename?: 'DefaultGroup_Key';
}

export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}

export interface DeleteActivityVariables {
  id: string;
}

export interface DeleteDefaultGroupData {
  defaultGroup_delete?: DefaultGroup_Key | null;
}

export interface DeleteDefaultGroupVariables {
  id: string;
}

export interface DeleteMyAiCredentialData {
  teacherAiCredential_delete?: TeacherAiCredential_Key | null;
}

export interface DeleteMyGroupThinkingCardData {
  groupThinkingCard_delete?: GroupThinkingCard_Key | null;
}

export interface DeleteMyGroupThinkingCardVariables {
  externalId: string;
  activityId: string;
  activityGroupId: string;
  studentId: string;
}

export interface DeleteMyTeacherProfileData {
  teacherProfile_delete?: TeacherProfile_Key | null;
}

export interface DeleteMyThinkingCardData {
  thinkingCard_delete?: ThinkingCard_Key | null;
}

export interface DeleteMyThinkingCardVariables {
  externalId: string;
  activityId: string;
  studentId: string;
}

export interface DeleteSchoolClassData {
  schoolClass_delete?: SchoolClass_Key | null;
}

export interface DeleteSchoolClassVariables {
  id: string;
}

export interface DeleteStudentData {
  student_delete?: Student_Key | null;
}

export interface DeleteStudentVariables {
  id: string;
}

export interface FindActivityByCodeData {
  activities: ({
    id: string;
  } & Activity_Key)[];
}

export interface FindActivityByCodeVariables {
  code: string;
}

export interface GetClassManagementData {
  schoolClasses: ({
    id: string;
    name: string;
  } & SchoolClass_Key)[];
  students: ({
    id: string;
    externalId?: string | null;
    authUid?: string | null;
    studentNumber: string;
    name: string;
    passwordIssued: boolean;
    schoolClass: {
      id: string;
      name: string;
    } & SchoolClass_Key;
  } & Student_Key)[];
  defaultGroups: ({
    id: string;
    name: string;
    schoolClass: {
      id: string;
    } & SchoolClass_Key;
    defaultGroupMembers_on_defaultGroup: ({
      student: {
        id: string;
      } & Student_Key;
    })[];
  } & DefaultGroup_Key)[];
}

export interface GetMyAiCredentialData {
  teacherAiCredential?: {
    provider: string;
    model?: string | null;
    encryptedApiKey: string;
    initializationVector: string;
    authenticationTag: string;
    keyHint: string;
    updatedAt: TimestampString;
  };
}

export interface GetMyGroupWorkData {
  students: ({
    id: string;
    externalId?: string | null;
    name: string;
    schoolClass: {
      name: string;
    };
  } & Student_Key)[];
  activityGroupMembers: ({
    activityGroup: {
      id: string;
      name: string;
      activity: {
        status: ActivityStatus;
      };
      activityGroupMembers_on_activityGroup: ({
        student: {
          id: string;
          externalId?: string | null;
          name: string;
          authUid?: string | null;
        } & Student_Key;
      })[];
      groupThinkingCards_on_activityGroup: ({
        id: string;
        column: RoutineColumn;
        content: string;
        updatedAt: TimestampString;
        updatedByStudent: {
          id: string;
          externalId?: string | null;
          name: string;
        } & Student_Key;
      } & GroupThinkingCard_Key)[];
      groupSubmissions_on_activityGroup: ({
        status: SubmissionStatus;
        updatedAt: TimestampString;
      })[];
      groupSubmissionAgreements_on_activityGroup: ({
        agreed: boolean;
        updatedAt: TimestampString;
        student: {
          id: string;
          externalId?: string | null;
          name: string;
        } & Student_Key;
      })[];
    } & ActivityGroup_Key;
  })[];
  activityAttendances: ({
    status: AttendanceStatus;
    student: {
      id: string;
      externalId?: string | null;
    } & Student_Key;
  })[];
}

export interface GetMyGroupWorkVariables {
  activityId: string;
}

export interface GetMyStudentActivityData {
  activityAttendances: ({
    activity: {
      id: string;
      title: string;
      routine: string;
      activityMode: ActivityMode;
      subject: string;
      status: ActivityStatus;
      code: string;
      materialType: string;
      materialUrl?: string | null;
      materialName?: string | null;
      instructions?: string | null;
      activityDate: DateString;
      submittedCount: number;
      targetCount: number;
      activityClasses_on_activity: ({
        schoolClass: {
          id: string;
          name: string;
        } & SchoolClass_Key;
      })[];
      activityAttendances_on_activity: ({
        status: AttendanceStatus;
        student: {
          id: string;
          externalId?: string | null;
          name: string;
          studentNumber: string;
          schoolClass: {
            id: string;
            name: string;
          } & SchoolClass_Key;
        } & Student_Key;
      })[];
      activityGroups_on_activity: ({
        id: string;
        name: string;
        activityGroupMembers_on_activityGroup: ({
          student: {
            id: string;
            externalId?: string | null;
            name: string;
            studentNumber: string;
          } & Student_Key;
        })[];
      } & ActivityGroup_Key)[];
      individualSubmissions_on_activity: ({
        status: SubmissionStatus;
        student: {
          id: string;
          externalId?: string | null;
        } & Student_Key;
      })[];
      groupSubmissions_on_activity: ({
        status: SubmissionStatus;
        activityGroup: {
          id: string;
        } & ActivityGroup_Key;
      })[];
      groupSubmissionAgreements_on_activity: ({
        agreed: boolean;
        activityGroup: {
          id: string;
        } & ActivityGroup_Key;
        student: {
          id: string;
          externalId?: string | null;
        } & Student_Key;
      })[];
    } & Activity_Key;
  })[];
}

export interface GetMyStudentActivityVariables {
  id: string;
}

export interface GetMyStudentData {
  students: ({
    id: string;
    externalId?: string | null;
    studentNumber: string;
    name: string;
    schoolClass: {
      id: string;
      name: string;
    } & SchoolClass_Key;
  } & Student_Key)[];
}

export interface GetMyStudentWorkData {
  students: ({
    id: string;
    externalId?: string | null;
    name: string;
    schoolClass: {
      name: string;
    };
  } & Student_Key)[];
  thinkingCards: ({
    id: string;
    column: RoutineColumn;
    content: string;
    tags?: string[] | null;
    tagsPublic: boolean;
    updatedAt: TimestampString;
  } & ThinkingCard_Key)[];
  individualSubmissions: ({
    status: SubmissionStatus;
    updatedAt: TimestampString;
  })[];
  aiAnalyses: ({
    id: string;
    model: string;
    summary?: string | null;
    strengths?: string[] | null;
    nextQuestions?: string[] | null;
    recommendations?: string[] | null;
    sourceFingerprint?: string | null;
    updatedAt: TimestampString;
  } & AiAnalysis_Key)[];
}

export interface GetMyStudentWorkVariables {
  activityId: string;
}

export interface GetMyTeacherProfileData {
  teacherProfile?: {
    id: string;
    email: string;
    displayName: string;
    operationMode: TeacherOperationMode;
  } & TeacherProfile_Key;
}

export interface GetTeacherActivityData {
  activities: ({
    id: string;
    title: string;
    routine: string;
    activityMode: ActivityMode;
    subject: string;
    status: ActivityStatus;
    code: string;
    materialType: string;
    materialUrl?: string | null;
    materialName?: string | null;
    instructions?: string | null;
    activityDate: DateString;
    submittedCount: number;
    targetCount: number;
    activityClasses_on_activity: ({
      schoolClass: {
        id: string;
        name: string;
      } & SchoolClass_Key;
    })[];
    activityAttendances_on_activity: ({
      status: AttendanceStatus;
      student: {
        id: string;
        externalId?: string | null;
        name: string;
        studentNumber: string;
        schoolClass: {
          id: string;
          name: string;
        } & SchoolClass_Key;
      } & Student_Key;
    })[];
    activityGroups_on_activity: ({
      id: string;
      name: string;
      activityGroupMembers_on_activityGroup: ({
        student: {
          id: string;
          externalId?: string | null;
          name: string;
          studentNumber: string;
        } & Student_Key;
      })[];
    } & ActivityGroup_Key)[];
    individualSubmissions_on_activity: ({
      status: SubmissionStatus;
      student: {
        id: string;
        externalId?: string | null;
      } & Student_Key;
    })[];
    groupSubmissions_on_activity: ({
      status: SubmissionStatus;
      activityGroup: {
        id: string;
      } & ActivityGroup_Key;
    })[];
    groupSubmissionAgreements_on_activity: ({
      agreed: boolean;
      activityGroup: {
        id: string;
      } & ActivityGroup_Key;
      student: {
        id: string;
        externalId?: string | null;
      } & Student_Key;
    })[];
    aiAnalyses_on_activity: ({
      id: string;
      scope: string;
      studentExternalId?: string | null;
      studentVisible: boolean;
      status: string;
      model: string;
      summary?: string | null;
      strengths?: string[] | null;
      misconceptions?: string[] | null;
      nextQuestions?: string[] | null;
      recommendations?: string[] | null;
      sourceFingerprint?: string | null;
      inputTokens?: number | null;
      outputTokens?: number | null;
      totalTokens?: number | null;
      errorMessage?: string | null;
      updatedAt: TimestampString;
    } & AiAnalysis_Key)[];
  } & Activity_Key)[];
}

export interface GetTeacherActivityResultsData {
  activities: ({
    id: string;
    title: string;
    routine: string;
    activityMode: ActivityMode;
    subject: string;
    status: ActivityStatus;
    thinkingCards_on_activity: ({
      id: string;
      column: RoutineColumn;
      content: string;
      tags?: string[] | null;
      tagsPublic: boolean;
      updatedAt: TimestampString;
      student: {
        id: string;
        externalId?: string | null;
        authUid?: string | null;
        name: string;
        studentNumber: string;
        schoolClass: {
          name: string;
        };
      } & Student_Key;
    } & ThinkingCard_Key)[];
    individualSubmissions_on_activity: ({
      status: SubmissionStatus;
      updatedAt: TimestampString;
      student: {
        id: string;
        externalId?: string | null;
        name: string;
        studentNumber: string;
        schoolClass: {
          name: string;
        };
      } & Student_Key;
    })[];
    activityGroups_on_activity: ({
      id: string;
      name: string;
      groupThinkingCards_on_activityGroup: ({
        id: string;
        column: RoutineColumn;
        content: string;
        updatedAt: TimestampString;
        updatedByStudent: {
          id: string;
          externalId?: string | null;
          name: string;
        } & Student_Key;
      } & GroupThinkingCard_Key)[];
      groupSubmissions_on_activityGroup: ({
        status: SubmissionStatus;
        updatedAt: TimestampString;
      })[];
      groupSubmissionAgreements_on_activityGroup: ({
        agreed: boolean;
        student: {
          id: string;
          externalId?: string | null;
          name: string;
        } & Student_Key;
      })[];
    } & ActivityGroup_Key)[];
    activityAttendances_on_activity: ({
      status: AttendanceStatus;
      student: {
        id: string;
        externalId?: string | null;
        name: string;
        studentNumber: string;
        schoolClass: {
          name: string;
        };
      } & Student_Key;
    })[];
    aiAnalyses_on_activity: ({
      id: string;
      scope: string;
      studentExternalId?: string | null;
      studentVisible: boolean;
      status: string;
      model: string;
      summary?: string | null;
      strengths?: string[] | null;
      misconceptions?: string[] | null;
      nextQuestions?: string[] | null;
      recommendations?: string[] | null;
      sourceFingerprint?: string | null;
      inputTokens?: number | null;
      outputTokens?: number | null;
      totalTokens?: number | null;
      errorMessage?: string | null;
      updatedAt: TimestampString;
    } & AiAnalysis_Key)[];
  } & Activity_Key)[];
}

export interface GetTeacherActivityResultsVariables {
  id: string;
}

export interface GetTeacherActivityVariables {
  id: string;
}

export interface GroupSubmissionAgreement_Key {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  __typename?: 'GroupSubmissionAgreement_Key';
}

export interface GroupSubmission_Key {
  activityId: string;
  activityGroupId: string;
  __typename?: 'GroupSubmission_Key';
}

export interface GroupThinkingCard_Key {
  id: string;
  __typename?: 'GroupThinkingCard_Key';
}

export interface IndividualSubmission_Key {
  activityId: string;
  studentId: string;
  __typename?: 'IndividualSubmission_Key';
}

export interface LinkStudentAuthData {
  student_update?: Student_Key | null;
}

export interface LinkStudentAuthVariables {
  studentId: string;
  authUid: string;
}

export interface ListActivitiesData {
  activities: ({
    id: string;
    title: string;
    routine: string;
    activityMode: ActivityMode;
    subject: string;
    status: ActivityStatus;
    code: string;
    materialType: string;
    materialUrl?: string | null;
    materialName?: string | null;
    instructions?: string | null;
    activityDate: DateString;
    submittedCount: number;
    targetCount: number;
    activityClasses_on_activity: ({
      schoolClass: {
        id: string;
        name: string;
      } & SchoolClass_Key;
    })[];
  } & Activity_Key)[];
}

export interface ListMyStudentActivitiesData {
  activityAttendances: ({
    activity: {
      id: string;
      title: string;
      routine: string;
      activityMode: ActivityMode;
      subject: string;
      status: ActivityStatus;
      code: string;
      materialType: string;
      materialUrl?: string | null;
      materialName?: string | null;
      instructions?: string | null;
      activityDate: DateString;
      submittedCount: number;
      targetCount: number;
      activityClasses_on_activity: ({
        schoolClass: {
          id: string;
          name: string;
        } & SchoolClass_Key;
      })[];
    } & Activity_Key;
  })[];
}

export interface ListMyStudentsData {
  students: ({
    id: string;
    externalId?: string | null;
    authUid?: string | null;
    studentNumber: string;
    name: string;
    passwordIssued: boolean;
    schoolClass: {
      id: string;
      name: string;
    } & SchoolClass_Key;
  } & Student_Key)[];
}

export interface RemoveDefaultGroupMemberData {
  defaultGroupMember_delete?: DefaultGroupMember_Key | null;
}

export interface RemoveDefaultGroupMemberVariables {
  defaultGroupId: string;
  studentId: string;
}

export interface RenameDefaultGroupData {
  defaultGroup_update?: DefaultGroup_Key | null;
}

export interface RenameDefaultGroupVariables {
  id: string;
  name: string;
}

export interface RenameSchoolClassData {
  schoolClass_update?: SchoolClass_Key | null;
}

export interface RenameSchoolClassVariables {
  id: string;
  name: string;
}

export interface SchoolClass_Key {
  id: string;
  __typename?: 'SchoolClass_Key';
}

export interface SetActivityStatusData {
  activity_update?: Activity_Key | null;
}

export interface SetActivityStatusVariables {
  id: string;
  status: ActivityStatus;
}

export interface SetAiAnalysisVisibilityData {
  aiAnalysis_update?: AiAnalysis_Key | null;
}

export interface SetAiAnalysisVisibilityVariables {
  id: string;
  studentVisible: boolean;
}

export interface SetMyGroupAgreementData {
  groupSubmissionAgreement_upsert: GroupSubmissionAgreement_Key;
}

export interface SetMyGroupAgreementVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  agreed: boolean;
}

export interface SetMyGroupSubmissionData {
  groupSubmission_upsert: GroupSubmission_Key;
}

export interface SetMyGroupSubmissionVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  status: SubmissionStatus;
}

export interface SetMyIndividualSubmissionData {
  individualSubmission_upsert: IndividualSubmission_Key;
}

export interface SetMyIndividualSubmissionVariables {
  activityId: string;
  studentId: string;
  status: SubmissionStatus;
}

export interface Student_Key {
  id: string;
  __typename?: 'Student_Key';
}

export interface TeacherAiCredential_Key {
  id: string;
  __typename?: 'TeacherAiCredential_Key';
}

export interface TeacherProfile_Key {
  id: string;
  __typename?: 'TeacherProfile_Key';
}

export interface ThinkingCard_Key {
  id: string;
  __typename?: 'ThinkingCard_Key';
}

export interface UnlinkStudentAuthData {
  student_update?: Student_Key | null;
}

export interface UnlinkStudentAuthVariables {
  studentId: string;
}

export interface UpdateStudentData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentVariables {
  id: string;
  schoolClassId: string;
  studentNumber: string;
  name: string;
}

export interface UpdateThinkingCardTagsData {
  thinkingCard_update?: ThinkingCard_Key | null;
}

export interface UpdateThinkingCardTagsVariables {
  id: string;
  tags?: string[] | null;
  tagsPublic: boolean;
}

export interface UpsertActivityAttendanceData {
  activityAttendance_upsert: ActivityAttendance_Key;
}

export interface UpsertActivityAttendanceVariables {
  activityId: string;
  studentId: string;
  status: AttendanceStatus;
}

export interface UpsertActivityClassData {
  activityClass_upsert: ActivityClass_Key;
}

export interface UpsertActivityClassVariables {
  activityId: string;
  schoolClassId: string;
}

export interface UpsertActivityGroupData {
  activityGroup_upsert: ActivityGroup_Key;
}

export interface UpsertActivityGroupMemberData {
  activityGroupMember_upsert: ActivityGroupMember_Key;
}

export interface UpsertActivityGroupMemberVariables {
  activityGroupId: string;
  studentId: string;
}

export interface UpsertActivityGroupVariables {
  id: string;
  activityId: string;
  name: string;
}

export interface UpsertAiAnalysisData {
  aiAnalysis_upsert: AiAnalysis_Key;
}

export interface UpsertAiAnalysisVariables {
  id: string;
  activityId: string;
  scope: string;
  studentExternalId?: string | null;
  studentAuthUid?: string | null;
  status: string;
  model: string;
  summary?: string | null;
  strengths?: string[] | null;
  misconceptions?: string[] | null;
  nextQuestions?: string[] | null;
  recommendations?: string[] | null;
  sourceFingerprint?: string | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  totalTokens?: number | null;
  errorMessage?: string | null;
}

export interface UpsertGroupSubmissionAgreementData {
  groupSubmissionAgreement_upsert: GroupSubmissionAgreement_Key;
}

export interface UpsertGroupSubmissionAgreementVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  agreed: boolean;
}

export interface UpsertGroupSubmissionData {
  groupSubmission_upsert: GroupSubmission_Key;
}

export interface UpsertGroupSubmissionVariables {
  activityId: string;
  activityGroupId: string;
  status: SubmissionStatus;
}

export interface UpsertIndividualSubmissionData {
  individualSubmission_upsert: IndividualSubmission_Key;
}

export interface UpsertIndividualSubmissionVariables {
  activityId: string;
  studentId: string;
  status: SubmissionStatus;
}

export interface UpsertMyAiCredentialData {
  teacherAiCredential_upsert: TeacherAiCredential_Key;
}

export interface UpsertMyAiCredentialVariables {
  provider: string;
  model?: string | null;
  encryptedApiKey: string;
  initializationVector: string;
  authenticationTag: string;
  keyHint: string;
}

export interface UpsertMyGroupThinkingCardData {
  groupThinkingCard_upsert: GroupThinkingCard_Key;
}

export interface UpsertMyGroupThinkingCardVariables {
  externalId: string;
  activityId: string;
  activityGroupId: string;
  studentId: string;
  column: RoutineColumn;
  content: string;
}

export interface UpsertMyTeacherProfileData {
  teacherProfile_upsert: TeacherProfile_Key;
}

export interface UpsertMyTeacherProfileVariables {
  email: string;
  displayName: string;
  operationMode: TeacherOperationMode;
}

export interface UpsertMyThinkingCardData {
  thinkingCard_upsert: ThinkingCard_Key;
}

export interface UpsertMyThinkingCardVariables {
  externalId: string;
  activityId: string;
  studentId: string;
  column: RoutineColumn;
  content: string;
}

export interface UpsertSchoolClassData {
  schoolClass_upsert: SchoolClass_Key;
}

export interface UpsertSchoolClassVariables {
  name: string;
}

export interface UpsertStudentData {
  student_upsert: Student_Key;
}

export interface UpsertStudentVariables {
  externalId: string;
  schoolClassId: string;
  studentNumber: string;
  name: string;
  passwordIssued: boolean;
}

interface GetMyTeacherProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTeacherProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyTeacherProfileData, undefined>;
  operationName: string;
}
export const getMyTeacherProfileRef: GetMyTeacherProfileRef;

export function getMyTeacherProfile(options?: ExecuteQueryOptions): QueryPromise<GetMyTeacherProfileData, undefined>;
export function getMyTeacherProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyTeacherProfileData, undefined>;

interface UpsertMyTeacherProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyTeacherProfileVariables): MutationRef<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyTeacherProfileVariables): MutationRef<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;
  operationName: string;
}
export const upsertMyTeacherProfileRef: UpsertMyTeacherProfileRef;

export function upsertMyTeacherProfile(vars: UpsertMyTeacherProfileVariables): MutationPromise<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;
export function upsertMyTeacherProfile(dc: DataConnect, vars: UpsertMyTeacherProfileVariables): MutationPromise<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;

interface DeleteMyTeacherProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyTeacherProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteMyTeacherProfileData, undefined>;
  operationName: string;
}
export const deleteMyTeacherProfileRef: DeleteMyTeacherProfileRef;

export function deleteMyTeacherProfile(): MutationPromise<DeleteMyTeacherProfileData, undefined>;
export function deleteMyTeacherProfile(dc: DataConnect): MutationPromise<DeleteMyTeacherProfileData, undefined>;

interface GetMyAiCredentialRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyAiCredentialData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyAiCredentialData, undefined>;
  operationName: string;
}
export const getMyAiCredentialRef: GetMyAiCredentialRef;

export function getMyAiCredential(options?: ExecuteQueryOptions): QueryPromise<GetMyAiCredentialData, undefined>;
export function getMyAiCredential(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyAiCredentialData, undefined>;

interface UpsertMyAiCredentialRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyAiCredentialVariables): MutationRef<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyAiCredentialVariables): MutationRef<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;
  operationName: string;
}
export const upsertMyAiCredentialRef: UpsertMyAiCredentialRef;

export function upsertMyAiCredential(vars: UpsertMyAiCredentialVariables): MutationPromise<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;
export function upsertMyAiCredential(dc: DataConnect, vars: UpsertMyAiCredentialVariables): MutationPromise<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;

interface DeleteMyAiCredentialRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyAiCredentialData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteMyAiCredentialData, undefined>;
  operationName: string;
}
export const deleteMyAiCredentialRef: DeleteMyAiCredentialRef;

export function deleteMyAiCredential(): MutationPromise<DeleteMyAiCredentialData, undefined>;
export function deleteMyAiCredential(dc: DataConnect): MutationPromise<DeleteMyAiCredentialData, undefined>;

interface ListActivitiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActivitiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActivitiesData, undefined>;
  operationName: string;
}
export const listActivitiesRef: ListActivitiesRef;

export function listActivities(options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, undefined>;
export function listActivities(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, undefined>;

interface GetTeacherActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherActivityVariables): QueryRef<GetTeacherActivityData, GetTeacherActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeacherActivityVariables): QueryRef<GetTeacherActivityData, GetTeacherActivityVariables>;
  operationName: string;
}
export const getTeacherActivityRef: GetTeacherActivityRef;

export function getTeacherActivity(vars: GetTeacherActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityData, GetTeacherActivityVariables>;
export function getTeacherActivity(dc: DataConnect, vars: GetTeacherActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityData, GetTeacherActivityVariables>;

interface UpsertAiAnalysisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiAnalysisVariables): MutationRef<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAiAnalysisVariables): MutationRef<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;
  operationName: string;
}
export const upsertAiAnalysisRef: UpsertAiAnalysisRef;

export function upsertAiAnalysis(vars: UpsertAiAnalysisVariables): MutationPromise<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;
export function upsertAiAnalysis(dc: DataConnect, vars: UpsertAiAnalysisVariables): MutationPromise<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;

interface GetTeacherActivityResultsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherActivityResultsVariables): QueryRef<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeacherActivityResultsVariables): QueryRef<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;
  operationName: string;
}
export const getTeacherActivityResultsRef: GetTeacherActivityResultsRef;

export function getTeacherActivityResults(vars: GetTeacherActivityResultsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;
export function getTeacherActivityResults(dc: DataConnect, vars: GetTeacherActivityResultsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;

interface SetActivityStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetActivityStatusVariables): MutationRef<SetActivityStatusData, SetActivityStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetActivityStatusVariables): MutationRef<SetActivityStatusData, SetActivityStatusVariables>;
  operationName: string;
}
export const setActivityStatusRef: SetActivityStatusRef;

export function setActivityStatus(vars: SetActivityStatusVariables): MutationPromise<SetActivityStatusData, SetActivityStatusVariables>;
export function setActivityStatus(dc: DataConnect, vars: SetActivityStatusVariables): MutationPromise<SetActivityStatusData, SetActivityStatusVariables>;

interface UpdateThinkingCardTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateThinkingCardTagsVariables): MutationRef<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateThinkingCardTagsVariables): MutationRef<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;
  operationName: string;
}
export const updateThinkingCardTagsRef: UpdateThinkingCardTagsRef;

export function updateThinkingCardTags(vars: UpdateThinkingCardTagsVariables): MutationPromise<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;
export function updateThinkingCardTags(dc: DataConnect, vars: UpdateThinkingCardTagsVariables): MutationPromise<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;

interface SetAiAnalysisVisibilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetAiAnalysisVisibilityVariables): MutationRef<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetAiAnalysisVisibilityVariables): MutationRef<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;
  operationName: string;
}
export const setAiAnalysisVisibilityRef: SetAiAnalysisVisibilityRef;

export function setAiAnalysisVisibility(vars: SetAiAnalysisVisibilityVariables): MutationPromise<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;
export function setAiAnalysisVisibility(dc: DataConnect, vars: SetAiAnalysisVisibilityVariables): MutationPromise<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;

interface LinkStudentAuthRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkStudentAuthVariables): MutationRef<LinkStudentAuthData, LinkStudentAuthVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LinkStudentAuthVariables): MutationRef<LinkStudentAuthData, LinkStudentAuthVariables>;
  operationName: string;
}
export const linkStudentAuthRef: LinkStudentAuthRef;

export function linkStudentAuth(vars: LinkStudentAuthVariables): MutationPromise<LinkStudentAuthData, LinkStudentAuthVariables>;
export function linkStudentAuth(dc: DataConnect, vars: LinkStudentAuthVariables): MutationPromise<LinkStudentAuthData, LinkStudentAuthVariables>;

interface UnlinkStudentAuthRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnlinkStudentAuthVariables): MutationRef<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UnlinkStudentAuthVariables): MutationRef<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;
  operationName: string;
}
export const unlinkStudentAuthRef: UnlinkStudentAuthRef;

export function unlinkStudentAuth(vars: UnlinkStudentAuthVariables): MutationPromise<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;
export function unlinkStudentAuth(dc: DataConnect, vars: UnlinkStudentAuthVariables): MutationPromise<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;

interface UpsertSchoolClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSchoolClassVariables): MutationRef<UpsertSchoolClassData, UpsertSchoolClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertSchoolClassVariables): MutationRef<UpsertSchoolClassData, UpsertSchoolClassVariables>;
  operationName: string;
}
export const upsertSchoolClassRef: UpsertSchoolClassRef;

export function upsertSchoolClass(vars: UpsertSchoolClassVariables): MutationPromise<UpsertSchoolClassData, UpsertSchoolClassVariables>;
export function upsertSchoolClass(dc: DataConnect, vars: UpsertSchoolClassVariables): MutationPromise<UpsertSchoolClassData, UpsertSchoolClassVariables>;

interface GetClassManagementRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetClassManagementData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetClassManagementData, undefined>;
  operationName: string;
}
export const getClassManagementRef: GetClassManagementRef;

export function getClassManagement(options?: ExecuteQueryOptions): QueryPromise<GetClassManagementData, undefined>;
export function getClassManagement(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetClassManagementData, undefined>;

interface RenameSchoolClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameSchoolClassVariables): MutationRef<RenameSchoolClassData, RenameSchoolClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenameSchoolClassVariables): MutationRef<RenameSchoolClassData, RenameSchoolClassVariables>;
  operationName: string;
}
export const renameSchoolClassRef: RenameSchoolClassRef;

export function renameSchoolClass(vars: RenameSchoolClassVariables): MutationPromise<RenameSchoolClassData, RenameSchoolClassVariables>;
export function renameSchoolClass(dc: DataConnect, vars: RenameSchoolClassVariables): MutationPromise<RenameSchoolClassData, RenameSchoolClassVariables>;

interface CreateDefaultGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDefaultGroupVariables): MutationRef<CreateDefaultGroupData, CreateDefaultGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDefaultGroupVariables): MutationRef<CreateDefaultGroupData, CreateDefaultGroupVariables>;
  operationName: string;
}
export const createDefaultGroupRef: CreateDefaultGroupRef;

export function createDefaultGroup(vars: CreateDefaultGroupVariables): MutationPromise<CreateDefaultGroupData, CreateDefaultGroupVariables>;
export function createDefaultGroup(dc: DataConnect, vars: CreateDefaultGroupVariables): MutationPromise<CreateDefaultGroupData, CreateDefaultGroupVariables>;

interface RenameDefaultGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameDefaultGroupVariables): MutationRef<RenameDefaultGroupData, RenameDefaultGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenameDefaultGroupVariables): MutationRef<RenameDefaultGroupData, RenameDefaultGroupVariables>;
  operationName: string;
}
export const renameDefaultGroupRef: RenameDefaultGroupRef;

export function renameDefaultGroup(vars: RenameDefaultGroupVariables): MutationPromise<RenameDefaultGroupData, RenameDefaultGroupVariables>;
export function renameDefaultGroup(dc: DataConnect, vars: RenameDefaultGroupVariables): MutationPromise<RenameDefaultGroupData, RenameDefaultGroupVariables>;

interface DeleteDefaultGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDefaultGroupVariables): MutationRef<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDefaultGroupVariables): MutationRef<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;
  operationName: string;
}
export const deleteDefaultGroupRef: DeleteDefaultGroupRef;

export function deleteDefaultGroup(vars: DeleteDefaultGroupVariables): MutationPromise<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;
export function deleteDefaultGroup(dc: DataConnect, vars: DeleteDefaultGroupVariables): MutationPromise<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;

interface AssignDefaultGroupMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignDefaultGroupMemberVariables): MutationRef<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignDefaultGroupMemberVariables): MutationRef<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;
  operationName: string;
}
export const assignDefaultGroupMemberRef: AssignDefaultGroupMemberRef;

export function assignDefaultGroupMember(vars: AssignDefaultGroupMemberVariables): MutationPromise<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;
export function assignDefaultGroupMember(dc: DataConnect, vars: AssignDefaultGroupMemberVariables): MutationPromise<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;

interface RemoveDefaultGroupMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveDefaultGroupMemberVariables): MutationRef<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveDefaultGroupMemberVariables): MutationRef<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;
  operationName: string;
}
export const removeDefaultGroupMemberRef: RemoveDefaultGroupMemberRef;

export function removeDefaultGroupMember(vars: RemoveDefaultGroupMemberVariables): MutationPromise<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;
export function removeDefaultGroupMember(dc: DataConnect, vars: RemoveDefaultGroupMemberVariables): MutationPromise<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;

interface UpsertStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertStudentVariables): MutationRef<UpsertStudentData, UpsertStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertStudentVariables): MutationRef<UpsertStudentData, UpsertStudentVariables>;
  operationName: string;
}
export const upsertStudentRef: UpsertStudentRef;

export function upsertStudent(vars: UpsertStudentVariables): MutationPromise<UpsertStudentData, UpsertStudentVariables>;
export function upsertStudent(dc: DataConnect, vars: UpsertStudentVariables): MutationPromise<UpsertStudentData, UpsertStudentVariables>;

interface ListMyStudentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyStudentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyStudentsData, undefined>;
  operationName: string;
}
export const listMyStudentsRef: ListMyStudentsRef;

export function listMyStudents(options?: ExecuteQueryOptions): QueryPromise<ListMyStudentsData, undefined>;
export function listMyStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyStudentsData, undefined>;

interface DeleteStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudentVariables): MutationRef<DeleteStudentData, DeleteStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStudentVariables): MutationRef<DeleteStudentData, DeleteStudentVariables>;
  operationName: string;
}
export const deleteStudentRef: DeleteStudentRef;

export function deleteStudent(vars: DeleteStudentVariables): MutationPromise<DeleteStudentData, DeleteStudentVariables>;
export function deleteStudent(dc: DataConnect, vars: DeleteStudentVariables): MutationPromise<DeleteStudentData, DeleteStudentVariables>;

interface UpdateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  operationName: string;
}
export const updateStudentRef: UpdateStudentRef;

export function updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface DeleteSchoolClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSchoolClassVariables): MutationRef<DeleteSchoolClassData, DeleteSchoolClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSchoolClassVariables): MutationRef<DeleteSchoolClassData, DeleteSchoolClassVariables>;
  operationName: string;
}
export const deleteSchoolClassRef: DeleteSchoolClassRef;

export function deleteSchoolClass(vars: DeleteSchoolClassVariables): MutationPromise<DeleteSchoolClassData, DeleteSchoolClassVariables>;
export function deleteSchoolClass(dc: DataConnect, vars: DeleteSchoolClassVariables): MutationPromise<DeleteSchoolClassData, DeleteSchoolClassVariables>;

interface CreateActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
  operationName: string;
}
export const createActivityRef: CreateActivityRef;

export function createActivity(vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;
export function createActivity(dc: DataConnect, vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface DeleteActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
  operationName: string;
}
export const deleteActivityRef: DeleteActivityRef;

export function deleteActivity(vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;
export function deleteActivity(dc: DataConnect, vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface UpsertActivityClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityClassVariables): MutationRef<UpsertActivityClassData, UpsertActivityClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertActivityClassVariables): MutationRef<UpsertActivityClassData, UpsertActivityClassVariables>;
  operationName: string;
}
export const upsertActivityClassRef: UpsertActivityClassRef;

export function upsertActivityClass(vars: UpsertActivityClassVariables): MutationPromise<UpsertActivityClassData, UpsertActivityClassVariables>;
export function upsertActivityClass(dc: DataConnect, vars: UpsertActivityClassVariables): MutationPromise<UpsertActivityClassData, UpsertActivityClassVariables>;

interface UpsertActivityAttendanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityAttendanceVariables): MutationRef<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertActivityAttendanceVariables): MutationRef<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;
  operationName: string;
}
export const upsertActivityAttendanceRef: UpsertActivityAttendanceRef;

export function upsertActivityAttendance(vars: UpsertActivityAttendanceVariables): MutationPromise<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;
export function upsertActivityAttendance(dc: DataConnect, vars: UpsertActivityAttendanceVariables): MutationPromise<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;

interface UpsertActivityGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityGroupVariables): MutationRef<UpsertActivityGroupData, UpsertActivityGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertActivityGroupVariables): MutationRef<UpsertActivityGroupData, UpsertActivityGroupVariables>;
  operationName: string;
}
export const upsertActivityGroupRef: UpsertActivityGroupRef;

export function upsertActivityGroup(vars: UpsertActivityGroupVariables): MutationPromise<UpsertActivityGroupData, UpsertActivityGroupVariables>;
export function upsertActivityGroup(dc: DataConnect, vars: UpsertActivityGroupVariables): MutationPromise<UpsertActivityGroupData, UpsertActivityGroupVariables>;

interface UpsertActivityGroupMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityGroupMemberVariables): MutationRef<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertActivityGroupMemberVariables): MutationRef<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;
  operationName: string;
}
export const upsertActivityGroupMemberRef: UpsertActivityGroupMemberRef;

export function upsertActivityGroupMember(vars: UpsertActivityGroupMemberVariables): MutationPromise<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;
export function upsertActivityGroupMember(dc: DataConnect, vars: UpsertActivityGroupMemberVariables): MutationPromise<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;

interface UpsertIndividualSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertIndividualSubmissionVariables): MutationRef<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertIndividualSubmissionVariables): MutationRef<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;
  operationName: string;
}
export const upsertIndividualSubmissionRef: UpsertIndividualSubmissionRef;

export function upsertIndividualSubmission(vars: UpsertIndividualSubmissionVariables): MutationPromise<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;
export function upsertIndividualSubmission(dc: DataConnect, vars: UpsertIndividualSubmissionVariables): MutationPromise<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;

interface UpsertGroupSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGroupSubmissionVariables): MutationRef<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertGroupSubmissionVariables): MutationRef<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;
  operationName: string;
}
export const upsertGroupSubmissionRef: UpsertGroupSubmissionRef;

export function upsertGroupSubmission(vars: UpsertGroupSubmissionVariables): MutationPromise<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;
export function upsertGroupSubmission(dc: DataConnect, vars: UpsertGroupSubmissionVariables): MutationPromise<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;

interface UpsertGroupSubmissionAgreementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGroupSubmissionAgreementVariables): MutationRef<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertGroupSubmissionAgreementVariables): MutationRef<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;
  operationName: string;
}
export const upsertGroupSubmissionAgreementRef: UpsertGroupSubmissionAgreementRef;

export function upsertGroupSubmissionAgreement(vars: UpsertGroupSubmissionAgreementVariables): MutationPromise<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;
export function upsertGroupSubmissionAgreement(dc: DataConnect, vars: UpsertGroupSubmissionAgreementVariables): MutationPromise<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;

interface FindActivityByCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindActivityByCodeVariables): QueryRef<FindActivityByCodeData, FindActivityByCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FindActivityByCodeVariables): QueryRef<FindActivityByCodeData, FindActivityByCodeVariables>;
  operationName: string;
}
export const findActivityByCodeRef: FindActivityByCodeRef;

export function findActivityByCode(vars: FindActivityByCodeVariables, options?: ExecuteQueryOptions): QueryPromise<FindActivityByCodeData, FindActivityByCodeVariables>;
export function findActivityByCode(dc: DataConnect, vars: FindActivityByCodeVariables, options?: ExecuteQueryOptions): QueryPromise<FindActivityByCodeData, FindActivityByCodeVariables>;

interface GetMyStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStudentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyStudentData, undefined>;
  operationName: string;
}
export const getMyStudentRef: GetMyStudentRef;

export function getMyStudent(options?: ExecuteQueryOptions): QueryPromise<GetMyStudentData, undefined>;
export function getMyStudent(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentData, undefined>;

interface ListMyStudentActivitiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyStudentActivitiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyStudentActivitiesData, undefined>;
  operationName: string;
}
export const listMyStudentActivitiesRef: ListMyStudentActivitiesRef;

export function listMyStudentActivities(options?: ExecuteQueryOptions): QueryPromise<ListMyStudentActivitiesData, undefined>;
export function listMyStudentActivities(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyStudentActivitiesData, undefined>;

interface GetMyStudentActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyStudentActivityVariables): QueryRef<GetMyStudentActivityData, GetMyStudentActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyStudentActivityVariables): QueryRef<GetMyStudentActivityData, GetMyStudentActivityVariables>;
  operationName: string;
}
export const getMyStudentActivityRef: GetMyStudentActivityRef;

export function getMyStudentActivity(vars: GetMyStudentActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentActivityData, GetMyStudentActivityVariables>;
export function getMyStudentActivity(dc: DataConnect, vars: GetMyStudentActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentActivityData, GetMyStudentActivityVariables>;

interface GetMyStudentWorkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyStudentWorkVariables): QueryRef<GetMyStudentWorkData, GetMyStudentWorkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyStudentWorkVariables): QueryRef<GetMyStudentWorkData, GetMyStudentWorkVariables>;
  operationName: string;
}
export const getMyStudentWorkRef: GetMyStudentWorkRef;

export function getMyStudentWork(vars: GetMyStudentWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentWorkData, GetMyStudentWorkVariables>;
export function getMyStudentWork(dc: DataConnect, vars: GetMyStudentWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentWorkData, GetMyStudentWorkVariables>;

interface GetMyGroupWorkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyGroupWorkVariables): QueryRef<GetMyGroupWorkData, GetMyGroupWorkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyGroupWorkVariables): QueryRef<GetMyGroupWorkData, GetMyGroupWorkVariables>;
  operationName: string;
}
export const getMyGroupWorkRef: GetMyGroupWorkRef;

export function getMyGroupWork(vars: GetMyGroupWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyGroupWorkData, GetMyGroupWorkVariables>;
export function getMyGroupWork(dc: DataConnect, vars: GetMyGroupWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyGroupWorkData, GetMyGroupWorkVariables>;

interface UpsertMyThinkingCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyThinkingCardVariables): MutationRef<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyThinkingCardVariables): MutationRef<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;
  operationName: string;
}
export const upsertMyThinkingCardRef: UpsertMyThinkingCardRef;

export function upsertMyThinkingCard(vars: UpsertMyThinkingCardVariables): MutationPromise<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;
export function upsertMyThinkingCard(dc: DataConnect, vars: UpsertMyThinkingCardVariables): MutationPromise<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;

interface DeleteMyThinkingCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyThinkingCardVariables): MutationRef<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyThinkingCardVariables): MutationRef<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;
  operationName: string;
}
export const deleteMyThinkingCardRef: DeleteMyThinkingCardRef;

export function deleteMyThinkingCard(vars: DeleteMyThinkingCardVariables): MutationPromise<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;
export function deleteMyThinkingCard(dc: DataConnect, vars: DeleteMyThinkingCardVariables): MutationPromise<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;

interface SetMyIndividualSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyIndividualSubmissionVariables): MutationRef<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyIndividualSubmissionVariables): MutationRef<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;
  operationName: string;
}
export const setMyIndividualSubmissionRef: SetMyIndividualSubmissionRef;

export function setMyIndividualSubmission(vars: SetMyIndividualSubmissionVariables): MutationPromise<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;
export function setMyIndividualSubmission(dc: DataConnect, vars: SetMyIndividualSubmissionVariables): MutationPromise<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;

interface UpsertMyGroupThinkingCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyGroupThinkingCardVariables): MutationRef<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertMyGroupThinkingCardVariables): MutationRef<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;
  operationName: string;
}
export const upsertMyGroupThinkingCardRef: UpsertMyGroupThinkingCardRef;

export function upsertMyGroupThinkingCard(vars: UpsertMyGroupThinkingCardVariables): MutationPromise<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;
export function upsertMyGroupThinkingCard(dc: DataConnect, vars: UpsertMyGroupThinkingCardVariables): MutationPromise<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;

interface DeleteMyGroupThinkingCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyGroupThinkingCardVariables): MutationRef<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMyGroupThinkingCardVariables): MutationRef<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;
  operationName: string;
}
export const deleteMyGroupThinkingCardRef: DeleteMyGroupThinkingCardRef;

export function deleteMyGroupThinkingCard(vars: DeleteMyGroupThinkingCardVariables): MutationPromise<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;
export function deleteMyGroupThinkingCard(dc: DataConnect, vars: DeleteMyGroupThinkingCardVariables): MutationPromise<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;

interface SetMyGroupAgreementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyGroupAgreementVariables): MutationRef<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyGroupAgreementVariables): MutationRef<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;
  operationName: string;
}
export const setMyGroupAgreementRef: SetMyGroupAgreementRef;

export function setMyGroupAgreement(vars: SetMyGroupAgreementVariables): MutationPromise<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;
export function setMyGroupAgreement(dc: DataConnect, vars: SetMyGroupAgreementVariables): MutationPromise<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;

interface SetMyGroupSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyGroupSubmissionVariables): MutationRef<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMyGroupSubmissionVariables): MutationRef<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
  operationName: string;
}
export const setMyGroupSubmissionRef: SetMyGroupSubmissionRef;

export function setMyGroupSubmission(vars: SetMyGroupSubmissionVariables): MutationPromise<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
export function setMyGroupSubmission(dc: DataConnect, vars: SetMyGroupSubmissionVariables): MutationPromise<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
