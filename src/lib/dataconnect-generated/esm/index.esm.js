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

export const RoutineColumn = {
  SEE: "SEE",
  THINK: "THINK",
  WONDER: "WONDER",
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

export const getMyAiCredentialRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyAiCredential');
}
getMyAiCredentialRef.operationName = 'GetMyAiCredential';

export function getMyAiCredential(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyAiCredentialRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertMyAiCredentialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyAiCredential', inputVars);
}
upsertMyAiCredentialRef.operationName = 'UpsertMyAiCredential';

export function upsertMyAiCredential(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyAiCredentialRef(dcInstance, inputVars));
}

export const deleteMyAiCredentialRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyAiCredential');
}
deleteMyAiCredentialRef.operationName = 'DeleteMyAiCredential';

export function deleteMyAiCredential(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteMyAiCredentialRef(dcInstance, inputVars));
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

export const getTeacherActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeacherActivity', inputVars);
}
getTeacherActivityRef.operationName = 'GetTeacherActivity';

export function getTeacherActivity(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTeacherActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertAiAnalysisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiAnalysis', inputVars);
}
upsertAiAnalysisRef.operationName = 'UpsertAiAnalysis';

export function upsertAiAnalysis(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAiAnalysisRef(dcInstance, inputVars));
}

export const getTeacherActivityResultsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeacherActivityResults', inputVars);
}
getTeacherActivityResultsRef.operationName = 'GetTeacherActivityResults';

export function getTeacherActivityResults(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTeacherActivityResultsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const setActivityStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetActivityStatus', inputVars);
}
setActivityStatusRef.operationName = 'SetActivityStatus';

export function setActivityStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setActivityStatusRef(dcInstance, inputVars));
}

export const updateThinkingCardTagsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateThinkingCardTags', inputVars);
}
updateThinkingCardTagsRef.operationName = 'UpdateThinkingCardTags';

export function updateThinkingCardTags(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateThinkingCardTagsRef(dcInstance, inputVars));
}

export const setAiAnalysisVisibilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetAiAnalysisVisibility', inputVars);
}
setAiAnalysisVisibilityRef.operationName = 'SetAiAnalysisVisibility';

export function setAiAnalysisVisibility(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setAiAnalysisVisibilityRef(dcInstance, inputVars));
}

export const linkStudentAuthRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LinkStudentAuth', inputVars);
}
linkStudentAuthRef.operationName = 'LinkStudentAuth';

export function linkStudentAuth(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(linkStudentAuthRef(dcInstance, inputVars));
}

export const unlinkStudentAuthRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnlinkStudentAuth', inputVars);
}
unlinkStudentAuthRef.operationName = 'UnlinkStudentAuth';

export function unlinkStudentAuth(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(unlinkStudentAuthRef(dcInstance, inputVars));
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

export const getClassManagementRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetClassManagement');
}
getClassManagementRef.operationName = 'GetClassManagement';

export function getClassManagement(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getClassManagementRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const renameSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RenameSchoolClass', inputVars);
}
renameSchoolClassRef.operationName = 'RenameSchoolClass';

export function renameSchoolClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(renameSchoolClassRef(dcInstance, inputVars));
}

export const createDefaultGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDefaultGroup', inputVars);
}
createDefaultGroupRef.operationName = 'CreateDefaultGroup';

export function createDefaultGroup(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createDefaultGroupRef(dcInstance, inputVars));
}

export const renameDefaultGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RenameDefaultGroup', inputVars);
}
renameDefaultGroupRef.operationName = 'RenameDefaultGroup';

export function renameDefaultGroup(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(renameDefaultGroupRef(dcInstance, inputVars));
}

export const deleteDefaultGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteDefaultGroup', inputVars);
}
deleteDefaultGroupRef.operationName = 'DeleteDefaultGroup';

export function deleteDefaultGroup(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteDefaultGroupRef(dcInstance, inputVars));
}

export const assignDefaultGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignDefaultGroupMember', inputVars);
}
assignDefaultGroupMemberRef.operationName = 'AssignDefaultGroupMember';

export function assignDefaultGroupMember(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignDefaultGroupMemberRef(dcInstance, inputVars));
}

export const removeDefaultGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveDefaultGroupMember', inputVars);
}
removeDefaultGroupMemberRef.operationName = 'RemoveDefaultGroupMember';

export function removeDefaultGroupMember(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(removeDefaultGroupMemberRef(dcInstance, inputVars));
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

export const listMyStudentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyStudents');
}
listMyStudentsRef.operationName = 'ListMyStudents';

export function listMyStudents(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyStudentsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const deleteStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteStudent', inputVars);
}
deleteStudentRef.operationName = 'DeleteStudent';

export function deleteStudent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteStudentRef(dcInstance, inputVars));
}

export const deleteSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSchoolClass', inputVars);
}
deleteSchoolClassRef.operationName = 'DeleteSchoolClass';

export function deleteSchoolClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSchoolClassRef(dcInstance, inputVars));
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

export const findActivityByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'FindActivityByCode', inputVars);
}
findActivityByCodeRef.operationName = 'FindActivityByCode';

export function findActivityByCode(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(findActivityByCodeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getMyStudentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudent');
}
getMyStudentRef.operationName = 'GetMyStudent';

export function getMyStudent(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyStudentRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listMyStudentActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyStudentActivities');
}
listMyStudentActivitiesRef.operationName = 'ListMyStudentActivities';

export function listMyStudentActivities(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyStudentActivitiesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getMyStudentActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudentActivity', inputVars);
}
getMyStudentActivityRef.operationName = 'GetMyStudentActivity';

export function getMyStudentActivity(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyStudentActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getMyStudentWorkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudentWork', inputVars);
}
getMyStudentWorkRef.operationName = 'GetMyStudentWork';

export function getMyStudentWork(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyStudentWorkRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const upsertMyThinkingCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyThinkingCard', inputVars);
}
upsertMyThinkingCardRef.operationName = 'UpsertMyThinkingCard';

export function upsertMyThinkingCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyThinkingCardRef(dcInstance, inputVars));
}

export const deleteMyThinkingCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyThinkingCard', inputVars);
}
deleteMyThinkingCardRef.operationName = 'DeleteMyThinkingCard';

export function deleteMyThinkingCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyThinkingCardRef(dcInstance, inputVars));
}

export const setMyIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetMyIndividualSubmission', inputVars);
}
setMyIndividualSubmissionRef.operationName = 'SetMyIndividualSubmission';

export function setMyIndividualSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setMyIndividualSubmissionRef(dcInstance, inputVars));
}
