const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const ActivityMode = {
  INDIVIDUAL: "INDIVIDUAL",
  GROUP: "GROUP",
}
exports.ActivityMode = ActivityMode;

const ActivityStatus = {
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
}
exports.ActivityStatus = ActivityStatus;

const AttendanceStatus = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
}
exports.AttendanceStatus = AttendanceStatus;

const RoutineColumn = {
  SEE: "SEE",
  THINK: "THINK",
  WONDER: "WONDER",
}
exports.RoutineColumn = RoutineColumn;

const SubmissionStatus = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  MODIFIED: "MODIFIED",
}
exports.SubmissionStatus = SubmissionStatus;

const TeacherOperationMode = {
  CLASS_FIRST: "CLASS_FIRST",
  SUBJECT_FIRST: "SUBJECT_FIRST",
}
exports.TeacherOperationMode = TeacherOperationMode;

const connectorConfig = {
  connector: 'teacher',
  service: 'visible-thinking',
  location: 'asia-northeast3'
};
exports.connectorConfig = connectorConfig;

const getMyTeacherProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyTeacherProfile');
}
getMyTeacherProfileRef.operationName = 'GetMyTeacherProfile';
exports.getMyTeacherProfileRef = getMyTeacherProfileRef;

exports.getMyTeacherProfile = function getMyTeacherProfile(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyTeacherProfileRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertMyTeacherProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyTeacherProfile', inputVars);
}
upsertMyTeacherProfileRef.operationName = 'UpsertMyTeacherProfile';
exports.upsertMyTeacherProfileRef = upsertMyTeacherProfileRef;

exports.upsertMyTeacherProfile = function upsertMyTeacherProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyTeacherProfileRef(dcInstance, inputVars));
}
;

const deleteMyTeacherProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyTeacherProfile');
}
deleteMyTeacherProfileRef.operationName = 'DeleteMyTeacherProfile';
exports.deleteMyTeacherProfileRef = deleteMyTeacherProfileRef;

exports.deleteMyTeacherProfile = function deleteMyTeacherProfile(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteMyTeacherProfileRef(dcInstance, inputVars));
}
;

const getMyAiCredentialRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyAiCredential');
}
getMyAiCredentialRef.operationName = 'GetMyAiCredential';
exports.getMyAiCredentialRef = getMyAiCredentialRef;

exports.getMyAiCredential = function getMyAiCredential(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyAiCredentialRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertMyAiCredentialRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyAiCredential', inputVars);
}
upsertMyAiCredentialRef.operationName = 'UpsertMyAiCredential';
exports.upsertMyAiCredentialRef = upsertMyAiCredentialRef;

exports.upsertMyAiCredential = function upsertMyAiCredential(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyAiCredentialRef(dcInstance, inputVars));
}
;

const deleteMyAiCredentialRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyAiCredential');
}
deleteMyAiCredentialRef.operationName = 'DeleteMyAiCredential';
exports.deleteMyAiCredentialRef = deleteMyAiCredentialRef;

exports.deleteMyAiCredential = function deleteMyAiCredential(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteMyAiCredentialRef(dcInstance, inputVars));
}
;

const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';
exports.listActivitiesRef = listActivitiesRef;

exports.listActivities = function listActivities(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listActivitiesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getTeacherActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeacherActivity', inputVars);
}
getTeacherActivityRef.operationName = 'GetTeacherActivity';
exports.getTeacherActivityRef = getTeacherActivityRef;

exports.getTeacherActivity = function getTeacherActivity(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTeacherActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertAiAnalysisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiAnalysis', inputVars);
}
upsertAiAnalysisRef.operationName = 'UpsertAiAnalysis';
exports.upsertAiAnalysisRef = upsertAiAnalysisRef;

exports.upsertAiAnalysis = function upsertAiAnalysis(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAiAnalysisRef(dcInstance, inputVars));
}
;

const getTeacherActivityResultsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeacherActivityResults', inputVars);
}
getTeacherActivityResultsRef.operationName = 'GetTeacherActivityResults';
exports.getTeacherActivityResultsRef = getTeacherActivityResultsRef;

exports.getTeacherActivityResults = function getTeacherActivityResults(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTeacherActivityResultsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const setActivityStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetActivityStatus', inputVars);
}
setActivityStatusRef.operationName = 'SetActivityStatus';
exports.setActivityStatusRef = setActivityStatusRef;

