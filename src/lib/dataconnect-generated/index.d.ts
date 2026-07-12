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
  activityDate: DateString;
  submittedCount: number;
  targetCount: number;
}

export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}

export interface DeleteActivityVariables {
  id: string;
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
    updatedAt: TimestampString;
  } & ThinkingCard_Key)[];
  individualSubmissions: ({
    status: SubmissionStatus;
    updatedAt: TimestampString;
  })[];
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
  } & Activity_Key)[];
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

export interface SchoolClass_Key {
  id: string;
  __typename?: 'SchoolClass_Key';
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

