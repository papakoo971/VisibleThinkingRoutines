# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `teacher`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyTeacherProfile*](#getmyteacherprofile)
  - [*GetMyAiCredential*](#getmyaicredential)
  - [*ListActivities*](#listactivities)
  - [*GetTeacherActivity*](#getteacheractivity)
  - [*GetTeacherActivityResults*](#getteacheractivityresults)
  - [*GetClassManagement*](#getclassmanagement)
  - [*ListMyStudents*](#listmystudents)
  - [*FindActivityByCode*](#findactivitybycode)
  - [*GetMyStudent*](#getmystudent)
  - [*ListMyStudentActivities*](#listmystudentactivities)
  - [*GetMyStudentActivity*](#getmystudentactivity)
  - [*GetMyStudentWork*](#getmystudentwork)
  - [*GetMyGroupWork*](#getmygroupwork)
- [**Mutations**](#mutations)
  - [*UpsertMyTeacherProfile*](#upsertmyteacherprofile)
  - [*DeleteMyTeacherProfile*](#deletemyteacherprofile)
  - [*UpsertMyAiCredential*](#upsertmyaicredential)
  - [*DeleteMyAiCredential*](#deletemyaicredential)
  - [*UpsertAiAnalysis*](#upsertaianalysis)
  - [*SetActivityStatus*](#setactivitystatus)
  - [*UpdateThinkingCardTags*](#updatethinkingcardtags)
  - [*SetAiAnalysisVisibility*](#setaianalysisvisibility)
  - [*LinkStudentAuth*](#linkstudentauth)
  - [*UnlinkStudentAuth*](#unlinkstudentauth)
  - [*UpsertSchoolClass*](#upsertschoolclass)
  - [*RenameSchoolClass*](#renameschoolclass)
  - [*CreateDefaultGroup*](#createdefaultgroup)
  - [*RenameDefaultGroup*](#renamedefaultgroup)
  - [*DeleteDefaultGroup*](#deletedefaultgroup)
  - [*AssignDefaultGroupMember*](#assigndefaultgroupmember)
  - [*RemoveDefaultGroupMember*](#removedefaultgroupmember)
  - [*UpsertStudent*](#upsertstudent)
  - [*DeleteStudent*](#deletestudent)
  - [*UpdateStudent*](#updatestudent)
  - [*DeleteSchoolClass*](#deleteschoolclass)
  - [*CreateActivity*](#createactivity)
  - [*DeleteActivity*](#deleteactivity)
  - [*UpsertActivityClass*](#upsertactivityclass)
  - [*UpsertActivityAttendance*](#upsertactivityattendance)
  - [*UpsertActivityGroup*](#upsertactivitygroup)
  - [*UpsertActivityGroupMember*](#upsertactivitygroupmember)
  - [*UpsertIndividualSubmission*](#upsertindividualsubmission)
  - [*UpsertGroupSubmission*](#upsertgroupsubmission)
  - [*UpsertGroupSubmissionAgreement*](#upsertgroupsubmissionagreement)
  - [*UpsertMyThinkingCard*](#upsertmythinkingcard)
  - [*DeleteMyThinkingCard*](#deletemythinkingcard)
  - [*SetMyIndividualSubmission*](#setmyindividualsubmission)
  - [*UpsertMyGroupThinkingCard*](#upsertmygroupthinkingcard)
  - [*DeleteMyGroupThinkingCard*](#deletemygroupthinkingcard)
  - [*SetMyGroupAgreement*](#setmygroupagreement)
  - [*SetMyGroupSubmission*](#setmygroupsubmission)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `teacher`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@visible-thinking/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@visible-thinking/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@visible-thinking/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `teacher` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyTeacherProfile
You can execute the `GetMyTeacherProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyTeacherProfile(options?: ExecuteQueryOptions): QueryPromise<GetMyTeacherProfileData, undefined>;

interface GetMyTeacherProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyTeacherProfileData, undefined>;
}
export const getMyTeacherProfileRef: GetMyTeacherProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyTeacherProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyTeacherProfileData, undefined>;

interface GetMyTeacherProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetMyTeacherProfileData, undefined>;
}
export const getMyTeacherProfileRef: GetMyTeacherProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyTeacherProfileRef:
```typescript
const name = getMyTeacherProfileRef.operationName;
console.log(name);
```

### Variables
The `GetMyTeacherProfile` query has no variables.
### Return Type
Recall that executing the `GetMyTeacherProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyTeacherProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyTeacherProfileData {
  teacherProfile?: {
    id: string;
    email: string;
    displayName: string;
    operationMode: TeacherOperationMode;
  } & TeacherProfile_Key;
}
```
### Using `GetMyTeacherProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyTeacherProfile } from '@visible-thinking/dataconnect';


// Call the `getMyTeacherProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyTeacherProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyTeacherProfile(dataConnect);

console.log(data.teacherProfile);

// Or, you can use the `Promise` API.
getMyTeacherProfile().then((response) => {
  const data = response.data;
  console.log(data.teacherProfile);
});
```

### Using `GetMyTeacherProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyTeacherProfileRef } from '@visible-thinking/dataconnect';


// Call the `getMyTeacherProfileRef()` function to get a reference to the query.
const ref = getMyTeacherProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyTeacherProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teacherProfile);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherProfile);
});
```

## GetMyAiCredential
You can execute the `GetMyAiCredential` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyAiCredential(options?: ExecuteQueryOptions): QueryPromise<GetMyAiCredentialData, undefined>;

interface GetMyAiCredentialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyAiCredentialData, undefined>;
}
export const getMyAiCredentialRef: GetMyAiCredentialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyAiCredential(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyAiCredentialData, undefined>;

interface GetMyAiCredentialRef {
  ...
  (dc: DataConnect): QueryRef<GetMyAiCredentialData, undefined>;
}
export const getMyAiCredentialRef: GetMyAiCredentialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyAiCredentialRef:
```typescript
const name = getMyAiCredentialRef.operationName;
console.log(name);
```

### Variables
The `GetMyAiCredential` query has no variables.
### Return Type
Recall that executing the `GetMyAiCredential` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyAiCredentialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyAiCredential`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyAiCredential } from '@visible-thinking/dataconnect';


// Call the `getMyAiCredential()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyAiCredential();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyAiCredential(dataConnect);

console.log(data.teacherAiCredential);

// Or, you can use the `Promise` API.
getMyAiCredential().then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential);
});
```

### Using `GetMyAiCredential`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyAiCredentialRef } from '@visible-thinking/dataconnect';


// Call the `getMyAiCredentialRef()` function to get a reference to the query.
const ref = getMyAiCredentialRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyAiCredentialRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teacherAiCredential);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential);
});
```

## ListActivities
You can execute the `ListActivities` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listActivities(options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, undefined>;

interface ListActivitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActivitiesData, undefined>;
}
export const listActivitiesRef: ListActivitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActivities(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, undefined>;

interface ListActivitiesRef {
  ...
  (dc: DataConnect): QueryRef<ListActivitiesData, undefined>;
}
export const listActivitiesRef: ListActivitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActivitiesRef:
```typescript
const name = listActivitiesRef.operationName;
console.log(name);
```

### Variables
The `ListActivities` query has no variables.
### Return Type
Recall that executing the `ListActivities` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActivitiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListActivities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActivities } from '@visible-thinking/dataconnect';


// Call the `listActivities()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActivities();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActivities(dataConnect);

console.log(data.activities);

// Or, you can use the `Promise` API.
listActivities().then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `ListActivities`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActivitiesRef } from '@visible-thinking/dataconnect';


// Call the `listActivitiesRef()` function to get a reference to the query.
const ref = listActivitiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActivitiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## GetTeacherActivity
You can execute the `GetTeacherActivity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTeacherActivity(vars: GetTeacherActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityData, GetTeacherActivityVariables>;

interface GetTeacherActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherActivityVariables): QueryRef<GetTeacherActivityData, GetTeacherActivityVariables>;
}
export const getTeacherActivityRef: GetTeacherActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeacherActivity(dc: DataConnect, vars: GetTeacherActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityData, GetTeacherActivityVariables>;

interface GetTeacherActivityRef {
  ...
  (dc: DataConnect, vars: GetTeacherActivityVariables): QueryRef<GetTeacherActivityData, GetTeacherActivityVariables>;
}
export const getTeacherActivityRef: GetTeacherActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeacherActivityRef:
```typescript
const name = getTeacherActivityRef.operationName;
console.log(name);
```

### Variables
The `GetTeacherActivity` query requires an argument of type `GetTeacherActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeacherActivityVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetTeacherActivity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeacherActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTeacherActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeacherActivity, GetTeacherActivityVariables } from '@visible-thinking/dataconnect';

// The `GetTeacherActivity` query requires an argument of type `GetTeacherActivityVariables`:
const getTeacherActivityVars: GetTeacherActivityVariables = {
  id: ...,
};

// Call the `getTeacherActivity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeacherActivity(getTeacherActivityVars);
// Variables can be defined inline as well.
const { data } = await getTeacherActivity({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeacherActivity(dataConnect, getTeacherActivityVars);

console.log(data.activities);

// Or, you can use the `Promise` API.
getTeacherActivity(getTeacherActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `GetTeacherActivity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeacherActivityRef, GetTeacherActivityVariables } from '@visible-thinking/dataconnect';

// The `GetTeacherActivity` query requires an argument of type `GetTeacherActivityVariables`:
const getTeacherActivityVars: GetTeacherActivityVariables = {
  id: ...,
};

// Call the `getTeacherActivityRef()` function to get a reference to the query.
const ref = getTeacherActivityRef(getTeacherActivityVars);
// Variables can be defined inline as well.
const ref = getTeacherActivityRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeacherActivityRef(dataConnect, getTeacherActivityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## GetTeacherActivityResults
You can execute the `GetTeacherActivityResults` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTeacherActivityResults(vars: GetTeacherActivityResultsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;

interface GetTeacherActivityResultsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherActivityResultsVariables): QueryRef<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;
}
export const getTeacherActivityResultsRef: GetTeacherActivityResultsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeacherActivityResults(dc: DataConnect, vars: GetTeacherActivityResultsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;

interface GetTeacherActivityResultsRef {
  ...
  (dc: DataConnect, vars: GetTeacherActivityResultsVariables): QueryRef<GetTeacherActivityResultsData, GetTeacherActivityResultsVariables>;
}
export const getTeacherActivityResultsRef: GetTeacherActivityResultsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeacherActivityResultsRef:
```typescript
const name = getTeacherActivityResultsRef.operationName;
console.log(name);
```

### Variables
The `GetTeacherActivityResults` query requires an argument of type `GetTeacherActivityResultsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeacherActivityResultsVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetTeacherActivityResults` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeacherActivityResultsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTeacherActivityResults`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeacherActivityResults, GetTeacherActivityResultsVariables } from '@visible-thinking/dataconnect';

// The `GetTeacherActivityResults` query requires an argument of type `GetTeacherActivityResultsVariables`:
const getTeacherActivityResultsVars: GetTeacherActivityResultsVariables = {
  id: ...,
};

// Call the `getTeacherActivityResults()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeacherActivityResults(getTeacherActivityResultsVars);
// Variables can be defined inline as well.
const { data } = await getTeacherActivityResults({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeacherActivityResults(dataConnect, getTeacherActivityResultsVars);

console.log(data.activities);

// Or, you can use the `Promise` API.
getTeacherActivityResults(getTeacherActivityResultsVars).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `GetTeacherActivityResults`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeacherActivityResultsRef, GetTeacherActivityResultsVariables } from '@visible-thinking/dataconnect';

// The `GetTeacherActivityResults` query requires an argument of type `GetTeacherActivityResultsVariables`:
const getTeacherActivityResultsVars: GetTeacherActivityResultsVariables = {
  id: ...,
};

// Call the `getTeacherActivityResultsRef()` function to get a reference to the query.
const ref = getTeacherActivityResultsRef(getTeacherActivityResultsVars);
// Variables can be defined inline as well.
const ref = getTeacherActivityResultsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeacherActivityResultsRef(dataConnect, getTeacherActivityResultsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## GetClassManagement
You can execute the `GetClassManagement` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getClassManagement(options?: ExecuteQueryOptions): QueryPromise<GetClassManagementData, undefined>;

interface GetClassManagementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetClassManagementData, undefined>;
}
export const getClassManagementRef: GetClassManagementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClassManagement(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetClassManagementData, undefined>;

interface GetClassManagementRef {
  ...
  (dc: DataConnect): QueryRef<GetClassManagementData, undefined>;
}
export const getClassManagementRef: GetClassManagementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClassManagementRef:
```typescript
const name = getClassManagementRef.operationName;
console.log(name);
```

### Variables
The `GetClassManagement` query has no variables.
### Return Type
Recall that executing the `GetClassManagement` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClassManagementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetClassManagement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClassManagement } from '@visible-thinking/dataconnect';


// Call the `getClassManagement()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClassManagement();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClassManagement(dataConnect);

console.log(data.schoolClasses);
console.log(data.students);
console.log(data.defaultGroups);

// Or, you can use the `Promise` API.
getClassManagement().then((response) => {
  const data = response.data;
  console.log(data.schoolClasses);
  console.log(data.students);
  console.log(data.defaultGroups);
});
```

### Using `GetClassManagement`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClassManagementRef } from '@visible-thinking/dataconnect';


// Call the `getClassManagementRef()` function to get a reference to the query.
const ref = getClassManagementRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClassManagementRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.schoolClasses);
console.log(data.students);
console.log(data.defaultGroups);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.schoolClasses);
  console.log(data.students);
  console.log(data.defaultGroups);
});
```

## ListMyStudents
You can execute the `ListMyStudents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyStudents(options?: ExecuteQueryOptions): QueryPromise<ListMyStudentsData, undefined>;

interface ListMyStudentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyStudentsData, undefined>;
}
export const listMyStudentsRef: ListMyStudentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyStudentsData, undefined>;

interface ListMyStudentsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyStudentsData, undefined>;
}
export const listMyStudentsRef: ListMyStudentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyStudentsRef:
```typescript
const name = listMyStudentsRef.operationName;
console.log(name);
```

### Variables
The `ListMyStudents` query has no variables.
### Return Type
Recall that executing the `ListMyStudents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyStudentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyStudents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyStudents } from '@visible-thinking/dataconnect';


// Call the `listMyStudents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyStudents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyStudents(dataConnect);

console.log(data.students);

// Or, you can use the `Promise` API.
listMyStudents().then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `ListMyStudents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyStudentsRef } from '@visible-thinking/dataconnect';


// Call the `listMyStudentsRef()` function to get a reference to the query.
const ref = listMyStudentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyStudentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## FindActivityByCode
You can execute the `FindActivityByCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
findActivityByCode(vars: FindActivityByCodeVariables, options?: ExecuteQueryOptions): QueryPromise<FindActivityByCodeData, FindActivityByCodeVariables>;

interface FindActivityByCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindActivityByCodeVariables): QueryRef<FindActivityByCodeData, FindActivityByCodeVariables>;
}
export const findActivityByCodeRef: FindActivityByCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
findActivityByCode(dc: DataConnect, vars: FindActivityByCodeVariables, options?: ExecuteQueryOptions): QueryPromise<FindActivityByCodeData, FindActivityByCodeVariables>;

interface FindActivityByCodeRef {
  ...
  (dc: DataConnect, vars: FindActivityByCodeVariables): QueryRef<FindActivityByCodeData, FindActivityByCodeVariables>;
}
export const findActivityByCodeRef: FindActivityByCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the findActivityByCodeRef:
```typescript
const name = findActivityByCodeRef.operationName;
console.log(name);
```

### Variables
The `FindActivityByCode` query requires an argument of type `FindActivityByCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FindActivityByCodeVariables {
  code: string;
}
```
### Return Type
Recall that executing the `FindActivityByCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FindActivityByCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FindActivityByCodeData {
  activities: ({
    id: string;
  } & Activity_Key)[];
}
```
### Using `FindActivityByCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, findActivityByCode, FindActivityByCodeVariables } from '@visible-thinking/dataconnect';

// The `FindActivityByCode` query requires an argument of type `FindActivityByCodeVariables`:
const findActivityByCodeVars: FindActivityByCodeVariables = {
  code: ...,
};

// Call the `findActivityByCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await findActivityByCode(findActivityByCodeVars);
// Variables can be defined inline as well.
const { data } = await findActivityByCode({ code: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await findActivityByCode(dataConnect, findActivityByCodeVars);

console.log(data.activities);

// Or, you can use the `Promise` API.
findActivityByCode(findActivityByCodeVars).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `FindActivityByCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, findActivityByCodeRef, FindActivityByCodeVariables } from '@visible-thinking/dataconnect';

// The `FindActivityByCode` query requires an argument of type `FindActivityByCodeVariables`:
const findActivityByCodeVars: FindActivityByCodeVariables = {
  code: ...,
};

// Call the `findActivityByCodeRef()` function to get a reference to the query.
const ref = findActivityByCodeRef(findActivityByCodeVars);
// Variables can be defined inline as well.
const ref = findActivityByCodeRef({ code: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = findActivityByCodeRef(dataConnect, findActivityByCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## GetMyStudent
You can execute the `GetMyStudent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyStudent(options?: ExecuteQueryOptions): QueryPromise<GetMyStudentData, undefined>;

interface GetMyStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStudentData, undefined>;
}
export const getMyStudentRef: GetMyStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyStudent(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentData, undefined>;

interface GetMyStudentRef {
  ...
  (dc: DataConnect): QueryRef<GetMyStudentData, undefined>;
}
export const getMyStudentRef: GetMyStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyStudentRef:
```typescript
const name = getMyStudentRef.operationName;
console.log(name);
```

### Variables
The `GetMyStudent` query has no variables.
### Return Type
Recall that executing the `GetMyStudent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyStudent } from '@visible-thinking/dataconnect';


// Call the `getMyStudent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyStudent();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyStudent(dataConnect);

console.log(data.students);

// Or, you can use the `Promise` API.
getMyStudent().then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `GetMyStudent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyStudentRef } from '@visible-thinking/dataconnect';


// Call the `getMyStudentRef()` function to get a reference to the query.
const ref = getMyStudentRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyStudentRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## ListMyStudentActivities
You can execute the `ListMyStudentActivities` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyStudentActivities(options?: ExecuteQueryOptions): QueryPromise<ListMyStudentActivitiesData, undefined>;

interface ListMyStudentActivitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyStudentActivitiesData, undefined>;
}
export const listMyStudentActivitiesRef: ListMyStudentActivitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyStudentActivities(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyStudentActivitiesData, undefined>;

interface ListMyStudentActivitiesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyStudentActivitiesData, undefined>;
}
export const listMyStudentActivitiesRef: ListMyStudentActivitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyStudentActivitiesRef:
```typescript
const name = listMyStudentActivitiesRef.operationName;
console.log(name);
```

### Variables
The `ListMyStudentActivities` query has no variables.
### Return Type
Recall that executing the `ListMyStudentActivities` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyStudentActivitiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyStudentActivities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyStudentActivities } from '@visible-thinking/dataconnect';


// Call the `listMyStudentActivities()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyStudentActivities();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyStudentActivities(dataConnect);

console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
listMyStudentActivities().then((response) => {
  const data = response.data;
  console.log(data.activityAttendances);
});
```

### Using `ListMyStudentActivities`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyStudentActivitiesRef } from '@visible-thinking/dataconnect';


// Call the `listMyStudentActivitiesRef()` function to get a reference to the query.
const ref = listMyStudentActivitiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyStudentActivitiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activityAttendances);
});
```

## GetMyStudentActivity
You can execute the `GetMyStudentActivity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyStudentActivity(vars: GetMyStudentActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentActivityData, GetMyStudentActivityVariables>;

interface GetMyStudentActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyStudentActivityVariables): QueryRef<GetMyStudentActivityData, GetMyStudentActivityVariables>;
}
export const getMyStudentActivityRef: GetMyStudentActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyStudentActivity(dc: DataConnect, vars: GetMyStudentActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentActivityData, GetMyStudentActivityVariables>;

interface GetMyStudentActivityRef {
  ...
  (dc: DataConnect, vars: GetMyStudentActivityVariables): QueryRef<GetMyStudentActivityData, GetMyStudentActivityVariables>;
}
export const getMyStudentActivityRef: GetMyStudentActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyStudentActivityRef:
```typescript
const name = getMyStudentActivityRef.operationName;
console.log(name);
```

### Variables
The `GetMyStudentActivity` query requires an argument of type `GetMyStudentActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyStudentActivityVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetMyStudentActivity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyStudentActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyStudentActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyStudentActivity, GetMyStudentActivityVariables } from '@visible-thinking/dataconnect';

// The `GetMyStudentActivity` query requires an argument of type `GetMyStudentActivityVariables`:
const getMyStudentActivityVars: GetMyStudentActivityVariables = {
  id: ...,
};

// Call the `getMyStudentActivity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyStudentActivity(getMyStudentActivityVars);
// Variables can be defined inline as well.
const { data } = await getMyStudentActivity({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyStudentActivity(dataConnect, getMyStudentActivityVars);

console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
getMyStudentActivity(getMyStudentActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activityAttendances);
});
```

### Using `GetMyStudentActivity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyStudentActivityRef, GetMyStudentActivityVariables } from '@visible-thinking/dataconnect';

// The `GetMyStudentActivity` query requires an argument of type `GetMyStudentActivityVariables`:
const getMyStudentActivityVars: GetMyStudentActivityVariables = {
  id: ...,
};

// Call the `getMyStudentActivityRef()` function to get a reference to the query.
const ref = getMyStudentActivityRef(getMyStudentActivityVars);
// Variables can be defined inline as well.
const ref = getMyStudentActivityRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyStudentActivityRef(dataConnect, getMyStudentActivityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activityAttendances);
});
```

## GetMyStudentWork
You can execute the `GetMyStudentWork` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyStudentWork(vars: GetMyStudentWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentWorkData, GetMyStudentWorkVariables>;

interface GetMyStudentWorkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyStudentWorkVariables): QueryRef<GetMyStudentWorkData, GetMyStudentWorkVariables>;
}
export const getMyStudentWorkRef: GetMyStudentWorkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyStudentWork(dc: DataConnect, vars: GetMyStudentWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyStudentWorkData, GetMyStudentWorkVariables>;

interface GetMyStudentWorkRef {
  ...
  (dc: DataConnect, vars: GetMyStudentWorkVariables): QueryRef<GetMyStudentWorkData, GetMyStudentWorkVariables>;
}
export const getMyStudentWorkRef: GetMyStudentWorkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyStudentWorkRef:
```typescript
const name = getMyStudentWorkRef.operationName;
console.log(name);
```

### Variables
The `GetMyStudentWork` query requires an argument of type `GetMyStudentWorkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyStudentWorkVariables {
  activityId: string;
}
```
### Return Type
Recall that executing the `GetMyStudentWork` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyStudentWorkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyStudentWork`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyStudentWork, GetMyStudentWorkVariables } from '@visible-thinking/dataconnect';

// The `GetMyStudentWork` query requires an argument of type `GetMyStudentWorkVariables`:
const getMyStudentWorkVars: GetMyStudentWorkVariables = {
  activityId: ...,
};

// Call the `getMyStudentWork()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyStudentWork(getMyStudentWorkVars);
// Variables can be defined inline as well.
const { data } = await getMyStudentWork({ activityId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyStudentWork(dataConnect, getMyStudentWorkVars);

console.log(data.students);
console.log(data.thinkingCards);
console.log(data.individualSubmissions);
console.log(data.aiAnalyses);

// Or, you can use the `Promise` API.
getMyStudentWork(getMyStudentWorkVars).then((response) => {
  const data = response.data;
  console.log(data.students);
  console.log(data.thinkingCards);
  console.log(data.individualSubmissions);
  console.log(data.aiAnalyses);
});
```

### Using `GetMyStudentWork`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyStudentWorkRef, GetMyStudentWorkVariables } from '@visible-thinking/dataconnect';

// The `GetMyStudentWork` query requires an argument of type `GetMyStudentWorkVariables`:
const getMyStudentWorkVars: GetMyStudentWorkVariables = {
  activityId: ...,
};

// Call the `getMyStudentWorkRef()` function to get a reference to the query.
const ref = getMyStudentWorkRef(getMyStudentWorkVars);
// Variables can be defined inline as well.
const ref = getMyStudentWorkRef({ activityId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyStudentWorkRef(dataConnect, getMyStudentWorkVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);
console.log(data.thinkingCards);
console.log(data.individualSubmissions);
console.log(data.aiAnalyses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
  console.log(data.thinkingCards);
  console.log(data.individualSubmissions);
  console.log(data.aiAnalyses);
});
```

## GetMyGroupWork
You can execute the `GetMyGroupWork` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyGroupWork(vars: GetMyGroupWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyGroupWorkData, GetMyGroupWorkVariables>;

interface GetMyGroupWorkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyGroupWorkVariables): QueryRef<GetMyGroupWorkData, GetMyGroupWorkVariables>;
}
export const getMyGroupWorkRef: GetMyGroupWorkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyGroupWork(dc: DataConnect, vars: GetMyGroupWorkVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyGroupWorkData, GetMyGroupWorkVariables>;

interface GetMyGroupWorkRef {
  ...
  (dc: DataConnect, vars: GetMyGroupWorkVariables): QueryRef<GetMyGroupWorkData, GetMyGroupWorkVariables>;
}
export const getMyGroupWorkRef: GetMyGroupWorkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyGroupWorkRef:
```typescript
const name = getMyGroupWorkRef.operationName;
console.log(name);
```

### Variables
The `GetMyGroupWork` query requires an argument of type `GetMyGroupWorkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyGroupWorkVariables {
  activityId: string;
}
```
### Return Type
Recall that executing the `GetMyGroupWork` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyGroupWorkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyGroupWork`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyGroupWork, GetMyGroupWorkVariables } from '@visible-thinking/dataconnect';

// The `GetMyGroupWork` query requires an argument of type `GetMyGroupWorkVariables`:
const getMyGroupWorkVars: GetMyGroupWorkVariables = {
  activityId: ...,
};

// Call the `getMyGroupWork()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyGroupWork(getMyGroupWorkVars);
// Variables can be defined inline as well.
const { data } = await getMyGroupWork({ activityId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyGroupWork(dataConnect, getMyGroupWorkVars);

console.log(data.students);
console.log(data.activityGroupMembers);
console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
getMyGroupWork(getMyGroupWorkVars).then((response) => {
  const data = response.data;
  console.log(data.students);
  console.log(data.activityGroupMembers);
  console.log(data.activityAttendances);
});
```

### Using `GetMyGroupWork`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyGroupWorkRef, GetMyGroupWorkVariables } from '@visible-thinking/dataconnect';

// The `GetMyGroupWork` query requires an argument of type `GetMyGroupWorkVariables`:
const getMyGroupWorkVars: GetMyGroupWorkVariables = {
  activityId: ...,
};

// Call the `getMyGroupWorkRef()` function to get a reference to the query.
const ref = getMyGroupWorkRef(getMyGroupWorkVars);
// Variables can be defined inline as well.
const ref = getMyGroupWorkRef({ activityId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyGroupWorkRef(dataConnect, getMyGroupWorkVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);
console.log(data.activityGroupMembers);
console.log(data.activityAttendances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
  console.log(data.activityGroupMembers);
  console.log(data.activityAttendances);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `teacher` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertMyTeacherProfile
You can execute the `UpsertMyTeacherProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertMyTeacherProfile(vars: UpsertMyTeacherProfileVariables): MutationPromise<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;

interface UpsertMyTeacherProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyTeacherProfileVariables): MutationRef<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;
}
export const upsertMyTeacherProfileRef: UpsertMyTeacherProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyTeacherProfile(dc: DataConnect, vars: UpsertMyTeacherProfileVariables): MutationPromise<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;

interface UpsertMyTeacherProfileRef {
  ...
  (dc: DataConnect, vars: UpsertMyTeacherProfileVariables): MutationRef<UpsertMyTeacherProfileData, UpsertMyTeacherProfileVariables>;
}
export const upsertMyTeacherProfileRef: UpsertMyTeacherProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyTeacherProfileRef:
```typescript
const name = upsertMyTeacherProfileRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyTeacherProfile` mutation requires an argument of type `UpsertMyTeacherProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyTeacherProfileVariables {
  email: string;
  displayName: string;
  operationMode: TeacherOperationMode;
}
```
### Return Type
Recall that executing the `UpsertMyTeacherProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyTeacherProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyTeacherProfileData {
  teacherProfile_upsert: TeacherProfile_Key;
}
```
### Using `UpsertMyTeacherProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyTeacherProfile, UpsertMyTeacherProfileVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyTeacherProfile` mutation requires an argument of type `UpsertMyTeacherProfileVariables`:
const upsertMyTeacherProfileVars: UpsertMyTeacherProfileVariables = {
  email: ...,
  displayName: ...,
  operationMode: ...,
};

// Call the `upsertMyTeacherProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyTeacherProfile(upsertMyTeacherProfileVars);
// Variables can be defined inline as well.
const { data } = await upsertMyTeacherProfile({ email: ..., displayName: ..., operationMode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyTeacherProfile(dataConnect, upsertMyTeacherProfileVars);

console.log(data.teacherProfile_upsert);

// Or, you can use the `Promise` API.
upsertMyTeacherProfile(upsertMyTeacherProfileVars).then((response) => {
  const data = response.data;
  console.log(data.teacherProfile_upsert);
});
```

### Using `UpsertMyTeacherProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyTeacherProfileRef, UpsertMyTeacherProfileVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyTeacherProfile` mutation requires an argument of type `UpsertMyTeacherProfileVariables`:
const upsertMyTeacherProfileVars: UpsertMyTeacherProfileVariables = {
  email: ...,
  displayName: ...,
  operationMode: ...,
};

// Call the `upsertMyTeacherProfileRef()` function to get a reference to the mutation.
const ref = upsertMyTeacherProfileRef(upsertMyTeacherProfileVars);
// Variables can be defined inline as well.
const ref = upsertMyTeacherProfileRef({ email: ..., displayName: ..., operationMode: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyTeacherProfileRef(dataConnect, upsertMyTeacherProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherProfile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherProfile_upsert);
});
```

## DeleteMyTeacherProfile
You can execute the `DeleteMyTeacherProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyTeacherProfile(): MutationPromise<DeleteMyTeacherProfileData, undefined>;

interface DeleteMyTeacherProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyTeacherProfileData, undefined>;
}
export const deleteMyTeacherProfileRef: DeleteMyTeacherProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyTeacherProfile(dc: DataConnect): MutationPromise<DeleteMyTeacherProfileData, undefined>;

interface DeleteMyTeacherProfileRef {
  ...
  (dc: DataConnect): MutationRef<DeleteMyTeacherProfileData, undefined>;
}
export const deleteMyTeacherProfileRef: DeleteMyTeacherProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyTeacherProfileRef:
```typescript
const name = deleteMyTeacherProfileRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyTeacherProfile` mutation has no variables.
### Return Type
Recall that executing the `DeleteMyTeacherProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyTeacherProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyTeacherProfileData {
  teacherProfile_delete?: TeacherProfile_Key | null;
}
```
### Using `DeleteMyTeacherProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyTeacherProfile } from '@visible-thinking/dataconnect';


// Call the `deleteMyTeacherProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyTeacherProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyTeacherProfile(dataConnect);

console.log(data.teacherProfile_delete);

// Or, you can use the `Promise` API.
deleteMyTeacherProfile().then((response) => {
  const data = response.data;
  console.log(data.teacherProfile_delete);
});
```

### Using `DeleteMyTeacherProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyTeacherProfileRef } from '@visible-thinking/dataconnect';


// Call the `deleteMyTeacherProfileRef()` function to get a reference to the mutation.
const ref = deleteMyTeacherProfileRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyTeacherProfileRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherProfile_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherProfile_delete);
});
```

## UpsertMyAiCredential
You can execute the `UpsertMyAiCredential` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertMyAiCredential(vars: UpsertMyAiCredentialVariables): MutationPromise<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;

interface UpsertMyAiCredentialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyAiCredentialVariables): MutationRef<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;
}
export const upsertMyAiCredentialRef: UpsertMyAiCredentialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyAiCredential(dc: DataConnect, vars: UpsertMyAiCredentialVariables): MutationPromise<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;

interface UpsertMyAiCredentialRef {
  ...
  (dc: DataConnect, vars: UpsertMyAiCredentialVariables): MutationRef<UpsertMyAiCredentialData, UpsertMyAiCredentialVariables>;
}
export const upsertMyAiCredentialRef: UpsertMyAiCredentialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyAiCredentialRef:
```typescript
const name = upsertMyAiCredentialRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyAiCredential` mutation requires an argument of type `UpsertMyAiCredentialVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyAiCredentialVariables {
  provider: string;
  model?: string | null;
  encryptedApiKey: string;
  initializationVector: string;
  authenticationTag: string;
  keyHint: string;
}
```
### Return Type
Recall that executing the `UpsertMyAiCredential` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyAiCredentialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyAiCredentialData {
  teacherAiCredential_upsert: TeacherAiCredential_Key;
}
```
### Using `UpsertMyAiCredential`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyAiCredential, UpsertMyAiCredentialVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyAiCredential` mutation requires an argument of type `UpsertMyAiCredentialVariables`:
const upsertMyAiCredentialVars: UpsertMyAiCredentialVariables = {
  provider: ...,
  model: ..., // optional
  encryptedApiKey: ...,
  initializationVector: ...,
  authenticationTag: ...,
  keyHint: ...,
};

// Call the `upsertMyAiCredential()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyAiCredential(upsertMyAiCredentialVars);
// Variables can be defined inline as well.
const { data } = await upsertMyAiCredential({ provider: ..., model: ..., encryptedApiKey: ..., initializationVector: ..., authenticationTag: ..., keyHint: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyAiCredential(dataConnect, upsertMyAiCredentialVars);

console.log(data.teacherAiCredential_upsert);

// Or, you can use the `Promise` API.
upsertMyAiCredential(upsertMyAiCredentialVars).then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential_upsert);
});
```

### Using `UpsertMyAiCredential`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyAiCredentialRef, UpsertMyAiCredentialVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyAiCredential` mutation requires an argument of type `UpsertMyAiCredentialVariables`:
const upsertMyAiCredentialVars: UpsertMyAiCredentialVariables = {
  provider: ...,
  model: ..., // optional
  encryptedApiKey: ...,
  initializationVector: ...,
  authenticationTag: ...,
  keyHint: ...,
};

// Call the `upsertMyAiCredentialRef()` function to get a reference to the mutation.
const ref = upsertMyAiCredentialRef(upsertMyAiCredentialVars);
// Variables can be defined inline as well.
const ref = upsertMyAiCredentialRef({ provider: ..., model: ..., encryptedApiKey: ..., initializationVector: ..., authenticationTag: ..., keyHint: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyAiCredentialRef(dataConnect, upsertMyAiCredentialVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherAiCredential_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential_upsert);
});
```

## DeleteMyAiCredential
You can execute the `DeleteMyAiCredential` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyAiCredential(): MutationPromise<DeleteMyAiCredentialData, undefined>;

interface DeleteMyAiCredentialRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyAiCredentialData, undefined>;
}
export const deleteMyAiCredentialRef: DeleteMyAiCredentialRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyAiCredential(dc: DataConnect): MutationPromise<DeleteMyAiCredentialData, undefined>;

interface DeleteMyAiCredentialRef {
  ...
  (dc: DataConnect): MutationRef<DeleteMyAiCredentialData, undefined>;
}
export const deleteMyAiCredentialRef: DeleteMyAiCredentialRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyAiCredentialRef:
```typescript
const name = deleteMyAiCredentialRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyAiCredential` mutation has no variables.
### Return Type
Recall that executing the `DeleteMyAiCredential` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyAiCredentialData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyAiCredentialData {
  teacherAiCredential_delete?: TeacherAiCredential_Key | null;
}
```
### Using `DeleteMyAiCredential`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyAiCredential } from '@visible-thinking/dataconnect';


// Call the `deleteMyAiCredential()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyAiCredential();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyAiCredential(dataConnect);

console.log(data.teacherAiCredential_delete);

// Or, you can use the `Promise` API.
deleteMyAiCredential().then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential_delete);
});
```

### Using `DeleteMyAiCredential`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyAiCredentialRef } from '@visible-thinking/dataconnect';


// Call the `deleteMyAiCredentialRef()` function to get a reference to the mutation.
const ref = deleteMyAiCredentialRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyAiCredentialRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherAiCredential_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherAiCredential_delete);
});
```

## UpsertAiAnalysis
You can execute the `UpsertAiAnalysis` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertAiAnalysis(vars: UpsertAiAnalysisVariables): MutationPromise<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;

interface UpsertAiAnalysisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiAnalysisVariables): MutationRef<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;
}
export const upsertAiAnalysisRef: UpsertAiAnalysisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAiAnalysis(dc: DataConnect, vars: UpsertAiAnalysisVariables): MutationPromise<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;

interface UpsertAiAnalysisRef {
  ...
  (dc: DataConnect, vars: UpsertAiAnalysisVariables): MutationRef<UpsertAiAnalysisData, UpsertAiAnalysisVariables>;
}
export const upsertAiAnalysisRef: UpsertAiAnalysisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAiAnalysisRef:
```typescript
const name = upsertAiAnalysisRef.operationName;
console.log(name);
```

### Variables
The `UpsertAiAnalysis` mutation requires an argument of type `UpsertAiAnalysisVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertAiAnalysis` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAiAnalysisData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAiAnalysisData {
  aiAnalysis_upsert: AiAnalysis_Key;
}
```
### Using `UpsertAiAnalysis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAiAnalysis, UpsertAiAnalysisVariables } from '@visible-thinking/dataconnect';

// The `UpsertAiAnalysis` mutation requires an argument of type `UpsertAiAnalysisVariables`:
const upsertAiAnalysisVars: UpsertAiAnalysisVariables = {
  id: ...,
  activityId: ...,
  scope: ...,
  studentExternalId: ..., // optional
  studentAuthUid: ..., // optional
  status: ...,
  model: ...,
  summary: ..., // optional
  strengths: ..., // optional
  misconceptions: ..., // optional
  nextQuestions: ..., // optional
  recommendations: ..., // optional
  sourceFingerprint: ..., // optional
  inputTokens: ..., // optional
  outputTokens: ..., // optional
  totalTokens: ..., // optional
  errorMessage: ..., // optional
};

// Call the `upsertAiAnalysis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAiAnalysis(upsertAiAnalysisVars);
// Variables can be defined inline as well.
const { data } = await upsertAiAnalysis({ id: ..., activityId: ..., scope: ..., studentExternalId: ..., studentAuthUid: ..., status: ..., model: ..., summary: ..., strengths: ..., misconceptions: ..., nextQuestions: ..., recommendations: ..., sourceFingerprint: ..., inputTokens: ..., outputTokens: ..., totalTokens: ..., errorMessage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAiAnalysis(dataConnect, upsertAiAnalysisVars);

console.log(data.aiAnalysis_upsert);

// Or, you can use the `Promise` API.
upsertAiAnalysis(upsertAiAnalysisVars).then((response) => {
  const data = response.data;
  console.log(data.aiAnalysis_upsert);
});
```

### Using `UpsertAiAnalysis`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAiAnalysisRef, UpsertAiAnalysisVariables } from '@visible-thinking/dataconnect';

// The `UpsertAiAnalysis` mutation requires an argument of type `UpsertAiAnalysisVariables`:
const upsertAiAnalysisVars: UpsertAiAnalysisVariables = {
  id: ...,
  activityId: ...,
  scope: ...,
  studentExternalId: ..., // optional
  studentAuthUid: ..., // optional
  status: ...,
  model: ...,
  summary: ..., // optional
  strengths: ..., // optional
  misconceptions: ..., // optional
  nextQuestions: ..., // optional
  recommendations: ..., // optional
  sourceFingerprint: ..., // optional
  inputTokens: ..., // optional
  outputTokens: ..., // optional
  totalTokens: ..., // optional
  errorMessage: ..., // optional
};

// Call the `upsertAiAnalysisRef()` function to get a reference to the mutation.
const ref = upsertAiAnalysisRef(upsertAiAnalysisVars);
// Variables can be defined inline as well.
const ref = upsertAiAnalysisRef({ id: ..., activityId: ..., scope: ..., studentExternalId: ..., studentAuthUid: ..., status: ..., model: ..., summary: ..., strengths: ..., misconceptions: ..., nextQuestions: ..., recommendations: ..., sourceFingerprint: ..., inputTokens: ..., outputTokens: ..., totalTokens: ..., errorMessage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAiAnalysisRef(dataConnect, upsertAiAnalysisVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiAnalysis_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiAnalysis_upsert);
});
```

## SetActivityStatus
You can execute the `SetActivityStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setActivityStatus(vars: SetActivityStatusVariables): MutationPromise<SetActivityStatusData, SetActivityStatusVariables>;

interface SetActivityStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetActivityStatusVariables): MutationRef<SetActivityStatusData, SetActivityStatusVariables>;
}
export const setActivityStatusRef: SetActivityStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setActivityStatus(dc: DataConnect, vars: SetActivityStatusVariables): MutationPromise<SetActivityStatusData, SetActivityStatusVariables>;

interface SetActivityStatusRef {
  ...
  (dc: DataConnect, vars: SetActivityStatusVariables): MutationRef<SetActivityStatusData, SetActivityStatusVariables>;
}
export const setActivityStatusRef: SetActivityStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setActivityStatusRef:
```typescript
const name = setActivityStatusRef.operationName;
console.log(name);
```

### Variables
The `SetActivityStatus` mutation requires an argument of type `SetActivityStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetActivityStatusVariables {
  id: string;
  status: ActivityStatus;
}
```
### Return Type
Recall that executing the `SetActivityStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetActivityStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetActivityStatusData {
  activity_update?: Activity_Key | null;
}
```
### Using `SetActivityStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setActivityStatus, SetActivityStatusVariables } from '@visible-thinking/dataconnect';

// The `SetActivityStatus` mutation requires an argument of type `SetActivityStatusVariables`:
const setActivityStatusVars: SetActivityStatusVariables = {
  id: ...,
  status: ...,
};

// Call the `setActivityStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setActivityStatus(setActivityStatusVars);
// Variables can be defined inline as well.
const { data } = await setActivityStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setActivityStatus(dataConnect, setActivityStatusVars);

console.log(data.activity_update);

// Or, you can use the `Promise` API.
setActivityStatus(setActivityStatusVars).then((response) => {
  const data = response.data;
  console.log(data.activity_update);
});
```

### Using `SetActivityStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setActivityStatusRef, SetActivityStatusVariables } from '@visible-thinking/dataconnect';

// The `SetActivityStatus` mutation requires an argument of type `SetActivityStatusVariables`:
const setActivityStatusVars: SetActivityStatusVariables = {
  id: ...,
  status: ...,
};

// Call the `setActivityStatusRef()` function to get a reference to the mutation.
const ref = setActivityStatusRef(setActivityStatusVars);
// Variables can be defined inline as well.
const ref = setActivityStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setActivityStatusRef(dataConnect, setActivityStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_update);
});
```

## UpdateThinkingCardTags
You can execute the `UpdateThinkingCardTags` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateThinkingCardTags(vars: UpdateThinkingCardTagsVariables): MutationPromise<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;

interface UpdateThinkingCardTagsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateThinkingCardTagsVariables): MutationRef<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;
}
export const updateThinkingCardTagsRef: UpdateThinkingCardTagsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateThinkingCardTags(dc: DataConnect, vars: UpdateThinkingCardTagsVariables): MutationPromise<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;

interface UpdateThinkingCardTagsRef {
  ...
  (dc: DataConnect, vars: UpdateThinkingCardTagsVariables): MutationRef<UpdateThinkingCardTagsData, UpdateThinkingCardTagsVariables>;
}
export const updateThinkingCardTagsRef: UpdateThinkingCardTagsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateThinkingCardTagsRef:
```typescript
const name = updateThinkingCardTagsRef.operationName;
console.log(name);
```

### Variables
The `UpdateThinkingCardTags` mutation requires an argument of type `UpdateThinkingCardTagsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateThinkingCardTagsVariables {
  id: string;
  tags?: string[] | null;
  tagsPublic: boolean;
}
```
### Return Type
Recall that executing the `UpdateThinkingCardTags` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateThinkingCardTagsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateThinkingCardTagsData {
  thinkingCard_update?: ThinkingCard_Key | null;
}
```
### Using `UpdateThinkingCardTags`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateThinkingCardTags, UpdateThinkingCardTagsVariables } from '@visible-thinking/dataconnect';

// The `UpdateThinkingCardTags` mutation requires an argument of type `UpdateThinkingCardTagsVariables`:
const updateThinkingCardTagsVars: UpdateThinkingCardTagsVariables = {
  id: ...,
  tags: ..., // optional
  tagsPublic: ...,
};

// Call the `updateThinkingCardTags()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateThinkingCardTags(updateThinkingCardTagsVars);
// Variables can be defined inline as well.
const { data } = await updateThinkingCardTags({ id: ..., tags: ..., tagsPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateThinkingCardTags(dataConnect, updateThinkingCardTagsVars);

console.log(data.thinkingCard_update);

// Or, you can use the `Promise` API.
updateThinkingCardTags(updateThinkingCardTagsVars).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_update);
});
```

### Using `UpdateThinkingCardTags`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateThinkingCardTagsRef, UpdateThinkingCardTagsVariables } from '@visible-thinking/dataconnect';

// The `UpdateThinkingCardTags` mutation requires an argument of type `UpdateThinkingCardTagsVariables`:
const updateThinkingCardTagsVars: UpdateThinkingCardTagsVariables = {
  id: ...,
  tags: ..., // optional
  tagsPublic: ...,
};

// Call the `updateThinkingCardTagsRef()` function to get a reference to the mutation.
const ref = updateThinkingCardTagsRef(updateThinkingCardTagsVars);
// Variables can be defined inline as well.
const ref = updateThinkingCardTagsRef({ id: ..., tags: ..., tagsPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateThinkingCardTagsRef(dataConnect, updateThinkingCardTagsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.thinkingCard_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_update);
});
```

## SetAiAnalysisVisibility
You can execute the `SetAiAnalysisVisibility` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setAiAnalysisVisibility(vars: SetAiAnalysisVisibilityVariables): MutationPromise<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;

interface SetAiAnalysisVisibilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetAiAnalysisVisibilityVariables): MutationRef<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;
}
export const setAiAnalysisVisibilityRef: SetAiAnalysisVisibilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setAiAnalysisVisibility(dc: DataConnect, vars: SetAiAnalysisVisibilityVariables): MutationPromise<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;

interface SetAiAnalysisVisibilityRef {
  ...
  (dc: DataConnect, vars: SetAiAnalysisVisibilityVariables): MutationRef<SetAiAnalysisVisibilityData, SetAiAnalysisVisibilityVariables>;
}
export const setAiAnalysisVisibilityRef: SetAiAnalysisVisibilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setAiAnalysisVisibilityRef:
```typescript
const name = setAiAnalysisVisibilityRef.operationName;
console.log(name);
```

### Variables
The `SetAiAnalysisVisibility` mutation requires an argument of type `SetAiAnalysisVisibilityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetAiAnalysisVisibilityVariables {
  id: string;
  studentVisible: boolean;
}
```
### Return Type
Recall that executing the `SetAiAnalysisVisibility` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetAiAnalysisVisibilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetAiAnalysisVisibilityData {
  aiAnalysis_update?: AiAnalysis_Key | null;
}
```
### Using `SetAiAnalysisVisibility`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setAiAnalysisVisibility, SetAiAnalysisVisibilityVariables } from '@visible-thinking/dataconnect';

// The `SetAiAnalysisVisibility` mutation requires an argument of type `SetAiAnalysisVisibilityVariables`:
const setAiAnalysisVisibilityVars: SetAiAnalysisVisibilityVariables = {
  id: ...,
  studentVisible: ...,
};

// Call the `setAiAnalysisVisibility()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setAiAnalysisVisibility(setAiAnalysisVisibilityVars);
// Variables can be defined inline as well.
const { data } = await setAiAnalysisVisibility({ id: ..., studentVisible: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setAiAnalysisVisibility(dataConnect, setAiAnalysisVisibilityVars);

console.log(data.aiAnalysis_update);

// Or, you can use the `Promise` API.
setAiAnalysisVisibility(setAiAnalysisVisibilityVars).then((response) => {
  const data = response.data;
  console.log(data.aiAnalysis_update);
});
```

### Using `SetAiAnalysisVisibility`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setAiAnalysisVisibilityRef, SetAiAnalysisVisibilityVariables } from '@visible-thinking/dataconnect';

// The `SetAiAnalysisVisibility` mutation requires an argument of type `SetAiAnalysisVisibilityVariables`:
const setAiAnalysisVisibilityVars: SetAiAnalysisVisibilityVariables = {
  id: ...,
  studentVisible: ...,
};

// Call the `setAiAnalysisVisibilityRef()` function to get a reference to the mutation.
const ref = setAiAnalysisVisibilityRef(setAiAnalysisVisibilityVars);
// Variables can be defined inline as well.
const ref = setAiAnalysisVisibilityRef({ id: ..., studentVisible: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setAiAnalysisVisibilityRef(dataConnect, setAiAnalysisVisibilityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiAnalysis_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiAnalysis_update);
});
```

## LinkStudentAuth
You can execute the `LinkStudentAuth` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
linkStudentAuth(vars: LinkStudentAuthVariables): MutationPromise<LinkStudentAuthData, LinkStudentAuthVariables>;

interface LinkStudentAuthRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkStudentAuthVariables): MutationRef<LinkStudentAuthData, LinkStudentAuthVariables>;
}
export const linkStudentAuthRef: LinkStudentAuthRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
linkStudentAuth(dc: DataConnect, vars: LinkStudentAuthVariables): MutationPromise<LinkStudentAuthData, LinkStudentAuthVariables>;

interface LinkStudentAuthRef {
  ...
  (dc: DataConnect, vars: LinkStudentAuthVariables): MutationRef<LinkStudentAuthData, LinkStudentAuthVariables>;
}
export const linkStudentAuthRef: LinkStudentAuthRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the linkStudentAuthRef:
```typescript
const name = linkStudentAuthRef.operationName;
console.log(name);
```

### Variables
The `LinkStudentAuth` mutation requires an argument of type `LinkStudentAuthVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LinkStudentAuthVariables {
  studentId: string;
  authUid: string;
}
```
### Return Type
Recall that executing the `LinkStudentAuth` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LinkStudentAuthData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LinkStudentAuthData {
  student_update?: Student_Key | null;
}
```
### Using `LinkStudentAuth`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, linkStudentAuth, LinkStudentAuthVariables } from '@visible-thinking/dataconnect';

// The `LinkStudentAuth` mutation requires an argument of type `LinkStudentAuthVariables`:
const linkStudentAuthVars: LinkStudentAuthVariables = {
  studentId: ...,
  authUid: ...,
};

// Call the `linkStudentAuth()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await linkStudentAuth(linkStudentAuthVars);
// Variables can be defined inline as well.
const { data } = await linkStudentAuth({ studentId: ..., authUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await linkStudentAuth(dataConnect, linkStudentAuthVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
linkStudentAuth(linkStudentAuthVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `LinkStudentAuth`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, linkStudentAuthRef, LinkStudentAuthVariables } from '@visible-thinking/dataconnect';

// The `LinkStudentAuth` mutation requires an argument of type `LinkStudentAuthVariables`:
const linkStudentAuthVars: LinkStudentAuthVariables = {
  studentId: ...,
  authUid: ...,
};

// Call the `linkStudentAuthRef()` function to get a reference to the mutation.
const ref = linkStudentAuthRef(linkStudentAuthVars);
// Variables can be defined inline as well.
const ref = linkStudentAuthRef({ studentId: ..., authUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = linkStudentAuthRef(dataConnect, linkStudentAuthVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## UnlinkStudentAuth
You can execute the `UnlinkStudentAuth` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
unlinkStudentAuth(vars: UnlinkStudentAuthVariables): MutationPromise<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;

interface UnlinkStudentAuthRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnlinkStudentAuthVariables): MutationRef<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;
}
export const unlinkStudentAuthRef: UnlinkStudentAuthRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
unlinkStudentAuth(dc: DataConnect, vars: UnlinkStudentAuthVariables): MutationPromise<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;

interface UnlinkStudentAuthRef {
  ...
  (dc: DataConnect, vars: UnlinkStudentAuthVariables): MutationRef<UnlinkStudentAuthData, UnlinkStudentAuthVariables>;
}
export const unlinkStudentAuthRef: UnlinkStudentAuthRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the unlinkStudentAuthRef:
```typescript
const name = unlinkStudentAuthRef.operationName;
console.log(name);
```

### Variables
The `UnlinkStudentAuth` mutation requires an argument of type `UnlinkStudentAuthVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UnlinkStudentAuthVariables {
  studentId: string;
}
```
### Return Type
Recall that executing the `UnlinkStudentAuth` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UnlinkStudentAuthData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UnlinkStudentAuthData {
  student_update?: Student_Key | null;
}
```
### Using `UnlinkStudentAuth`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, unlinkStudentAuth, UnlinkStudentAuthVariables } from '@visible-thinking/dataconnect';

// The `UnlinkStudentAuth` mutation requires an argument of type `UnlinkStudentAuthVariables`:
const unlinkStudentAuthVars: UnlinkStudentAuthVariables = {
  studentId: ...,
};

// Call the `unlinkStudentAuth()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await unlinkStudentAuth(unlinkStudentAuthVars);
// Variables can be defined inline as well.
const { data } = await unlinkStudentAuth({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await unlinkStudentAuth(dataConnect, unlinkStudentAuthVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
unlinkStudentAuth(unlinkStudentAuthVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `UnlinkStudentAuth`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, unlinkStudentAuthRef, UnlinkStudentAuthVariables } from '@visible-thinking/dataconnect';

// The `UnlinkStudentAuth` mutation requires an argument of type `UnlinkStudentAuthVariables`:
const unlinkStudentAuthVars: UnlinkStudentAuthVariables = {
  studentId: ...,
};

// Call the `unlinkStudentAuthRef()` function to get a reference to the mutation.
const ref = unlinkStudentAuthRef(unlinkStudentAuthVars);
// Variables can be defined inline as well.
const ref = unlinkStudentAuthRef({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = unlinkStudentAuthRef(dataConnect, unlinkStudentAuthVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## UpsertSchoolClass
You can execute the `UpsertSchoolClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertSchoolClass(vars: UpsertSchoolClassVariables): MutationPromise<UpsertSchoolClassData, UpsertSchoolClassVariables>;

interface UpsertSchoolClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSchoolClassVariables): MutationRef<UpsertSchoolClassData, UpsertSchoolClassVariables>;
}
export const upsertSchoolClassRef: UpsertSchoolClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertSchoolClass(dc: DataConnect, vars: UpsertSchoolClassVariables): MutationPromise<UpsertSchoolClassData, UpsertSchoolClassVariables>;

interface UpsertSchoolClassRef {
  ...
  (dc: DataConnect, vars: UpsertSchoolClassVariables): MutationRef<UpsertSchoolClassData, UpsertSchoolClassVariables>;
}
export const upsertSchoolClassRef: UpsertSchoolClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertSchoolClassRef:
```typescript
const name = upsertSchoolClassRef.operationName;
console.log(name);
```

### Variables
The `UpsertSchoolClass` mutation requires an argument of type `UpsertSchoolClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertSchoolClassVariables {
  name: string;
}
```
### Return Type
Recall that executing the `UpsertSchoolClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertSchoolClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertSchoolClassData {
  schoolClass_upsert: SchoolClass_Key;
}
```
### Using `UpsertSchoolClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertSchoolClass, UpsertSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `UpsertSchoolClass` mutation requires an argument of type `UpsertSchoolClassVariables`:
const upsertSchoolClassVars: UpsertSchoolClassVariables = {
  name: ...,
};

// Call the `upsertSchoolClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertSchoolClass(upsertSchoolClassVars);
// Variables can be defined inline as well.
const { data } = await upsertSchoolClass({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertSchoolClass(dataConnect, upsertSchoolClassVars);

console.log(data.schoolClass_upsert);

// Or, you can use the `Promise` API.
upsertSchoolClass(upsertSchoolClassVars).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_upsert);
});
```

### Using `UpsertSchoolClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertSchoolClassRef, UpsertSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `UpsertSchoolClass` mutation requires an argument of type `UpsertSchoolClassVariables`:
const upsertSchoolClassVars: UpsertSchoolClassVariables = {
  name: ...,
};

// Call the `upsertSchoolClassRef()` function to get a reference to the mutation.
const ref = upsertSchoolClassRef(upsertSchoolClassVars);
// Variables can be defined inline as well.
const ref = upsertSchoolClassRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertSchoolClassRef(dataConnect, upsertSchoolClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schoolClass_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_upsert);
});
```

## RenameSchoolClass
You can execute the `RenameSchoolClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
renameSchoolClass(vars: RenameSchoolClassVariables): MutationPromise<RenameSchoolClassData, RenameSchoolClassVariables>;

interface RenameSchoolClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameSchoolClassVariables): MutationRef<RenameSchoolClassData, RenameSchoolClassVariables>;
}
export const renameSchoolClassRef: RenameSchoolClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
renameSchoolClass(dc: DataConnect, vars: RenameSchoolClassVariables): MutationPromise<RenameSchoolClassData, RenameSchoolClassVariables>;

interface RenameSchoolClassRef {
  ...
  (dc: DataConnect, vars: RenameSchoolClassVariables): MutationRef<RenameSchoolClassData, RenameSchoolClassVariables>;
}
export const renameSchoolClassRef: RenameSchoolClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the renameSchoolClassRef:
```typescript
const name = renameSchoolClassRef.operationName;
console.log(name);
```

### Variables
The `RenameSchoolClass` mutation requires an argument of type `RenameSchoolClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RenameSchoolClassVariables {
  id: string;
  name: string;
}
```
### Return Type
Recall that executing the `RenameSchoolClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RenameSchoolClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RenameSchoolClassData {
  schoolClass_update?: SchoolClass_Key | null;
}
```
### Using `RenameSchoolClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, renameSchoolClass, RenameSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `RenameSchoolClass` mutation requires an argument of type `RenameSchoolClassVariables`:
const renameSchoolClassVars: RenameSchoolClassVariables = {
  id: ...,
  name: ...,
};

// Call the `renameSchoolClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await renameSchoolClass(renameSchoolClassVars);
// Variables can be defined inline as well.
const { data } = await renameSchoolClass({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await renameSchoolClass(dataConnect, renameSchoolClassVars);

console.log(data.schoolClass_update);

// Or, you can use the `Promise` API.
renameSchoolClass(renameSchoolClassVars).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_update);
});
```

### Using `RenameSchoolClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, renameSchoolClassRef, RenameSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `RenameSchoolClass` mutation requires an argument of type `RenameSchoolClassVariables`:
const renameSchoolClassVars: RenameSchoolClassVariables = {
  id: ...,
  name: ...,
};

// Call the `renameSchoolClassRef()` function to get a reference to the mutation.
const ref = renameSchoolClassRef(renameSchoolClassVars);
// Variables can be defined inline as well.
const ref = renameSchoolClassRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = renameSchoolClassRef(dataConnect, renameSchoolClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schoolClass_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_update);
});
```

## CreateDefaultGroup
You can execute the `CreateDefaultGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDefaultGroup(vars: CreateDefaultGroupVariables): MutationPromise<CreateDefaultGroupData, CreateDefaultGroupVariables>;

interface CreateDefaultGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDefaultGroupVariables): MutationRef<CreateDefaultGroupData, CreateDefaultGroupVariables>;
}
export const createDefaultGroupRef: CreateDefaultGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDefaultGroup(dc: DataConnect, vars: CreateDefaultGroupVariables): MutationPromise<CreateDefaultGroupData, CreateDefaultGroupVariables>;

interface CreateDefaultGroupRef {
  ...
  (dc: DataConnect, vars: CreateDefaultGroupVariables): MutationRef<CreateDefaultGroupData, CreateDefaultGroupVariables>;
}
export const createDefaultGroupRef: CreateDefaultGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDefaultGroupRef:
```typescript
const name = createDefaultGroupRef.operationName;
console.log(name);
```

### Variables
The `CreateDefaultGroup` mutation requires an argument of type `CreateDefaultGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDefaultGroupVariables {
  id: string;
  schoolClassId: string;
  name: string;
}
```
### Return Type
Recall that executing the `CreateDefaultGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDefaultGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDefaultGroupData {
  defaultGroup_insert: DefaultGroup_Key;
}
```
### Using `CreateDefaultGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDefaultGroup, CreateDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `CreateDefaultGroup` mutation requires an argument of type `CreateDefaultGroupVariables`:
const createDefaultGroupVars: CreateDefaultGroupVariables = {
  id: ...,
  schoolClassId: ...,
  name: ...,
};

// Call the `createDefaultGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDefaultGroup(createDefaultGroupVars);
// Variables can be defined inline as well.
const { data } = await createDefaultGroup({ id: ..., schoolClassId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDefaultGroup(dataConnect, createDefaultGroupVars);

console.log(data.defaultGroup_insert);

// Or, you can use the `Promise` API.
createDefaultGroup(createDefaultGroupVars).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_insert);
});
```

### Using `CreateDefaultGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDefaultGroupRef, CreateDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `CreateDefaultGroup` mutation requires an argument of type `CreateDefaultGroupVariables`:
const createDefaultGroupVars: CreateDefaultGroupVariables = {
  id: ...,
  schoolClassId: ...,
  name: ...,
};

// Call the `createDefaultGroupRef()` function to get a reference to the mutation.
const ref = createDefaultGroupRef(createDefaultGroupVars);
// Variables can be defined inline as well.
const ref = createDefaultGroupRef({ id: ..., schoolClassId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDefaultGroupRef(dataConnect, createDefaultGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.defaultGroup_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_insert);
});
```

## RenameDefaultGroup
You can execute the `RenameDefaultGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
renameDefaultGroup(vars: RenameDefaultGroupVariables): MutationPromise<RenameDefaultGroupData, RenameDefaultGroupVariables>;

interface RenameDefaultGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenameDefaultGroupVariables): MutationRef<RenameDefaultGroupData, RenameDefaultGroupVariables>;
}
export const renameDefaultGroupRef: RenameDefaultGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
renameDefaultGroup(dc: DataConnect, vars: RenameDefaultGroupVariables): MutationPromise<RenameDefaultGroupData, RenameDefaultGroupVariables>;

interface RenameDefaultGroupRef {
  ...
  (dc: DataConnect, vars: RenameDefaultGroupVariables): MutationRef<RenameDefaultGroupData, RenameDefaultGroupVariables>;
}
export const renameDefaultGroupRef: RenameDefaultGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the renameDefaultGroupRef:
```typescript
const name = renameDefaultGroupRef.operationName;
console.log(name);
```

### Variables
The `RenameDefaultGroup` mutation requires an argument of type `RenameDefaultGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RenameDefaultGroupVariables {
  id: string;
  name: string;
}
```
### Return Type
Recall that executing the `RenameDefaultGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RenameDefaultGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RenameDefaultGroupData {
  defaultGroup_update?: DefaultGroup_Key | null;
}
```
### Using `RenameDefaultGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, renameDefaultGroup, RenameDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `RenameDefaultGroup` mutation requires an argument of type `RenameDefaultGroupVariables`:
const renameDefaultGroupVars: RenameDefaultGroupVariables = {
  id: ...,
  name: ...,
};

// Call the `renameDefaultGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await renameDefaultGroup(renameDefaultGroupVars);
// Variables can be defined inline as well.
const { data } = await renameDefaultGroup({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await renameDefaultGroup(dataConnect, renameDefaultGroupVars);

console.log(data.defaultGroup_update);

// Or, you can use the `Promise` API.
renameDefaultGroup(renameDefaultGroupVars).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_update);
});
```

### Using `RenameDefaultGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, renameDefaultGroupRef, RenameDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `RenameDefaultGroup` mutation requires an argument of type `RenameDefaultGroupVariables`:
const renameDefaultGroupVars: RenameDefaultGroupVariables = {
  id: ...,
  name: ...,
};

// Call the `renameDefaultGroupRef()` function to get a reference to the mutation.
const ref = renameDefaultGroupRef(renameDefaultGroupVars);
// Variables can be defined inline as well.
const ref = renameDefaultGroupRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = renameDefaultGroupRef(dataConnect, renameDefaultGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.defaultGroup_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_update);
});
```

## DeleteDefaultGroup
You can execute the `DeleteDefaultGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDefaultGroup(vars: DeleteDefaultGroupVariables): MutationPromise<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;

interface DeleteDefaultGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDefaultGroupVariables): MutationRef<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;
}
export const deleteDefaultGroupRef: DeleteDefaultGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDefaultGroup(dc: DataConnect, vars: DeleteDefaultGroupVariables): MutationPromise<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;

interface DeleteDefaultGroupRef {
  ...
  (dc: DataConnect, vars: DeleteDefaultGroupVariables): MutationRef<DeleteDefaultGroupData, DeleteDefaultGroupVariables>;
}
export const deleteDefaultGroupRef: DeleteDefaultGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDefaultGroupRef:
```typescript
const name = deleteDefaultGroupRef.operationName;
console.log(name);
```

### Variables
The `DeleteDefaultGroup` mutation requires an argument of type `DeleteDefaultGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDefaultGroupVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteDefaultGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDefaultGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDefaultGroupData {
  defaultGroup_delete?: DefaultGroup_Key | null;
}
```
### Using `DeleteDefaultGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDefaultGroup, DeleteDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `DeleteDefaultGroup` mutation requires an argument of type `DeleteDefaultGroupVariables`:
const deleteDefaultGroupVars: DeleteDefaultGroupVariables = {
  id: ...,
};

// Call the `deleteDefaultGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDefaultGroup(deleteDefaultGroupVars);
// Variables can be defined inline as well.
const { data } = await deleteDefaultGroup({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDefaultGroup(dataConnect, deleteDefaultGroupVars);

console.log(data.defaultGroup_delete);

// Or, you can use the `Promise` API.
deleteDefaultGroup(deleteDefaultGroupVars).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_delete);
});
```

### Using `DeleteDefaultGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDefaultGroupRef, DeleteDefaultGroupVariables } from '@visible-thinking/dataconnect';

// The `DeleteDefaultGroup` mutation requires an argument of type `DeleteDefaultGroupVariables`:
const deleteDefaultGroupVars: DeleteDefaultGroupVariables = {
  id: ...,
};

// Call the `deleteDefaultGroupRef()` function to get a reference to the mutation.
const ref = deleteDefaultGroupRef(deleteDefaultGroupVars);
// Variables can be defined inline as well.
const ref = deleteDefaultGroupRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDefaultGroupRef(dataConnect, deleteDefaultGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.defaultGroup_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.defaultGroup_delete);
});
```

## AssignDefaultGroupMember
You can execute the `AssignDefaultGroupMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
assignDefaultGroupMember(vars: AssignDefaultGroupMemberVariables): MutationPromise<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;

interface AssignDefaultGroupMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignDefaultGroupMemberVariables): MutationRef<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;
}
export const assignDefaultGroupMemberRef: AssignDefaultGroupMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignDefaultGroupMember(dc: DataConnect, vars: AssignDefaultGroupMemberVariables): MutationPromise<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;

interface AssignDefaultGroupMemberRef {
  ...
  (dc: DataConnect, vars: AssignDefaultGroupMemberVariables): MutationRef<AssignDefaultGroupMemberData, AssignDefaultGroupMemberVariables>;
}
export const assignDefaultGroupMemberRef: AssignDefaultGroupMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignDefaultGroupMemberRef:
```typescript
const name = assignDefaultGroupMemberRef.operationName;
console.log(name);
```

### Variables
The `AssignDefaultGroupMember` mutation requires an argument of type `AssignDefaultGroupMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignDefaultGroupMemberVariables {
  defaultGroupId: string;
  studentId: string;
  schoolClassId: string;
}
```
### Return Type
Recall that executing the `AssignDefaultGroupMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignDefaultGroupMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignDefaultGroupMemberData {
  defaultGroupMember_upsert: DefaultGroupMember_Key;
}
```
### Using `AssignDefaultGroupMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignDefaultGroupMember, AssignDefaultGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `AssignDefaultGroupMember` mutation requires an argument of type `AssignDefaultGroupMemberVariables`:
const assignDefaultGroupMemberVars: AssignDefaultGroupMemberVariables = {
  defaultGroupId: ...,
  studentId: ...,
  schoolClassId: ...,
};

// Call the `assignDefaultGroupMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignDefaultGroupMember(assignDefaultGroupMemberVars);
// Variables can be defined inline as well.
const { data } = await assignDefaultGroupMember({ defaultGroupId: ..., studentId: ..., schoolClassId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignDefaultGroupMember(dataConnect, assignDefaultGroupMemberVars);

console.log(data.defaultGroupMember_upsert);

// Or, you can use the `Promise` API.
assignDefaultGroupMember(assignDefaultGroupMemberVars).then((response) => {
  const data = response.data;
  console.log(data.defaultGroupMember_upsert);
});
```

### Using `AssignDefaultGroupMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignDefaultGroupMemberRef, AssignDefaultGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `AssignDefaultGroupMember` mutation requires an argument of type `AssignDefaultGroupMemberVariables`:
const assignDefaultGroupMemberVars: AssignDefaultGroupMemberVariables = {
  defaultGroupId: ...,
  studentId: ...,
  schoolClassId: ...,
};

// Call the `assignDefaultGroupMemberRef()` function to get a reference to the mutation.
const ref = assignDefaultGroupMemberRef(assignDefaultGroupMemberVars);
// Variables can be defined inline as well.
const ref = assignDefaultGroupMemberRef({ defaultGroupId: ..., studentId: ..., schoolClassId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignDefaultGroupMemberRef(dataConnect, assignDefaultGroupMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.defaultGroupMember_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.defaultGroupMember_upsert);
});
```

## RemoveDefaultGroupMember
You can execute the `RemoveDefaultGroupMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeDefaultGroupMember(vars: RemoveDefaultGroupMemberVariables): MutationPromise<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;

interface RemoveDefaultGroupMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveDefaultGroupMemberVariables): MutationRef<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;
}
export const removeDefaultGroupMemberRef: RemoveDefaultGroupMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeDefaultGroupMember(dc: DataConnect, vars: RemoveDefaultGroupMemberVariables): MutationPromise<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;

interface RemoveDefaultGroupMemberRef {
  ...
  (dc: DataConnect, vars: RemoveDefaultGroupMemberVariables): MutationRef<RemoveDefaultGroupMemberData, RemoveDefaultGroupMemberVariables>;
}
export const removeDefaultGroupMemberRef: RemoveDefaultGroupMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeDefaultGroupMemberRef:
```typescript
const name = removeDefaultGroupMemberRef.operationName;
console.log(name);
```

### Variables
The `RemoveDefaultGroupMember` mutation requires an argument of type `RemoveDefaultGroupMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveDefaultGroupMemberVariables {
  defaultGroupId: string;
  studentId: string;
}
```
### Return Type
Recall that executing the `RemoveDefaultGroupMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveDefaultGroupMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveDefaultGroupMemberData {
  defaultGroupMember_delete?: DefaultGroupMember_Key | null;
}
```
### Using `RemoveDefaultGroupMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeDefaultGroupMember, RemoveDefaultGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `RemoveDefaultGroupMember` mutation requires an argument of type `RemoveDefaultGroupMemberVariables`:
const removeDefaultGroupMemberVars: RemoveDefaultGroupMemberVariables = {
  defaultGroupId: ...,
  studentId: ...,
};

// Call the `removeDefaultGroupMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeDefaultGroupMember(removeDefaultGroupMemberVars);
// Variables can be defined inline as well.
const { data } = await removeDefaultGroupMember({ defaultGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeDefaultGroupMember(dataConnect, removeDefaultGroupMemberVars);

console.log(data.defaultGroupMember_delete);

// Or, you can use the `Promise` API.
removeDefaultGroupMember(removeDefaultGroupMemberVars).then((response) => {
  const data = response.data;
  console.log(data.defaultGroupMember_delete);
});
```

### Using `RemoveDefaultGroupMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeDefaultGroupMemberRef, RemoveDefaultGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `RemoveDefaultGroupMember` mutation requires an argument of type `RemoveDefaultGroupMemberVariables`:
const removeDefaultGroupMemberVars: RemoveDefaultGroupMemberVariables = {
  defaultGroupId: ...,
  studentId: ...,
};

// Call the `removeDefaultGroupMemberRef()` function to get a reference to the mutation.
const ref = removeDefaultGroupMemberRef(removeDefaultGroupMemberVars);
// Variables can be defined inline as well.
const ref = removeDefaultGroupMemberRef({ defaultGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeDefaultGroupMemberRef(dataConnect, removeDefaultGroupMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.defaultGroupMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.defaultGroupMember_delete);
});
```

## UpsertStudent
You can execute the `UpsertStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertStudent(vars: UpsertStudentVariables): MutationPromise<UpsertStudentData, UpsertStudentVariables>;

interface UpsertStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertStudentVariables): MutationRef<UpsertStudentData, UpsertStudentVariables>;
}
export const upsertStudentRef: UpsertStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertStudent(dc: DataConnect, vars: UpsertStudentVariables): MutationPromise<UpsertStudentData, UpsertStudentVariables>;

interface UpsertStudentRef {
  ...
  (dc: DataConnect, vars: UpsertStudentVariables): MutationRef<UpsertStudentData, UpsertStudentVariables>;
}
export const upsertStudentRef: UpsertStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertStudentRef:
```typescript
const name = upsertStudentRef.operationName;
console.log(name);
```

### Variables
The `UpsertStudent` mutation requires an argument of type `UpsertStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertStudentVariables {
  externalId: string;
  schoolClassId: string;
  studentNumber: string;
  name: string;
  passwordIssued: boolean;
}
```
### Return Type
Recall that executing the `UpsertStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertStudentData {
  student_upsert: Student_Key;
}
```
### Using `UpsertStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertStudent, UpsertStudentVariables } from '@visible-thinking/dataconnect';

// The `UpsertStudent` mutation requires an argument of type `UpsertStudentVariables`:
const upsertStudentVars: UpsertStudentVariables = {
  externalId: ...,
  schoolClassId: ...,
  studentNumber: ...,
  name: ...,
  passwordIssued: ...,
};

// Call the `upsertStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertStudent(upsertStudentVars);
// Variables can be defined inline as well.
const { data } = await upsertStudent({ externalId: ..., schoolClassId: ..., studentNumber: ..., name: ..., passwordIssued: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertStudent(dataConnect, upsertStudentVars);

console.log(data.student_upsert);

// Or, you can use the `Promise` API.
upsertStudent(upsertStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_upsert);
});
```

### Using `UpsertStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertStudentRef, UpsertStudentVariables } from '@visible-thinking/dataconnect';

// The `UpsertStudent` mutation requires an argument of type `UpsertStudentVariables`:
const upsertStudentVars: UpsertStudentVariables = {
  externalId: ...,
  schoolClassId: ...,
  studentNumber: ...,
  name: ...,
  passwordIssued: ...,
};

// Call the `upsertStudentRef()` function to get a reference to the mutation.
const ref = upsertStudentRef(upsertStudentVars);
// Variables can be defined inline as well.
const ref = upsertStudentRef({ externalId: ..., schoolClassId: ..., studentNumber: ..., name: ..., passwordIssued: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertStudentRef(dataConnect, upsertStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_upsert);
});
```

## DeleteStudent
You can execute the `DeleteStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStudent(vars: DeleteStudentVariables): MutationPromise<DeleteStudentData, DeleteStudentVariables>;

interface DeleteStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudentVariables): MutationRef<DeleteStudentData, DeleteStudentVariables>;
}
export const deleteStudentRef: DeleteStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStudent(dc: DataConnect, vars: DeleteStudentVariables): MutationPromise<DeleteStudentData, DeleteStudentVariables>;

interface DeleteStudentRef {
  ...
  (dc: DataConnect, vars: DeleteStudentVariables): MutationRef<DeleteStudentData, DeleteStudentVariables>;
}
export const deleteStudentRef: DeleteStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStudentRef:
```typescript
const name = deleteStudentRef.operationName;
console.log(name);
```

### Variables
The `DeleteStudent` mutation requires an argument of type `DeleteStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStudentVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStudentData {
  student_delete?: Student_Key | null;
}
```
### Using `DeleteStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStudent, DeleteStudentVariables } from '@visible-thinking/dataconnect';

// The `DeleteStudent` mutation requires an argument of type `DeleteStudentVariables`:
const deleteStudentVars: DeleteStudentVariables = {
  id: ...,
};

// Call the `deleteStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStudent(deleteStudentVars);
// Variables can be defined inline as well.
const { data } = await deleteStudent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStudent(dataConnect, deleteStudentVars);

console.log(data.student_delete);

// Or, you can use the `Promise` API.
deleteStudent(deleteStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_delete);
});
```

### Using `DeleteStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStudentRef, DeleteStudentVariables } from '@visible-thinking/dataconnect';

// The `DeleteStudent` mutation requires an argument of type `DeleteStudentVariables`:
const deleteStudentVars: DeleteStudentVariables = {
  id: ...,
};

// Call the `deleteStudentRef()` function to get a reference to the mutation.
const ref = deleteStudentRef(deleteStudentVars);
// Variables can be defined inline as well.
const ref = deleteStudentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStudentRef(dataConnect, deleteStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_delete);
});
```

## UpdateStudent
You can execute the `UpdateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentRef:
```typescript
const name = updateStudentRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentVariables {
  id: string;
  schoolClassId: string;
  studentNumber: string;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `UpdateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudent, UpdateStudentVariables } from '@visible-thinking/dataconnect';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  id: ...,
  schoolClassId: ...,
  studentNumber: ...,
  name: ...,
};