exports.setActivityStatus = function setActivityStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setActivityStatusRef(dcInstance, inputVars));
}
;

const updateThinkingCardTagsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateThinkingCardTags', inputVars);
}
updateThinkingCardTagsRef.operationName = 'UpdateThinkingCardTags';
exports.updateThinkingCardTagsRef = updateThinkingCardTagsRef;

exports.updateThinkingCardTags = function updateThinkingCardTags(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateThinkingCardTagsRef(dcInstance, inputVars));
}
;

const setAiAnalysisVisibilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetAiAnalysisVisibility', inputVars);
}
setAiAnalysisVisibilityRef.operationName = 'SetAiAnalysisVisibility';
exports.setAiAnalysisVisibilityRef = setAiAnalysisVisibilityRef;

exports.setAiAnalysisVisibility = function setAiAnalysisVisibility(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setAiAnalysisVisibilityRef(dcInstance, inputVars));
}
;

const linkStudentAuthRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LinkStudentAuth', inputVars);
}
linkStudentAuthRef.operationName = 'LinkStudentAuth';
exports.linkStudentAuthRef = linkStudentAuthRef;

exports.linkStudentAuth = function linkStudentAuth(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(linkStudentAuthRef(dcInstance, inputVars));
}
;

const unlinkStudentAuthRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnlinkStudentAuth', inputVars);
}
unlinkStudentAuthRef.operationName = 'UnlinkStudentAuth';
exports.unlinkStudentAuthRef = unlinkStudentAuthRef;

exports.unlinkStudentAuth = function unlinkStudentAuth(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(unlinkStudentAuthRef(dcInstance, inputVars));
}
;

const upsertSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSchoolClass', inputVars);
}
upsertSchoolClassRef.operationName = 'UpsertSchoolClass';
exports.upsertSchoolClassRef = upsertSchoolClassRef;

exports.upsertSchoolClass = function upsertSchoolClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSchoolClassRef(dcInstance, inputVars));
}
;

const upsertStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertStudent', inputVars);
}
upsertStudentRef.operationName = 'UpsertStudent';
exports.upsertStudentRef = upsertStudentRef;

exports.upsertStudent = function upsertStudent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertStudentRef(dcInstance, inputVars));
}
;

const listMyStudentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyStudents');
}
listMyStudentsRef.operationName = 'ListMyStudents';
exports.listMyStudentsRef = listMyStudentsRef;

exports.listMyStudents = function listMyStudents(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyStudentsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const deleteStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteStudent', inputVars);
}
deleteStudentRef.operationName = 'DeleteStudent';
exports.deleteStudentRef = deleteStudentRef;

exports.deleteStudent = function deleteStudent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteStudentRef(dcInstance, inputVars));
}
;

const deleteSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSchoolClass', inputVars);
}
deleteSchoolClassRef.operationName = 'DeleteSchoolClass';
exports.deleteSchoolClassRef = deleteSchoolClassRef;

exports.deleteSchoolClass = function deleteSchoolClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSchoolClassRef(dcInstance, inputVars));
}
;

const createActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateActivity', inputVars);
}
createActivityRef.operationName = 'CreateActivity';
exports.createActivityRef = createActivityRef;

exports.createActivity = function createActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createActivityRef(dcInstance, inputVars));
}
;

const deleteActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteActivity', inputVars);
}
deleteActivityRef.operationName = 'DeleteActivity';
exports.deleteActivityRef = deleteActivityRef;

exports.deleteActivity = function deleteActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteActivityRef(dcInstance, inputVars));
}
;

const upsertActivityClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityClass', inputVars);
}
upsertActivityClassRef.operationName = 'UpsertActivityClass';
exports.upsertActivityClassRef = upsertActivityClassRef;

exports.upsertActivityClass = function upsertActivityClass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityClassRef(dcInstance, inputVars));
}
;

const upsertActivityAttendanceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityAttendance', inputVars);
}
upsertActivityAttendanceRef.operationName = 'UpsertActivityAttendance';
exports.upsertActivityAttendanceRef = upsertActivityAttendanceRef;

exports.upsertActivityAttendance = function upsertActivityAttendance(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityAttendanceRef(dcInstance, inputVars));
}
;

const upsertActivityGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroup', inputVars);
}
upsertActivityGroupRef.operationName = 'UpsertActivityGroup';
exports.upsertActivityGroupRef = upsertActivityGroupRef;

exports.upsertActivityGroup = function upsertActivityGroup(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityGroupRef(dcInstance, inputVars));
}
;

const upsertActivityGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroupMember', inputVars);
}
upsertActivityGroupMemberRef.operationName = 'UpsertActivityGroupMember';
exports.upsertActivityGroupMemberRef = upsertActivityGroupMemberRef;

exports.upsertActivityGroupMember = function upsertActivityGroupMember(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertActivityGroupMemberRef(dcInstance, inputVars));
}
;

const upsertIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertIndividualSubmission', inputVars);
}
upsertIndividualSubmissionRef.operationName = 'UpsertIndividualSubmission';
exports.upsertIndividualSubmissionRef = upsertIndividualSubmissionRef;

exports.upsertIndividualSubmission = function upsertIndividualSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertIndividualSubmissionRef(dcInstance, inputVars));
}
;

const upsertGroupSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmission', inputVars);
}
upsertGroupSubmissionRef.operationName = 'UpsertGroupSubmission';
exports.upsertGroupSubmissionRef = upsertGroupSubmissionRef;

exports.upsertGroupSubmission = function upsertGroupSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertGroupSubmissionRef(dcInstance, inputVars));
}
;

const upsertGroupSubmissionAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmissionAgreement', inputVars);
}
upsertGroupSubmissionAgreementRef.operationName = 'UpsertGroupSubmissionAgreement';
exports.upsertGroupSubmissionAgreementRef = upsertGroupSubmissionAgreementRef;

exports.upsertGroupSubmissionAgreement = function upsertGroupSubmissionAgreement(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertGroupSubmissionAgreementRef(dcInstance, inputVars));
}
;

const findActivityByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'FindActivityByCode', inputVars);
}
findActivityByCodeRef.operationName = 'FindActivityByCode';
exports.findActivityByCodeRef = findActivityByCodeRef;

exports.findActivityByCode = function findActivityByCode(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(findActivityByCodeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyStudentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudent');
}
getMyStudentRef.operationName = 'GetMyStudent';
exports.getMyStudentRef = getMyStudentRef;

exports.getMyStudent = function getMyStudent(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyStudentRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listMyStudentActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyStudentActivities');
}
listMyStudentActivitiesRef.operationName = 'ListMyStudentActivities';
exports.listMyStudentActivitiesRef = listMyStudentActivitiesRef;

exports.listMyStudentActivities = function listMyStudentActivities(dcOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMyStudentActivitiesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyStudentActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudentActivity', inputVars);
}
getMyStudentActivityRef.operationName = 'GetMyStudentActivity';
exports.getMyStudentActivityRef = getMyStudentActivityRef;

exports.getMyStudentActivity = function getMyStudentActivity(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyStudentActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyStudentWorkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStudentWork', inputVars);
}
getMyStudentWorkRef.operationName = 'GetMyStudentWork';
exports.getMyStudentWorkRef = getMyStudentWorkRef;

exports.getMyStudentWork = function getMyStudentWork(dcOrVars, varsOrOptions, options) {

  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyStudentWorkRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const upsertMyThinkingCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertMyThinkingCard', inputVars);
}
upsertMyThinkingCardRef.operationName = 'UpsertMyThinkingCard';
exports.upsertMyThinkingCardRef = upsertMyThinkingCardRef;

exports.upsertMyThinkingCard = function upsertMyThinkingCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertMyThinkingCardRef(dcInstance, inputVars));
}
;

const deleteMyThinkingCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMyThinkingCard', inputVars);
}
deleteMyThinkingCardRef.operationName = 'DeleteMyThinkingCard';
exports.deleteMyThinkingCardRef = deleteMyThinkingCardRef;

exports.deleteMyThinkingCard = function deleteMyThinkingCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMyThinkingCardRef(dcInstance, inputVars));
}
;

const setMyIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetMyIndividualSubmission', inputVars);
}
setMyIndividualSubmissionRef.operationName = 'SetMyIndividualSubmission';
exports.setMyIndividualSubmissionRef = setMyIndividualSubmissionRef;

exports.setMyIndividualSubmission = function setMyIndividualSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setMyIndividualSubmissionRef(dcInstance, inputVars));
}
;
