import { QueryFetchPolicy } from "firebase/data-connect";
import {
  TeacherOperationMode,
  getMyTeacherProfile,
  upsertMyTeacherProfile,
} from "@/lib/dataconnect-generated";
import { getVisibleThinkingDataConnect } from "@/lib/firebase-sql-connect";

export type TeacherProfile = {
  id: string;
  email: string;
  displayName: string;
  operationMode: "class-first" | "subject-first";
};

function fromOperationMode(mode: TeacherOperationMode): TeacherProfile["operationMode"] {
  return mode === TeacherOperationMode.CLASS_FIRST ? "class-first" : "subject-first";
}

export async function fetchMyTeacherProfile(): Promise<TeacherProfile | null> {
  const { data } = await getMyTeacherProfile(getVisibleThinkingDataConnect(), {
    fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
  });
  const profile = data.teacherProfile;

  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    displayName: profile.displayName,
    operationMode: fromOperationMode(profile.operationMode),
  };
}

export async function saveMyTeacherProfile(input: {
  email: string;
  displayName: string;
  operationMode: TeacherProfile["operationMode"];
}) {
  await upsertMyTeacherProfile(getVisibleThinkingDataConnect(), {
    email: input.email,
    displayName: input.displayName,
    operationMode:
      input.operationMode === "class-first"
        ? TeacherOperationMode.CLASS_FIRST
        : TeacherOperationMode.SUBJECT_FIRST,
  });
}