// Call the `updateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudent(updateStudentVars);
// Variables can be defined inline as well.
const { data } = await updateStudent({ id: ..., schoolClassId: ..., studentNumber: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudent(dataConnect, updateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
updateStudent(updateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `UpdateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentRef, UpdateStudentVariables } from '@visible-thinking/dataconnect';

// The `UpdateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  id: ...,
  schoolClassId: ...,
  studentNumber: ...,
  name: ...,
};

// Call the `updateStudentRef()` function to get a reference to the mutation.
const ref = updateStudentRef(updateStudentVars);
// Variables can be defined inline as well.
const ref = updateStudentRef({ id: ..., schoolClassId: ..., studentNumber: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentRef(dataConnect, updateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## DeleteSchoolClass
You can execute the `DeleteSchoolClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSchoolClass(vars: DeleteSchoolClassVariables): MutationPromise<DeleteSchoolClassData, DeleteSchoolClassVariables>;

interface DeleteSchoolClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSchoolClassVariables): MutationRef<DeleteSchoolClassData, DeleteSchoolClassVariables>;
}
export const deleteSchoolClassRef: DeleteSchoolClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSchoolClass(dc: DataConnect, vars: DeleteSchoolClassVariables): MutationPromise<DeleteSchoolClassData, DeleteSchoolClassVariables>;

interface DeleteSchoolClassRef {
  ...
  (dc: DataConnect, vars: DeleteSchoolClassVariables): MutationRef<DeleteSchoolClassData, DeleteSchoolClassVariables>;
}
export const deleteSchoolClassRef: DeleteSchoolClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSchoolClassRef:
```typescript
const name = deleteSchoolClassRef.operationName;
console.log(name);
```

### Variables
The `DeleteSchoolClass` mutation requires an argument of type `DeleteSchoolClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSchoolClassVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteSchoolClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSchoolClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSchoolClassData {
  schoolClass_delete?: SchoolClass_Key | null;
}
```
### Using `DeleteSchoolClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSchoolClass, DeleteSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `DeleteSchoolClass` mutation requires an argument of type `DeleteSchoolClassVariables`:
const deleteSchoolClassVars: DeleteSchoolClassVariables = {
  id: ...,
};

// Call the `deleteSchoolClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSchoolClass(deleteSchoolClassVars);
// Variables can be defined inline as well.
const { data } = await deleteSchoolClass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSchoolClass(dataConnect, deleteSchoolClassVars);

console.log(data.schoolClass_delete);

// Or, you can use the `Promise` API.
deleteSchoolClass(deleteSchoolClassVars).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_delete);
});
```

### Using `DeleteSchoolClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSchoolClassRef, DeleteSchoolClassVariables } from '@visible-thinking/dataconnect';

// The `DeleteSchoolClass` mutation requires an argument of type `DeleteSchoolClassVariables`:
const deleteSchoolClassVars: DeleteSchoolClassVariables = {
  id: ...,
};

// Call the `deleteSchoolClassRef()` function to get a reference to the mutation.
const ref = deleteSchoolClassRef(deleteSchoolClassVars);
// Variables can be defined inline as well.
const ref = deleteSchoolClassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSchoolClassRef(dataConnect, deleteSchoolClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schoolClass_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schoolClass_delete);
});
```

## CreateActivity
You can execute the `CreateActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createActivity(vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface CreateActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
}
export const createActivityRef: CreateActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createActivity(dc: DataConnect, vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface CreateActivityRef {
  ...
  (dc: DataConnect, vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
}
export const createActivityRef: CreateActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createActivityRef:
```typescript
const name = createActivityRef.operationName;
console.log(name);
```

### Variables
The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateActivityData {
  activity_insert: Activity_Key;
}
```
### Using `CreateActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createActivity, CreateActivityVariables } from '@visible-thinking/dataconnect';

// The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`:
const createActivityVars: CreateActivityVariables = {
  id: ...,
  title: ...,
  routine: ...,
  activityMode: ...,
  subject: ...,
  status: ...,
  code: ...,
  materialType: ...,
  materialUrl: ..., // optional
  materialName: ..., // optional
  instructions: ..., // optional
  activityDate: ...,
  submittedCount: ...,
  targetCount: ...,
};

// Call the `createActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createActivity(createActivityVars);
// Variables can be defined inline as well.
const { data } = await createActivity({ id: ..., title: ..., routine: ..., activityMode: ..., subject: ..., status: ..., code: ..., materialType: ..., materialUrl: ..., materialName: ..., instructions: ..., activityDate: ..., submittedCount: ..., targetCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createActivity(dataConnect, createActivityVars);

console.log(data.activity_insert);

// Or, you can use the `Promise` API.
createActivity(createActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity_insert);
});
```

### Using `CreateActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createActivityRef, CreateActivityVariables } from '@visible-thinking/dataconnect';

