const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

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

const SubmissionStatus = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  MODIFIED: "MODIFIED",
}
exports.SubmissionStatus = SubmissionStatus;

const connectorConfig = {
  connector: 'teacher',
  service: 'visible-thinking',
  location: 'asia-northeast3'
};
exports.connectorConfig = connectorConfig;

const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';
exports.listActivitiesRef = listActivitiesRef;

exports.listActivities = function listActivities(dc) {
  return executeQuery(listActivitiesRef(dc));
};

const getActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivity', inputVars);
}
getActivityRef.operationName = 'GetActivity';
exports.getActivityRef = getActivityRef;

exports.getActivity = function getActivity(dcOrVars, vars) {
  return executeQuery(getActivityRef(dcOrVars, vars));
};

const upsertSchoolClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSchoolClass', inputVars);
}
upsertSchoolClassRef.operationName = 'UpsertSchoolClass';
exports.upsertSchoolClassRef = upsertSchoolClassRef;

exports.upsertSchoolClass = function upsertSchoolClass(dcOrVars, vars) {
  return executeMutation(upsertSchoolClassRef(dcOrVars, vars));
};

const upsertStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertStudent', inputVars);
}
upsertStudentRef.operationName = 'UpsertStudent';
exports.upsertStudentRef = upsertStudentRef;

exports.upsertStudent = function upsertStudent(dcOrVars, vars) {
  return executeMutation(upsertStudentRef(dcOrVars, vars));
};

const upsertActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivity', inputVars);
}
upsertActivityRef.operationName = 'UpsertActivity';
exports.upsertActivityRef = upsertActivityRef;

exports.upsertActivity = function upsertActivity(dcOrVars, vars) {
  return executeMutation(upsertActivityRef(dcOrVars, vars));
};

const upsertActivityClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityClass', inputVars);
}
upsertActivityClassRef.operationName = 'UpsertActivityClass';
exports.upsertActivityClassRef = upsertActivityClassRef;

exports.upsertActivityClass = function upsertActivityClass(dcOrVars, vars) {
  return executeMutation(upsertActivityClassRef(dcOrVars, vars));
};

const upsertActivityAttendanceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityAttendance', inputVars);
}
upsertActivityAttendanceRef.operationName = 'UpsertActivityAttendance';
exports.upsertActivityAttendanceRef = upsertActivityAttendanceRef;

exports.upsertActivityAttendance = function upsertActivityAttendance(dcOrVars, vars) {
  return executeMutation(upsertActivityAttendanceRef(dcOrVars, vars));
};

const upsertActivityGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroup', inputVars);
}
upsertActivityGroupRef.operationName = 'UpsertActivityGroup';
exports.upsertActivityGroupRef = upsertActivityGroupRef;

exports.upsertActivityGroup = function upsertActivityGroup(dcOrVars, vars) {
  return executeMutation(upsertActivityGroupRef(dcOrVars, vars));
};

const upsertActivityGroupMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertActivityGroupMember', inputVars);
}
upsertActivityGroupMemberRef.operationName = 'UpsertActivityGroupMember';
exports.upsertActivityGroupMemberRef = upsertActivityGroupMemberRef;

exports.upsertActivityGroupMember = function upsertActivityGroupMember(dcOrVars, vars) {
  return executeMutation(upsertActivityGroupMemberRef(dcOrVars, vars));
};

const upsertIndividualSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertIndividualSubmission', inputVars);
}
upsertIndividualSubmissionRef.operationName = 'UpsertIndividualSubmission';
exports.upsertIndividualSubmissionRef = upsertIndividualSubmissionRef;

exports.upsertIndividualSubmission = function upsertIndividualSubmission(dcOrVars, vars) {
  return executeMutation(upsertIndividualSubmissionRef(dcOrVars, vars));
};

const upsertGroupSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmission', inputVars);
}
upsertGroupSubmissionRef.operationName = 'UpsertGroupSubmission';
exports.upsertGroupSubmissionRef = upsertGroupSubmissionRef;

exports.upsertGroupSubmission = function upsertGroupSubmission(dcOrVars, vars) {
  return executeMutation(upsertGroupSubmissionRef(dcOrVars, vars));
};

const upsertGroupSubmissionAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGroupSubmissionAgreement', inputVars);
}
upsertGroupSubmissionAgreementRef.operationName = 'UpsertGroupSubmissionAgreement';
exports.upsertGroupSubmissionAgreementRef = upsertGroupSubmissionAgreementRef;

exports.upsertGroupSubmissionAgreement = function upsertGroupSubmissionAgreement(dcOrVars, vars) {
  return executeMutation(upsertGroupSubmissionAgreementRef(dcOrVars, vars));
};
