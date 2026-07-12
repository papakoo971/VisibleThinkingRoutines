import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const ActivityMode = {
  INDIVIDUAL: "INDIVIDUAL",
  GROUP: "GROUP",
}

export const ActivityStatus = {
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
}

export const AttendanceStatus = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
}

export const SubmissionStatus = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  MODIFIED: "MODIFIED",
}

export const TeacherOperationMode = {
  CLASS_FIRST: "CLASS_FIRST",
  SUBJECT_FIRST: "SUBJECT_FIRST",
}

export const connectorConfig = {
  connector: 'teacher',
  service: 'visible-thinking',
  location: 'asia-northeast3'
};
export const getMyTeacherProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyTeacherProfile');
}
getMyTeacherProfileRef.operationName = 'GetMyTeacherProfile';

export function getMyTeacherProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyTeacherProfileRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertMyTeacherProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyTeacherProfile', inputVars);
}
upsertMyTeacherProfileRef.operationName = 'UpsertMyTeacherProfile';

export function upsertMyTeacherProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyTeacherProfileRef(dcInstance, inputVars));
}

export const deleteMyTeacherProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyTeacherProfile');
}
deleteMyTeacherProfileRef.operationName = 'DeleteMyTeacherProfile';

export function deleteMyTeacherProfile(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteMyTeacherProfileRef(dcInstance, inputVars));
}

export const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';

export function listActivities(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listActivitiesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivity', inputVars);
}
getActivityRef.operationName = 'GetActivity';

export function getActivity(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSchoolClass', inputVars);
}
upsertSchoolClassRef.operationName = 'UpsertSchoolClass';

export function upsertSchoolClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSchoolClassRef(dcInstance, inputVars));
}

export const upsertStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertStudent', inputVars);
}
upsertStudentRef.operationName = 'UpsertStudent';

export function upsertStudent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertStudentRef(dcInstance, inputVars));
}

export const createActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateActivity', inputVars);
}
createActivityRef.operationName = 'CreateActivity';

export function createActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createActivityRef(dcInstance, inputVars));
}

export const deleteActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteActivity', inputVars);
}
deleteActivityRef.operationName = 'DeleteActivity';

export function deleteActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteActivityRef(dcInstance, inputVars));
}

export const upsertActivityClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityClass', inputVars);
}
upsertActivityClassRef.operationName = 'UpsertActivityClass';

export function upsertActivityClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityClassRef(dcInstance, inputVars));
}

export const upsertActivityAttendanceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityAttendance', inputVars);
}
upsertActivityAttendanceRef.operationName = 'UpsertActivityAttendance';

export function upsertActivityAttendance(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityAttendanceRef(dcInstance, inputVars));
}

export const upsertActivityGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroup', inputVars);
}
upsertActivityGroupRef.operationName = 'UpsertActivityGroup';

export function upsertActivityGroup(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityGroupRef(dcInstance, inputVars));
}

export const upsertActivityGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroupMember', inputVars);
}
upsertActivityGroupMemberRef.operationName = 'UpsertActivityGroupMember';

export function upsertActivityGroupMember(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityGroupMemberRef(dcInstance, inputVars));
}

export const upsertIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertIndividualSubmission', inputVars);
}
upsertIndividualSubmissionRef.operationName = 'UpsertIndividualSubmission';

export function upsertIndividualSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertIndividualSubmissionRef(dcInstance, inputVars));
}

export const upsertGroupSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmission', inputVars);
}
upsertGroupSubmissionRef.operationName = 'UpsertGroupSubmission';

export function upsertGroupSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertGroupSubmissionRef(dcInstance, inputVars));
}

export const upsertGroupSubmissionAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmissionAgreement', inputVars);
}
upsertGroupSubmissionAgreementRef.operationName = 'UpsertGroupSubmissionAgreement';

export function upsertGroupSubmissionAgreement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertGroupSubmissionAgreementRef(dcInstance, inputVars));
}