// The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`:
const createActivityVars: CreateActivityVariables = {
  id: ...,
  title: ...,
  routine: ...,
  activityMode: ...,
  subject: ...,
  status: ...,
  code: ...,
  materialType: ...,
  materialUrl: ..., // optional
  materialName: ..., // optional
  instructions: ..., // optional
  activityDate: ...,
  submittedCount: ...,
  targetCount: ...,
};

// Call the `createActivityRef()` function to get a reference to the mutation.
const ref = createActivityRef(createActivityVars);
// Variables can be defined inline as well.
const ref = createActivityRef({ id: ..., title: ..., routine: ..., activityMode: ..., subject: ..., status: ..., code: ..., materialType: ..., materialUrl: ..., materialName: ..., instructions: ..., activityDate: ..., submittedCount: ..., targetCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createActivityRef(dataConnect, createActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_insert);
});
```

## DeleteActivity
You can execute the `DeleteActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteActivity(vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface DeleteActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
}
export const deleteActivityRef: DeleteActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteActivity(dc: DataConnect, vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface DeleteActivityRef {
  ...
  (dc: DataConnect, vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
}
export const deleteActivityRef: DeleteActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteActivityRef:
```typescript
const name = deleteActivityRef.operationName;
console.log(name);
```

### Variables
The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteActivityVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}
```
### Using `DeleteActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteActivity, DeleteActivityVariables } from '@visible-thinking/dataconnect';

