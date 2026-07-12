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

export enum SubmissionStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  MODIFIED = "MODIFIED",
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

export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}

export interface DeleteActivityVariables {
  id: string;
}

export interface GetActivityData {
  activity?: {
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
          name: string;
          studentNumber: string;
        } & Student_Key;
      })[];
    } & ActivityGroup_Key)[];
    individualSubmissions_on_activity: ({
      status: SubmissionStatus;
      student: {
        id: string;
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
      } & Student_Key;
    })[];
  } & Activity_Key;
}

export interface GetActivityVariables {
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

export interface SchoolClass_Key {
  id: string;
  __typename?: 'SchoolClass_Key';
}

export interface Student_Key {
  id: string;
  __typename?: 'Student_Key';
}

export interface ThinkingCard_Key {
  id: string;
  __typename?: 'ThinkingCard_Key';
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

export interface UpsertActivityData {
  activity_upsert: Activity_Key;
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

export interface UpsertActivityVariables {
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

export interface UpsertSchoolClassData {
  schoolClass_upsert: SchoolClass_Key;
}

export interface UpsertSchoolClassVariables {
  id: string;
  name: string;
}

export interface UpsertStudentData {
  student_upsert: Student_Key;
}

export interface UpsertStudentVariables {
  id: string;
  schoolClassId: string;
  studentNumber: string;
  name: string;
  passwordIssued: boolean;
}

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

interface GetActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
  operationName: string;
}
export const getActivityRef: GetActivityRef;

export function getActivity(vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;
export function getActivity(dc: DataConnect, vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;

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

interface UpsertActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityVariables): MutationRef<UpsertActivityData, UpsertActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertActivityVariables): MutationRef<UpsertActivityData, UpsertActivityVariables>;
  operationName: string;
}
export const upsertActivityRef: UpsertActivityRef;

export function upsertActivity(vars: UpsertActivityVariables): MutationPromise<UpsertActivityData, UpsertActivityVariables>;
export function upsertActivity(dc: DataConnect, vars: UpsertActivityVariables): MutationPromise<UpsertActivityData, UpsertActivityVariables>;

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

