import { getVisibleThinkingDataConnect } from "@/lib/firebase-sql-connect";
import type { CreatedActivityStore } from "@/lib/created-activity-store";
import type { CreatedActivityPayload } from "@/lib/local-created-activities";
import { students } from "@/lib/mock-data";
import {
  ActivityMode,
  ActivityStatus,
  AttendanceStatus,
  SubmissionStatus,
  getActivity,
  listActivities,
  upsertActivity,
  upsertActivityAttendance,
  upsertActivityClass,
  upsertActivityGroup,
  upsertActivityGroupMember,
  upsertGroupSubmission,
  upsertGroupSubmissionAgreement,
  upsertIndividualSubmission,
  upsertSchoolClass,
  upsertStudent,
} from "@/lib/dataconnect-generated";

function toActivityMode(mode: CreatedActivityPayload["activity"]["activityMode"]) {
  return mode === "group" ? ActivityMode.GROUP : ActivityMode.INDIVIDUAL;
}

function fromActivityMode(mode: ActivityMode): CreatedActivityPayload["activity"]["activityMode"] {
  return mode === ActivityMode.GROUP ? "group" : "individual";
}

function toActivityStatus(status: CreatedActivityPayload["activity"]["status"]) {
  return status === "closed" ? ActivityStatus.CLOSED : ActivityStatus.ACTIVE;
}

function fromActivityStatus(status: ActivityStatus): CreatedActivityPayload["activity"]["status"] {
  return status === ActivityStatus.CLOSED ? "closed" : "active";
}

function toAttendanceStatus(status: CreatedActivityPayload["activityAttendance"][number]["status"]) {
  return status === "absent" ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT;
}

function fromAttendanceStatus(status: AttendanceStatus): CreatedActivityPayload["activityAttendance"][number]["status"] {
  return status === AttendanceStatus.ABSENT ? "absent" : "present";
}

function toSubmissionStatus(status: string) {
  if (status === "submitted") return SubmissionStatus.SUBMITTED;
  if (status === "modified") return SubmissionStatus.MODIFIED;
  return SubmissionStatus.DRAFT;
}

function fromSubmissionStatus(status: SubmissionStatus) {
  if (status === SubmissionStatus.SUBMITTED) return "submitted";
  if (status === SubmissionStatus.MODIFIED) return "modified";
  return "draft";
}

function classId(className: string) {
  return className;
}

function routesFor(activityId: string) {
  return {
    teacherResults: `/teacher/activities/${activityId}/results`,
    studentEntry: `/student/activities/${activityId}`,
  };
}

function listActivityToPayload(activity: Awaited<ReturnType<typeof listActivities>>["data"]["activities"][number]): CreatedActivityPayload {
  const classes = activity.activityClasses_on_activity.map((item) => item.schoolClass.name);

  return {
    activity: {
      id: activity.id,
      title: activity.title,
      routine: activity.routine,
      activityMode: fromActivityMode(activity.activityMode),
      subject: activity.subject,
      classes,
      status: fromActivityStatus(activity.status),
      code: activity.code,
      materialType: activity.materialType,
      activityDate: activity.activityDate,
      submittedCount: activity.submittedCount,
      targetCount: activity.targetCount,
    },
    activityAttendance: [],
    activityGroups: [],
    groupSubmissions: [],
    individualSubmissions: [],
    routes: routesFor(activity.id),
  };
}

function detailActivityToPayload(activity: NonNullable<Awaited<ReturnType<typeof getActivity>>["data"]["activity"]>): CreatedActivityPayload {
  const classes = activity.activityClasses_on_activity.map((item) => item.schoolClass.name);
  const activityGroups = activity.activityGroups_on_activity.map((group) => ({
    id: group.id,
    activityId: activity.id,
    name: group.name,
    studentIds: group.activityGroupMembers_on_activityGroup.map((member) => member.student.id),
  }));
  const agreementsByGroup = new Map<string, CreatedActivityPayload["groupSubmissions"][number]["agreements"]>();

  for (const agreement of activity.groupSubmissionAgreements_on_activity) {
    const groupId = agreement.activityGroup.id;
    const groupAgreements = agreementsByGroup.get(groupId) ?? [];
    groupAgreements.push({
      activityId: activity.id,
      groupId,
      studentId: agreement.student.id,
      agreed: agreement.agreed,
    });
    agreementsByGroup.set(groupId, groupAgreements);
  }

  return {
    activity: {
      id: activity.id,
      title: activity.title,
      routine: activity.routine,
      activityMode: fromActivityMode(activity.activityMode),
      subject: activity.subject,
      classes,
      status: fromActivityStatus(activity.status),
      code: activity.code,
      materialType: activity.materialType,
      activityDate: activity.activityDate,
      submittedCount: activity.submittedCount,
      targetCount: activity.targetCount,
    },
    activityAttendance: activity.activityAttendances_on_activity.map((attendance) => ({
      activityId: activity.id,
      studentId: attendance.student.id,
      status: fromAttendanceStatus(attendance.status),
    })),
    activityGroups,
    groupSubmissions: activity.groupSubmissions_on_activity.map((submission) => ({
      activityId: activity.id,
      groupId: submission.activityGroup.id,
      status: fromSubmissionStatus(submission.status),
      cards: [],
      agreements: agreementsByGroup.get(submission.activityGroup.id) ?? [],
    })),
    individualSubmissions: activity.individualSubmissions_on_activity.map((submission) => ({
      activityId: activity.id,
      studentId: submission.student.id,
      status: fromSubmissionStatus(submission.status),
      cards: [],
    })),
    routes: routesFor(activity.id),
  };
}