// The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`:
const deleteActivityVars: DeleteActivityVariables = {
  id: ...,
};

// Call the `deleteActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteActivity(deleteActivityVars);
// Variables can be defined inline as well.
const { data } = await deleteActivity({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteActivity(dataConnect, deleteActivityVars);

console.log(data.activity_delete);

// Or, you can use the `Promise` API.
deleteActivity(deleteActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity_delete);
});
```

### Using `DeleteActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteActivityRef, DeleteActivityVariables } from '@visible-thinking/dataconnect';

// The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`:
const deleteActivityVars: DeleteActivityVariables = {
  id: ...,
};

// Call the `deleteActivityRef()` function to get a reference to the mutation.
const ref = deleteActivityRef(deleteActivityVars);
// Variables can be defined inline as well.
const ref = deleteActivityRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteActivityRef(dataConnect, deleteActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_delete);
});
```

## UpsertActivityClass
You can execute the `UpsertActivityClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertActivityClass(vars: UpsertActivityClassVariables): MutationPromise<UpsertActivityClassData, UpsertActivityClassVariables>;

interface UpsertActivityClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityClassVariables): MutationRef<UpsertActivityClassData, UpsertActivityClassVariables>;
}
export const upsertActivityClassRef: UpsertActivityClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertActivityClass(dc: DataConnect, vars: UpsertActivityClassVariables): MutationPromise<UpsertActivityClassData, UpsertActivityClassVariables>;

