import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

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

export const connectorConfig = {
  connector: 'teacher',
  service: 'visible-thinking',
  location: 'asia-northeast3'
};

export const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';

export function listActivities(dc) {
  return executeQuery(listActivitiesRef(dc));
}

export const getActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivity', inputVars);
}
getActivityRef.operationName = 'GetActivity';

export function getActivity(dcOrVars, vars) {
  return executeQuery(getActivityRef(dcOrVars, vars));
}

export const upsertSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSchoolClass', inputVars);
}
upsertSchoolClassRef.operationName = 'UpsertSchoolClass';

export function upsertSchoolClass(dcOrVars, vars) {
  return executeMutation(upsertSchoolClassRef(dcOrVars, vars));
}

export const upsertStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertStudent', inputVars);
}
upsertStudentRef.operationName = 'UpsertStudent';

export function upsertStudent(dcOrVars, vars) {
  return executeMutation(upsertStudentRef(dcOrVars, vars));
}

export const upsertActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivity', inputVars);
}
upsertActivityRef.operationName = 'UpsertActivity';

export function upsertActivity(dcOrVars, vars) {
  return executeMutation(upsertActivityRef(dcOrVars, vars));
}

export const upsertActivityClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityClass', inputVars);
}
upsertActivityClassRef.operationName = 'UpsertActivityClass';

export function upsertActivityClass(dcOrVars, vars) {
  return executeMutation(upsertActivityClassRef(dcOrVars, vars));
}

export const upsertActivityAttendanceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityAttendance', inputVars);
}
upsertActivityAttendanceRef.operationName = 'UpsertActivityAttendance';

export function upsertActivityAttendance(dcOrVars, vars) {
  return executeMutation(upsertActivityAttendanceRef(dcOrVars, vars));
}

export const upsertActivityGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroup', inputVars);
}
upsertActivityGroupRef.operationName = 'UpsertActivityGroup';

export function upsertActivityGroup(dcOrVars, vars) {
  return executeMutation(upsertActivityGroupRef(dcOrVars, vars));
}

export const upsertActivityGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroupMember', inputVars);
}
upsertActivityGroupMemberRef.operationName = 'UpsertActivityGroupMember';

export function upsertActivityGroupMember(dcOrVars, vars) {
  return executeMutation(upsertActivityGroupMemberRef(dcOrVars, vars));
}

export const upsertIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertIndividualSubmission', inputVars);
}
upsertIndividualSubmissionRef.operationName = 'UpsertIndividualSubmission';

export function upsertIndividualSubmission(dcOrVars, vars) {
  return executeMutation(upsertIndividualSubmissionRef(dcOrVars, vars));
}

export const upsertGroupSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmission', inputVars);
}
upsertGroupSubmissionRef.operationName = 'UpsertGroupSubmission';

export function upsertGroupSubmission(dcOrVars, vars) {
  return executeMutation(upsertGroupSubmissionRef(dcOrVars, vars));
}

export const upsertGroupSubmissionAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmissionAgreement', inputVars);
}
upsertGroupSubmissionAgreementRef.operationName = 'UpsertGroupSubmissionAgreement';

export function upsertGroupSubmissionAgreement(dcOrVars, vars) {
  return executeMutation(upsertGroupSubmissionAgreementRef(dcOrVars, vars));
}