async function upsertPayloadDependencies(payload: CreatedActivityPayload) {
  const dataConnect = getVisibleThinkingDataConnect();
  const studentIds = new Set<string>([
    ...payload.activityAttendance.map((attendance) => attendance.studentId),
    ...payload.activityGroups.flatMap((group) => group.studentIds),
    ...payload.individualSubmissions.map((submission) => submission.studentId),
    ...payload.groupSubmissions.flatMap((submission) => submission.agreements.map((agreement) => agreement.studentId)),
  ]);
  const payloadStudents = students.filter((student) => studentIds.has(student.id));
  const classNames = new Set<string>([
    ...payload.activity.classes,
    ...payloadStudents.map((student) => student.className),
  ]);

  for (const name of classNames) {
    await upsertSchoolClass(dataConnect, { id: classId(name), name });
  }

  for (const student of payloadStudents) {
    await upsertStudent(dataConnect, {
      id: student.id,
      schoolClassId: classId(student.className),
      studentNumber: student.studentNumber,
      name: student.name,
      passwordIssued: student.passwordIssued,
    });
  }

  return dataConnect;
}

export const sqlConnectCreatedActivityStore: CreatedActivityStore = {
  async list() {
    const dataConnect = getVisibleThinkingDataConnect();
    const { data } = await listActivities(dataConnect);
    return data.activities.map(listActivityToPayload);
  },

  async get(activityId) {
    const dataConnect = getVisibleThinkingDataConnect();
    const { data } = await getActivity(dataConnect, { id: activityId });
    return data.activity ? detailActivityToPayload(data.activity) : undefined;
  },

  async upsert(payload) {
    const dataConnect = await upsertPayloadDependencies(payload);
    const { activity } = payload;

    await upsertActivity(dataConnect, {
      id: activity.id,
      title: activity.title,
      routine: activity.routine,
      activityMode: toActivityMode(activity.activityMode),
      subject: activity.subject,
      status: toActivityStatus(activity.status),
      code: activity.code,
      materialType: activity.materialType,
      activityDate: activity.activityDate,
      submittedCount: activity.submittedCount,
      targetCount: activity.targetCount,
    });

    for (const className of activity.classes) {
      await upsertActivityClass(dataConnect, { activityId: activity.id, schoolClassId: classId(className) });
    }

    for (const attendance of payload.activityAttendance) {
      await upsertActivityAttendance(dataConnect, {
        activityId: attendance.activityId,
        studentId: attendance.studentId,
        status: toAttendanceStatus(attendance.status),
      });
    }

    for (const group of payload.activityGroups) {
      await upsertActivityGroup(dataConnect, { id: group.id, activityId: group.activityId, name: group.name });

      for (const studentId of group.studentIds) {
        await upsertActivityGroupMember(dataConnect, { activityGroupId: group.id, studentId });
      }
    }

    for (const submission of payload.individualSubmissions) {
      await upsertIndividualSubmission(dataConnect, {
        activityId: submission.activityId,
        studentId: submission.studentId,
        status: toSubmissionStatus(submission.status),
      });
    }

    for (const submission of payload.groupSubmissions) {
      await upsertGroupSubmission(dataConnect, {
        activityId: submission.activityId,
        activityGroupId: submission.groupId,
        status: toSubmissionStatus(submission.status),
      });

      for (const agreement of submission.agreements) {
        await upsertGroupSubmissionAgreement(dataConnect, {
          activityId: agreement.activityId,
          activityGroupId: agreement.groupId,
          studentId: agreement.studentId,
          agreed: agreement.agreed,
        });
      }
    }

    return payload;
  },

  async remove() {
    throw new Error("SQL Connect activity deletion is not implemented until a generated delete mutation is added.");
  },
};