interface UpsertActivityClassRef {
  ...
  (dc: DataConnect, vars: UpsertActivityClassVariables): MutationRef<UpsertActivityClassData, UpsertActivityClassVariables>;
}
export const upsertActivityClassRef: UpsertActivityClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertActivityClassRef:
```typescript
const name = upsertActivityClassRef.operationName;
console.log(name);
```

### Variables
The `UpsertActivityClass` mutation requires an argument of type `UpsertActivityClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertActivityClassVariables {
  activityId: string;
  schoolClassId: string;
}
```
### Return Type
Recall that executing the `UpsertActivityClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertActivityClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertActivityClassData {
  activityClass_upsert: ActivityClass_Key;
}
```
### Using `UpsertActivityClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertActivityClass, UpsertActivityClassVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityClass` mutation requires an argument of type `UpsertActivityClassVariables`:
const upsertActivityClassVars: UpsertActivityClassVariables = {
  activityId: ...,
  schoolClassId: ...,
};

// Call the `upsertActivityClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertActivityClass(upsertActivityClassVars);
// Variables can be defined inline as well.
const { data } = await upsertActivityClass({ activityId: ..., schoolClassId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertActivityClass(dataConnect, upsertActivityClassVars);

console.log(data.activityClass_upsert);

// Or, you can use the `Promise` API.
upsertActivityClass(upsertActivityClassVars).then((response) => {
  const data = response.data;
  console.log(data.activityClass_upsert);
});
```

### Using `UpsertActivityClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertActivityClassRef, UpsertActivityClassVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityClass` mutation requires an argument of type `UpsertActivityClassVariables`:
const upsertActivityClassVars: UpsertActivityClassVariables = {
  activityId: ...,
  schoolClassId: ...,
};

// Call the `upsertActivityClassRef()` function to get a reference to the mutation.
const ref = upsertActivityClassRef(upsertActivityClassVars);
// Variables can be defined inline as well.
const ref = upsertActivityClassRef({ activityId: ..., schoolClassId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertActivityClassRef(dataConnect, upsertActivityClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityClass_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityClass_upsert);
});
```

## UpsertActivityAttendance
You can execute the `UpsertActivityAttendance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertActivityAttendance(vars: UpsertActivityAttendanceVariables): MutationPromise<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;

interface UpsertActivityAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityAttendanceVariables): MutationRef<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;
}
export const upsertActivityAttendanceRef: UpsertActivityAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertActivityAttendance(dc: DataConnect, vars: UpsertActivityAttendanceVariables): MutationPromise<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;

interface UpsertActivityAttendanceRef {
  ...
  (dc: DataConnect, vars: UpsertActivityAttendanceVariables): MutationRef<UpsertActivityAttendanceData, UpsertActivityAttendanceVariables>;
}
export const upsertActivityAttendanceRef: UpsertActivityAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertActivityAttendanceRef:
```typescript
const name = upsertActivityAttendanceRef.operationName;
console.log(name);
```

### Variables
The `UpsertActivityAttendance` mutation requires an argument of type `UpsertActivityAttendanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertActivityAttendanceVariables {
  activityId: string;
  studentId: string;
  status: AttendanceStatus;
}
```
### Return Type
Recall that executing the `UpsertActivityAttendance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertActivityAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertActivityAttendanceData {
  activityAttendance_upsert: ActivityAttendance_Key;
}
```
### Using `UpsertActivityAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertActivityAttendance, UpsertActivityAttendanceVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityAttendance` mutation requires an argument of type `UpsertActivityAttendanceVariables`:
const upsertActivityAttendanceVars: UpsertActivityAttendanceVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `upsertActivityAttendance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertActivityAttendance(upsertActivityAttendanceVars);
// Variables can be defined inline as well.
const { data } = await upsertActivityAttendance({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertActivityAttendance(dataConnect, upsertActivityAttendanceVars);

console.log(data.activityAttendance_upsert);

// Or, you can use the `Promise` API.
upsertActivityAttendance(upsertActivityAttendanceVars).then((response) => {
  const data = response.data;
  console.log(data.activityAttendance_upsert);
});
```

### Using `UpsertActivityAttendance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertActivityAttendanceRef, UpsertActivityAttendanceVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityAttendance` mutation requires an argument of type `UpsertActivityAttendanceVariables`:
const upsertActivityAttendanceVars: UpsertActivityAttendanceVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `upsertActivityAttendanceRef()` function to get a reference to the mutation.
const ref = upsertActivityAttendanceRef(upsertActivityAttendanceVars);
// Variables can be defined inline as well.
const ref = upsertActivityAttendanceRef({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertActivityAttendanceRef(dataConnect, upsertActivityAttendanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityAttendance_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityAttendance_upsert);
});
```

## UpsertActivityGroup
You can execute the `UpsertActivityGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertActivityGroup(vars: UpsertActivityGroupVariables): MutationPromise<UpsertActivityGroupData, UpsertActivityGroupVariables>;

interface UpsertActivityGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityGroupVariables): MutationRef<UpsertActivityGroupData, UpsertActivityGroupVariables>;
}
export const upsertActivityGroupRef: UpsertActivityGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertActivityGroup(dc: DataConnect, vars: UpsertActivityGroupVariables): MutationPromise<UpsertActivityGroupData, UpsertActivityGroupVariables>;

interface UpsertActivityGroupRef {
  ...
  (dc: DataConnect, vars: UpsertActivityGroupVariables): MutationRef<UpsertActivityGroupData, UpsertActivityGroupVariables>;
}
export const upsertActivityGroupRef: UpsertActivityGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertActivityGroupRef:
```typescript
const name = upsertActivityGroupRef.operationName;
console.log(name);
```

### Variables
The `UpsertActivityGroup` mutation requires an argument of type `UpsertActivityGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertActivityGroupVariables {
  id: string;
  activityId: string;
  name: string;
}
```
### Return Type
Recall that executing the `UpsertActivityGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertActivityGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertActivityGroupData {
  activityGroup_upsert: ActivityGroup_Key;
}
```
### Using `UpsertActivityGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertActivityGroup, UpsertActivityGroupVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityGroup` mutation requires an argument of type `UpsertActivityGroupVariables`:
const upsertActivityGroupVars: UpsertActivityGroupVariables = {
  id: ...,
  activityId: ...,
  name: ...,
};

// Call the `upsertActivityGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertActivityGroup(upsertActivityGroupVars);
// Variables can be defined inline as well.
const { data } = await upsertActivityGroup({ id: ..., activityId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertActivityGroup(dataConnect, upsertActivityGroupVars);

console.log(data.activityGroup_upsert);

// Or, you can use the `Promise` API.
upsertActivityGroup(upsertActivityGroupVars).then((response) => {
  const data = response.data;
  console.log(data.activityGroup_upsert);
});
```

### Using `UpsertActivityGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertActivityGroupRef, UpsertActivityGroupVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityGroup` mutation requires an argument of type `UpsertActivityGroupVariables`:
const upsertActivityGroupVars: UpsertActivityGroupVariables = {
  id: ...,
  activityId: ...,
  name: ...,
};

// Call the `upsertActivityGroupRef()` function to get a reference to the mutation.
const ref = upsertActivityGroupRef(upsertActivityGroupVars);
// Variables can be defined inline as well.
const ref = upsertActivityGroupRef({ id: ..., activityId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertActivityGroupRef(dataConnect, upsertActivityGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityGroup_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityGroup_upsert);
});
```

## UpsertActivityGroupMember
You can execute the `UpsertActivityGroupMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertActivityGroupMember(vars: UpsertActivityGroupMemberVariables): MutationPromise<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;

interface UpsertActivityGroupMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertActivityGroupMemberVariables): MutationRef<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;
}
export const upsertActivityGroupMemberRef: UpsertActivityGroupMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertActivityGroupMember(dc: DataConnect, vars: UpsertActivityGroupMemberVariables): MutationPromise<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;

interface UpsertActivityGroupMemberRef {
  ...
  (dc: DataConnect, vars: UpsertActivityGroupMemberVariables): MutationRef<UpsertActivityGroupMemberData, UpsertActivityGroupMemberVariables>;
}
export const upsertActivityGroupMemberRef: UpsertActivityGroupMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertActivityGroupMemberRef:
```typescript
const name = upsertActivityGroupMemberRef.operationName;
console.log(name);
```

### Variables
The `UpsertActivityGroupMember` mutation requires an argument of type `UpsertActivityGroupMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertActivityGroupMemberVariables {
  activityGroupId: string;
  studentId: string;
}
```
### Return Type
Recall that executing the `UpsertActivityGroupMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertActivityGroupMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertActivityGroupMemberData {
  activityGroupMember_upsert: ActivityGroupMember_Key;
}
```
### Using `UpsertActivityGroupMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertActivityGroupMember, UpsertActivityGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityGroupMember` mutation requires an argument of type `UpsertActivityGroupMemberVariables`:
const upsertActivityGroupMemberVars: UpsertActivityGroupMemberVariables = {
  activityGroupId: ...,
  studentId: ...,
};

// Call the `upsertActivityGroupMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertActivityGroupMember(upsertActivityGroupMemberVars);
// Variables can be defined inline as well.
const { data } = await upsertActivityGroupMember({ activityGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertActivityGroupMember(dataConnect, upsertActivityGroupMemberVars);

console.log(data.activityGroupMember_upsert);

// Or, you can use the `Promise` API.
upsertActivityGroupMember(upsertActivityGroupMemberVars).then((response) => {
  const data = response.data;
  console.log(data.activityGroupMember_upsert);
});
```

### Using `UpsertActivityGroupMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertActivityGroupMemberRef, UpsertActivityGroupMemberVariables } from '@visible-thinking/dataconnect';

// The `UpsertActivityGroupMember` mutation requires an argument of type `UpsertActivityGroupMemberVariables`:
const upsertActivityGroupMemberVars: UpsertActivityGroupMemberVariables = {
  activityGroupId: ...,
  studentId: ...,
};

// Call the `upsertActivityGroupMemberRef()` function to get a reference to the mutation.
const ref = upsertActivityGroupMemberRef(upsertActivityGroupMemberVars);
// Variables can be defined inline as well.
const ref = upsertActivityGroupMemberRef({ activityGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertActivityGroupMemberRef(dataConnect, upsertActivityGroupMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityGroupMember_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityGroupMember_upsert);
});
```

## UpsertIndividualSubmission
You can execute the `UpsertIndividualSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertIndividualSubmission(vars: UpsertIndividualSubmissionVariables): MutationPromise<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;

interface UpsertIndividualSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertIndividualSubmissionVariables): MutationRef<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;
}
export const upsertIndividualSubmissionRef: UpsertIndividualSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertIndividualSubmission(dc: DataConnect, vars: UpsertIndividualSubmissionVariables): MutationPromise<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;

interface UpsertIndividualSubmissionRef {
  ...
  (dc: DataConnect, vars: UpsertIndividualSubmissionVariables): MutationRef<UpsertIndividualSubmissionData, UpsertIndividualSubmissionVariables>;
}
export const upsertIndividualSubmissionRef: UpsertIndividualSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertIndividualSubmissionRef:
```typescript
const name = upsertIndividualSubmissionRef.operationName;
console.log(name);
```

### Variables
The `UpsertIndividualSubmission` mutation requires an argument of type `UpsertIndividualSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertIndividualSubmissionVariables {
  activityId: string;
  studentId: string;
  status: SubmissionStatus;
}
```
### Return Type
Recall that executing the `UpsertIndividualSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertIndividualSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertIndividualSubmissionData {
  individualSubmission_upsert: IndividualSubmission_Key;
}
```
### Using `UpsertIndividualSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertIndividualSubmission, UpsertIndividualSubmissionVariables } from '@visible-thinking/dataconnect';

// The `UpsertIndividualSubmission` mutation requires an argument of type `UpsertIndividualSubmissionVariables`:
const upsertIndividualSubmissionVars: UpsertIndividualSubmissionVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `upsertIndividualSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertIndividualSubmission(upsertIndividualSubmissionVars);
// Variables can be defined inline as well.
const { data } = await upsertIndividualSubmission({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertIndividualSubmission(dataConnect, upsertIndividualSubmissionVars);

console.log(data.individualSubmission_upsert);

// Or, you can use the `Promise` API.
upsertIndividualSubmission(upsertIndividualSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.individualSubmission_upsert);
});
```

### Using `UpsertIndividualSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertIndividualSubmissionRef, UpsertIndividualSubmissionVariables } from '@visible-thinking/dataconnect';

// The `UpsertIndividualSubmission` mutation requires an argument of type `UpsertIndividualSubmissionVariables`:
const upsertIndividualSubmissionVars: UpsertIndividualSubmissionVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `upsertIndividualSubmissionRef()` function to get a reference to the mutation.
const ref = upsertIndividualSubmissionRef(upsertIndividualSubmissionVars);
// Variables can be defined inline as well.
const ref = upsertIndividualSubmissionRef({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertIndividualSubmissionRef(dataConnect, upsertIndividualSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.individualSubmission_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.individualSubmission_upsert);
});
```

## UpsertGroupSubmission
You can execute the `UpsertGroupSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertGroupSubmission(vars: UpsertGroupSubmissionVariables): MutationPromise<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;

interface UpsertGroupSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGroupSubmissionVariables): MutationRef<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;
}
export const upsertGroupSubmissionRef: UpsertGroupSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertGroupSubmission(dc: DataConnect, vars: UpsertGroupSubmissionVariables): MutationPromise<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;

interface UpsertGroupSubmissionRef {
  ...
  (dc: DataConnect, vars: UpsertGroupSubmissionVariables): MutationRef<UpsertGroupSubmissionData, UpsertGroupSubmissionVariables>;
}
export const upsertGroupSubmissionRef: UpsertGroupSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertGroupSubmissionRef:
```typescript
const name = upsertGroupSubmissionRef.operationName;
console.log(name);
```

### Variables
The `UpsertGroupSubmission` mutation requires an argument of type `UpsertGroupSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertGroupSubmissionVariables {
  activityId: string;
  activityGroupId: string;
  status: SubmissionStatus;
}
```
### Return Type
Recall that executing the `UpsertGroupSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertGroupSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertGroupSubmissionData {
  groupSubmission_upsert: GroupSubmission_Key;
}
```
### Using `UpsertGroupSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertGroupSubmission, UpsertGroupSubmissionVariables } from '@visible-thinking/dataconnect';

// The `UpsertGroupSubmission` mutation requires an argument of type `UpsertGroupSubmissionVariables`:
const upsertGroupSubmissionVars: UpsertGroupSubmissionVariables = {
  activityId: ...,
  activityGroupId: ...,
  status: ...,
};

// Call the `upsertGroupSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertGroupSubmission(upsertGroupSubmissionVars);
// Variables can be defined inline as well.
const { data } = await upsertGroupSubmission({ activityId: ..., activityGroupId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertGroupSubmission(dataConnect, upsertGroupSubmissionVars);

console.log(data.groupSubmission_upsert);

// Or, you can use the `Promise` API.
upsertGroupSubmission(upsertGroupSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.groupSubmission_upsert);
});
```

### Using `UpsertGroupSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertGroupSubmissionRef, UpsertGroupSubmissionVariables } from '@visible-thinking/dataconnect';

// The `UpsertGroupSubmission` mutation requires an argument of type `UpsertGroupSubmissionVariables`:
const upsertGroupSubmissionVars: UpsertGroupSubmissionVariables = {
  activityId: ...,
  activityGroupId: ...,
  status: ...,
};

// Call the `upsertGroupSubmissionRef()` function to get a reference to the mutation.
const ref = upsertGroupSubmissionRef(upsertGroupSubmissionVars);
// Variables can be defined inline as well.
const ref = upsertGroupSubmissionRef({ activityId: ..., activityGroupId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertGroupSubmissionRef(dataConnect, upsertGroupSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupSubmission_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupSubmission_upsert);
});
```

## UpsertGroupSubmissionAgreement
You can execute the `UpsertGroupSubmissionAgreement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertGroupSubmissionAgreement(vars: UpsertGroupSubmissionAgreementVariables): MutationPromise<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;

interface UpsertGroupSubmissionAgreementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGroupSubmissionAgreementVariables): MutationRef<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;
}
export const upsertGroupSubmissionAgreementRef: UpsertGroupSubmissionAgreementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertGroupSubmissionAgreement(dc: DataConnect, vars: UpsertGroupSubmissionAgreementVariables): MutationPromise<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;

interface UpsertGroupSubmissionAgreementRef {
  ...
  (dc: DataConnect, vars: UpsertGroupSubmissionAgreementVariables): MutationRef<UpsertGroupSubmissionAgreementData, UpsertGroupSubmissionAgreementVariables>;
}
export const upsertGroupSubmissionAgreementRef: UpsertGroupSubmissionAgreementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertGroupSubmissionAgreementRef:
```typescript
const name = upsertGroupSubmissionAgreementRef.operationName;
console.log(name);
```

### Variables
The `UpsertGroupSubmissionAgreement` mutation requires an argument of type `UpsertGroupSubmissionAgreementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertGroupSubmissionAgreementVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  agreed: boolean;
}
```
### Return Type
Recall that executing the `UpsertGroupSubmissionAgreement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertGroupSubmissionAgreementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertGroupSubmissionAgreementData {
  groupSubmissionAgreement_upsert: GroupSubmissionAgreement_Key;
}
```
### Using `UpsertGroupSubmissionAgreement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertGroupSubmissionAgreement, UpsertGroupSubmissionAgreementVariables } from '@visible-thinking/dataconnect';

// The `UpsertGroupSubmissionAgreement` mutation requires an argument of type `UpsertGroupSubmissionAgreementVariables`:
const upsertGroupSubmissionAgreementVars: UpsertGroupSubmissionAgreementVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  agreed: ...,
};

// Call the `upsertGroupSubmissionAgreement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertGroupSubmissionAgreement(upsertGroupSubmissionAgreementVars);
// Variables can be defined inline as well.
const { data } = await upsertGroupSubmissionAgreement({ activityId: ..., activityGroupId: ..., studentId: ..., agreed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertGroupSubmissionAgreement(dataConnect, upsertGroupSubmissionAgreementVars);

console.log(data.groupSubmissionAgreement_upsert);

// Or, you can use the `Promise` API.
upsertGroupSubmissionAgreement(upsertGroupSubmissionAgreementVars).then((response) => {
  const data = response.data;
  console.log(data.groupSubmissionAgreement_upsert);
});
```

### Using `UpsertGroupSubmissionAgreement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertGroupSubmissionAgreementRef, UpsertGroupSubmissionAgreementVariables } from '@visible-thinking/dataconnect';

// The `UpsertGroupSubmissionAgreement` mutation requires an argument of type `UpsertGroupSubmissionAgreementVariables`:
const upsertGroupSubmissionAgreementVars: UpsertGroupSubmissionAgreementVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  agreed: ...,
};

// Call the `upsertGroupSubmissionAgreementRef()` function to get a reference to the mutation.
const ref = upsertGroupSubmissionAgreementRef(upsertGroupSubmissionAgreementVars);
// Variables can be defined inline as well.
const ref = upsertGroupSubmissionAgreementRef({ activityId: ..., activityGroupId: ..., studentId: ..., agreed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertGroupSubmissionAgreementRef(dataConnect, upsertGroupSubmissionAgreementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupSubmissionAgreement_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupSubmissionAgreement_upsert);
});
```

## UpsertMyThinkingCard
You can execute the `UpsertMyThinkingCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertMyThinkingCard(vars: UpsertMyThinkingCardVariables): MutationPromise<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;

interface UpsertMyThinkingCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyThinkingCardVariables): MutationRef<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;
}
export const upsertMyThinkingCardRef: UpsertMyThinkingCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyThinkingCard(dc: DataConnect, vars: UpsertMyThinkingCardVariables): MutationPromise<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;

interface UpsertMyThinkingCardRef {
  ...
  (dc: DataConnect, vars: UpsertMyThinkingCardVariables): MutationRef<UpsertMyThinkingCardData, UpsertMyThinkingCardVariables>;
}
export const upsertMyThinkingCardRef: UpsertMyThinkingCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyThinkingCardRef:
```typescript
const name = upsertMyThinkingCardRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyThinkingCard` mutation requires an argument of type `UpsertMyThinkingCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyThinkingCardVariables {
  externalId: string;
  activityId: string;
  studentId: string;
  column: RoutineColumn;
  content: string;
}
```
### Return Type
Recall that executing the `UpsertMyThinkingCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyThinkingCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyThinkingCardData {
  thinkingCard_upsert: ThinkingCard_Key;
}
```
### Using `UpsertMyThinkingCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyThinkingCard, UpsertMyThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyThinkingCard` mutation requires an argument of type `UpsertMyThinkingCardVariables`:
const upsertMyThinkingCardVars: UpsertMyThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  studentId: ...,
  column: ...,
  content: ...,
};

// Call the `upsertMyThinkingCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyThinkingCard(upsertMyThinkingCardVars);
// Variables can be defined inline as well.
const { data } = await upsertMyThinkingCard({ externalId: ..., activityId: ..., studentId: ..., column: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyThinkingCard(dataConnect, upsertMyThinkingCardVars);

console.log(data.thinkingCard_upsert);

// Or, you can use the `Promise` API.
upsertMyThinkingCard(upsertMyThinkingCardVars).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_upsert);
});
```

### Using `UpsertMyThinkingCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyThinkingCardRef, UpsertMyThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyThinkingCard` mutation requires an argument of type `UpsertMyThinkingCardVariables`:
const upsertMyThinkingCardVars: UpsertMyThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  studentId: ...,
  column: ...,
  content: ...,
};

// Call the `upsertMyThinkingCardRef()` function to get a reference to the mutation.
const ref = upsertMyThinkingCardRef(upsertMyThinkingCardVars);
// Variables can be defined inline as well.
const ref = upsertMyThinkingCardRef({ externalId: ..., activityId: ..., studentId: ..., column: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyThinkingCardRef(dataConnect, upsertMyThinkingCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.thinkingCard_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_upsert);
});
```

## DeleteMyThinkingCard
You can execute the `DeleteMyThinkingCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyThinkingCard(vars: DeleteMyThinkingCardVariables): MutationPromise<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;

interface DeleteMyThinkingCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyThinkingCardVariables): MutationRef<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;
}
export const deleteMyThinkingCardRef: DeleteMyThinkingCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyThinkingCard(dc: DataConnect, vars: DeleteMyThinkingCardVariables): MutationPromise<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;

interface DeleteMyThinkingCardRef {
  ...
  (dc: DataConnect, vars: DeleteMyThinkingCardVariables): MutationRef<DeleteMyThinkingCardData, DeleteMyThinkingCardVariables>;
}
export const deleteMyThinkingCardRef: DeleteMyThinkingCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyThinkingCardRef:
```typescript
const name = deleteMyThinkingCardRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyThinkingCard` mutation requires an argument of type `DeleteMyThinkingCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyThinkingCardVariables {
  externalId: string;
  activityId: string;
  studentId: string;
}
```
### Return Type
Recall that executing the `DeleteMyThinkingCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyThinkingCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyThinkingCardData {
  thinkingCard_delete?: ThinkingCard_Key | null;
}
```
### Using `DeleteMyThinkingCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyThinkingCard, DeleteMyThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `DeleteMyThinkingCard` mutation requires an argument of type `DeleteMyThinkingCardVariables`:
const deleteMyThinkingCardVars: DeleteMyThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  studentId: ...,
};

// Call the `deleteMyThinkingCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyThinkingCard(deleteMyThinkingCardVars);
// Variables can be defined inline as well.
const { data } = await deleteMyThinkingCard({ externalId: ..., activityId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyThinkingCard(dataConnect, deleteMyThinkingCardVars);

console.log(data.thinkingCard_delete);

// Or, you can use the `Promise` API.
deleteMyThinkingCard(deleteMyThinkingCardVars).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_delete);
});
```

### Using `DeleteMyThinkingCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyThinkingCardRef, DeleteMyThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `DeleteMyThinkingCard` mutation requires an argument of type `DeleteMyThinkingCardVariables`:
const deleteMyThinkingCardVars: DeleteMyThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  studentId: ...,
};

// Call the `deleteMyThinkingCardRef()` function to get a reference to the mutation.
const ref = deleteMyThinkingCardRef(deleteMyThinkingCardVars);
// Variables can be defined inline as well.
const ref = deleteMyThinkingCardRef({ externalId: ..., activityId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyThinkingCardRef(dataConnect, deleteMyThinkingCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.thinkingCard_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.thinkingCard_delete);
});
```

## SetMyIndividualSubmission
You can execute the `SetMyIndividualSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setMyIndividualSubmission(vars: SetMyIndividualSubmissionVariables): MutationPromise<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;

interface SetMyIndividualSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyIndividualSubmissionVariables): MutationRef<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;
}
export const setMyIndividualSubmissionRef: SetMyIndividualSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMyIndividualSubmission(dc: DataConnect, vars: SetMyIndividualSubmissionVariables): MutationPromise<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;

interface SetMyIndividualSubmissionRef {
  ...
  (dc: DataConnect, vars: SetMyIndividualSubmissionVariables): MutationRef<SetMyIndividualSubmissionData, SetMyIndividualSubmissionVariables>;
}
export const setMyIndividualSubmissionRef: SetMyIndividualSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMyIndividualSubmissionRef:
```typescript
const name = setMyIndividualSubmissionRef.operationName;
console.log(name);
```

### Variables
The `SetMyIndividualSubmission` mutation requires an argument of type `SetMyIndividualSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMyIndividualSubmissionVariables {
  activityId: string;
  studentId: string;
  status: SubmissionStatus;
}
```
### Return Type
Recall that executing the `SetMyIndividualSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMyIndividualSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMyIndividualSubmissionData {
  individualSubmission_upsert: IndividualSubmission_Key;
}
```
### Using `SetMyIndividualSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMyIndividualSubmission, SetMyIndividualSubmissionVariables } from '@visible-thinking/dataconnect';

// The `SetMyIndividualSubmission` mutation requires an argument of type `SetMyIndividualSubmissionVariables`:
const setMyIndividualSubmissionVars: SetMyIndividualSubmissionVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `setMyIndividualSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMyIndividualSubmission(setMyIndividualSubmissionVars);
// Variables can be defined inline as well.
const { data } = await setMyIndividualSubmission({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMyIndividualSubmission(dataConnect, setMyIndividualSubmissionVars);

console.log(data.individualSubmission_upsert);

// Or, you can use the `Promise` API.
setMyIndividualSubmission(setMyIndividualSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.individualSubmission_upsert);
});
```

### Using `SetMyIndividualSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMyIndividualSubmissionRef, SetMyIndividualSubmissionVariables } from '@visible-thinking/dataconnect';

// The `SetMyIndividualSubmission` mutation requires an argument of type `SetMyIndividualSubmissionVariables`:
const setMyIndividualSubmissionVars: SetMyIndividualSubmissionVariables = {
  activityId: ...,
  studentId: ...,
  status: ...,
};

// Call the `setMyIndividualSubmissionRef()` function to get a reference to the mutation.
const ref = setMyIndividualSubmissionRef(setMyIndividualSubmissionVars);
// Variables can be defined inline as well.
const ref = setMyIndividualSubmissionRef({ activityId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMyIndividualSubmissionRef(dataConnect, setMyIndividualSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.individualSubmission_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.individualSubmission_upsert);
});
```

## UpsertMyGroupThinkingCard
You can execute the `UpsertMyGroupThinkingCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertMyGroupThinkingCard(vars: UpsertMyGroupThinkingCardVariables): MutationPromise<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;

interface UpsertMyGroupThinkingCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertMyGroupThinkingCardVariables): MutationRef<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;
}
export const upsertMyGroupThinkingCardRef: UpsertMyGroupThinkingCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertMyGroupThinkingCard(dc: DataConnect, vars: UpsertMyGroupThinkingCardVariables): MutationPromise<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;

interface UpsertMyGroupThinkingCardRef {
  ...
  (dc: DataConnect, vars: UpsertMyGroupThinkingCardVariables): MutationRef<UpsertMyGroupThinkingCardData, UpsertMyGroupThinkingCardVariables>;
}
export const upsertMyGroupThinkingCardRef: UpsertMyGroupThinkingCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertMyGroupThinkingCardRef:
```typescript
const name = upsertMyGroupThinkingCardRef.operationName;
console.log(name);
```

### Variables
The `UpsertMyGroupThinkingCard` mutation requires an argument of type `UpsertMyGroupThinkingCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertMyGroupThinkingCardVariables {
  externalId: string;
  activityId: string;
  activityGroupId: string;
  studentId: string;
  column: RoutineColumn;
  content: string;
}
```
### Return Type
Recall that executing the `UpsertMyGroupThinkingCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertMyGroupThinkingCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertMyGroupThinkingCardData {
  groupThinkingCard_upsert: GroupThinkingCard_Key;
}
```
### Using `UpsertMyGroupThinkingCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertMyGroupThinkingCard, UpsertMyGroupThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyGroupThinkingCard` mutation requires an argument of type `UpsertMyGroupThinkingCardVariables`:
const upsertMyGroupThinkingCardVars: UpsertMyGroupThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  column: ...,
  content: ...,
};

// Call the `upsertMyGroupThinkingCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertMyGroupThinkingCard(upsertMyGroupThinkingCardVars);
// Variables can be defined inline as well.
const { data } = await upsertMyGroupThinkingCard({ externalId: ..., activityId: ..., activityGroupId: ..., studentId: ..., column: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertMyGroupThinkingCard(dataConnect, upsertMyGroupThinkingCardVars);

console.log(data.groupThinkingCard_upsert);

// Or, you can use the `Promise` API.
upsertMyGroupThinkingCard(upsertMyGroupThinkingCardVars).then((response) => {
  const data = response.data;
  console.log(data.groupThinkingCard_upsert);
});
```

### Using `UpsertMyGroupThinkingCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertMyGroupThinkingCardRef, UpsertMyGroupThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `UpsertMyGroupThinkingCard` mutation requires an argument of type `UpsertMyGroupThinkingCardVariables`:
const upsertMyGroupThinkingCardVars: UpsertMyGroupThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  column: ...,
  content: ...,
};

// Call the `upsertMyGroupThinkingCardRef()` function to get a reference to the mutation.
const ref = upsertMyGroupThinkingCardRef(upsertMyGroupThinkingCardVars);
// Variables can be defined inline as well.
const ref = upsertMyGroupThinkingCardRef({ externalId: ..., activityId: ..., activityGroupId: ..., studentId: ..., column: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertMyGroupThinkingCardRef(dataConnect, upsertMyGroupThinkingCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupThinkingCard_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupThinkingCard_upsert);
});
```

## DeleteMyGroupThinkingCard
You can execute the `DeleteMyGroupThinkingCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyGroupThinkingCard(vars: DeleteMyGroupThinkingCardVariables): MutationPromise<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;

interface DeleteMyGroupThinkingCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMyGroupThinkingCardVariables): MutationRef<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;
}
export const deleteMyGroupThinkingCardRef: DeleteMyGroupThinkingCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyGroupThinkingCard(dc: DataConnect, vars: DeleteMyGroupThinkingCardVariables): MutationPromise<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;

interface DeleteMyGroupThinkingCardRef {
  ...
  (dc: DataConnect, vars: DeleteMyGroupThinkingCardVariables): MutationRef<DeleteMyGroupThinkingCardData, DeleteMyGroupThinkingCardVariables>;
}
export const deleteMyGroupThinkingCardRef: DeleteMyGroupThinkingCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyGroupThinkingCardRef:
```typescript
const name = deleteMyGroupThinkingCardRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyGroupThinkingCard` mutation requires an argument of type `DeleteMyGroupThinkingCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMyGroupThinkingCardVariables {
  externalId: string;
  activityId: string;
  activityGroupId: string;
  studentId: string;
}
```
### Return Type
Recall that executing the `DeleteMyGroupThinkingCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyGroupThinkingCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyGroupThinkingCardData {
  groupThinkingCard_delete?: GroupThinkingCard_Key | null;
}
```
### Using `DeleteMyGroupThinkingCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyGroupThinkingCard, DeleteMyGroupThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `DeleteMyGroupThinkingCard` mutation requires an argument of type `DeleteMyGroupThinkingCardVariables`:
const deleteMyGroupThinkingCardVars: DeleteMyGroupThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
};

// Call the `deleteMyGroupThinkingCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyGroupThinkingCard(deleteMyGroupThinkingCardVars);
// Variables can be defined inline as well.
const { data } = await deleteMyGroupThinkingCard({ externalId: ..., activityId: ..., activityGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyGroupThinkingCard(dataConnect, deleteMyGroupThinkingCardVars);

console.log(data.groupThinkingCard_delete);

// Or, you can use the `Promise` API.
deleteMyGroupThinkingCard(deleteMyGroupThinkingCardVars).then((response) => {
  const data = response.data;
  console.log(data.groupThinkingCard_delete);
});
```

### Using `DeleteMyGroupThinkingCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyGroupThinkingCardRef, DeleteMyGroupThinkingCardVariables } from '@visible-thinking/dataconnect';

// The `DeleteMyGroupThinkingCard` mutation requires an argument of type `DeleteMyGroupThinkingCardVariables`:
const deleteMyGroupThinkingCardVars: DeleteMyGroupThinkingCardVariables = {
  externalId: ...,
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
};

// Call the `deleteMyGroupThinkingCardRef()` function to get a reference to the mutation.
const ref = deleteMyGroupThinkingCardRef(deleteMyGroupThinkingCardVars);
// Variables can be defined inline as well.
const ref = deleteMyGroupThinkingCardRef({ externalId: ..., activityId: ..., activityGroupId: ..., studentId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyGroupThinkingCardRef(dataConnect, deleteMyGroupThinkingCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupThinkingCard_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupThinkingCard_delete);
});
```

## SetMyGroupAgreement
You can execute the `SetMyGroupAgreement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setMyGroupAgreement(vars: SetMyGroupAgreementVariables): MutationPromise<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;

interface SetMyGroupAgreementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyGroupAgreementVariables): MutationRef<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;
}
export const setMyGroupAgreementRef: SetMyGroupAgreementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMyGroupAgreement(dc: DataConnect, vars: SetMyGroupAgreementVariables): MutationPromise<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;

interface SetMyGroupAgreementRef {
  ...
  (dc: DataConnect, vars: SetMyGroupAgreementVariables): MutationRef<SetMyGroupAgreementData, SetMyGroupAgreementVariables>;
}
export const setMyGroupAgreementRef: SetMyGroupAgreementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMyGroupAgreementRef:
```typescript
const name = setMyGroupAgreementRef.operationName;
console.log(name);
```

### Variables
The `SetMyGroupAgreement` mutation requires an argument of type `SetMyGroupAgreementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMyGroupAgreementVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  agreed: boolean;
}
```
### Return Type
Recall that executing the `SetMyGroupAgreement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMyGroupAgreementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMyGroupAgreementData {
  groupSubmissionAgreement_upsert: GroupSubmissionAgreement_Key;
}
```
### Using `SetMyGroupAgreement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMyGroupAgreement, SetMyGroupAgreementVariables } from '@visible-thinking/dataconnect';

// The `SetMyGroupAgreement` mutation requires an argument of type `SetMyGroupAgreementVariables`:
const setMyGroupAgreementVars: SetMyGroupAgreementVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  agreed: ...,
};

// Call the `setMyGroupAgreement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMyGroupAgreement(setMyGroupAgreementVars);
// Variables can be defined inline as well.
const { data } = await setMyGroupAgreement({ activityId: ..., activityGroupId: ..., studentId: ..., agreed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMyGroupAgreement(dataConnect, setMyGroupAgreementVars);

console.log(data.groupSubmissionAgreement_upsert);

// Or, you can use the `Promise` API.
setMyGroupAgreement(setMyGroupAgreementVars).then((response) => {
  const data = response.data;
  console.log(data.groupSubmissionAgreement_upsert);
});
```

### Using `SetMyGroupAgreement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMyGroupAgreementRef, SetMyGroupAgreementVariables } from '@visible-thinking/dataconnect';

// The `SetMyGroupAgreement` mutation requires an argument of type `SetMyGroupAgreementVariables`:
const setMyGroupAgreementVars: SetMyGroupAgreementVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  agreed: ...,
};

// Call the `setMyGroupAgreementRef()` function to get a reference to the mutation.
const ref = setMyGroupAgreementRef(setMyGroupAgreementVars);
// Variables can be defined inline as well.
const ref = setMyGroupAgreementRef({ activityId: ..., activityGroupId: ..., studentId: ..., agreed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMyGroupAgreementRef(dataConnect, setMyGroupAgreementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupSubmissionAgreement_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupSubmissionAgreement_upsert);
});
```

## SetMyGroupSubmission
You can execute the `SetMyGroupSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setMyGroupSubmission(vars: SetMyGroupSubmissionVariables): MutationPromise<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;

interface SetMyGroupSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMyGroupSubmissionVariables): MutationRef<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
}
export const setMyGroupSubmissionRef: SetMyGroupSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMyGroupSubmission(dc: DataConnect, vars: SetMyGroupSubmissionVariables): MutationPromise<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;

interface SetMyGroupSubmissionRef {
  ...
  (dc: DataConnect, vars: SetMyGroupSubmissionVariables): MutationRef<SetMyGroupSubmissionData, SetMyGroupSubmissionVariables>;
}
export const setMyGroupSubmissionRef: SetMyGroupSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMyGroupSubmissionRef:
```typescript
const name = setMyGroupSubmissionRef.operationName;
console.log(name);
```

### Variables
The `SetMyGroupSubmission` mutation requires an argument of type `SetMyGroupSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMyGroupSubmissionVariables {
  activityId: string;
  activityGroupId: string;
  studentId: string;
  status: SubmissionStatus;
}
```
### Return Type
Recall that executing the `SetMyGroupSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMyGroupSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMyGroupSubmissionData {
  groupSubmission_upsert: GroupSubmission_Key;
}
```
### Using `SetMyGroupSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMyGroupSubmission, SetMyGroupSubmissionVariables } from '@visible-thinking/dataconnect';

// The `SetMyGroupSubmission` mutation requires an argument of type `SetMyGroupSubmissionVariables`:
const setMyGroupSubmissionVars: SetMyGroupSubmissionVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  status: ...,
};

// Call the `setMyGroupSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMyGroupSubmission(setMyGroupSubmissionVars);
// Variables can be defined inline as well.
const { data } = await setMyGroupSubmission({ activityId: ..., activityGroupId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMyGroupSubmission(dataConnect, setMyGroupSubmissionVars);

console.log(data.groupSubmission_upsert);

// Or, you can use the `Promise` API.
setMyGroupSubmission(setMyGroupSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.groupSubmission_upsert);
});
```

### Using `SetMyGroupSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMyGroupSubmissionRef, SetMyGroupSubmissionVariables } from '@visible-thinking/dataconnect';

// The `SetMyGroupSubmission` mutation requires an argument of type `SetMyGroupSubmissionVariables`:
const setMyGroupSubmissionVars: SetMyGroupSubmissionVariables = {
  activityId: ...,
  activityGroupId: ...,
  studentId: ...,
  status: ...,
};

// Call the `setMyGroupSubmissionRef()` function to get a reference to the mutation.
const ref = setMyGroupSubmissionRef(setMyGroupSubmissionVars);
// Variables can be defined inline as well.
const ref = setMyGroupSubmissionRef({ activityId: ..., activityGroupId: ..., studentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMyGroupSubmissionRef(dataConnect, setMyGroupSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupSubmission_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupSubmission_upsert);
});
```
