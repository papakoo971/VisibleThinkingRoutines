# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `teacher`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyTeacherProfile*](#getmyteacherprofile)
  - [*ListActivities*](#listactivities)
  - [*GetTeacherActivity*](#getteacheractivity)
  - [*ListMyStudents*](#listmystudents)
  - [*GetMyStudent*](#getmystudent)
  - [*ListMyStudentActivities*](#listmystudentactivities)
  - [*GetMyStudentActivity*](#getmystudentactivity)
- [**Mutations**](#mutations)
  - [*UpsertMyTeacherProfile*](#upsertmyteacherprofile)
  - [*DeleteMyTeacherProfile*](#deletemyteacherprofile)
  - [*LinkStudentAuth*](#linkstudentauth)
  - [*UnlinkStudentAuth*](#unlinkstudentauth)
  - [*UpsertSchoolClass*](#upsertschoolclass)
  - [*UpsertStudent*](#upsertstudent)
  - [*DeleteStudent*](#deletestudent)
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
  activityDate: ...,
  submittedCount: ...,
  targetCount: ...,
};

// Call the `createActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createActivity(createActivityVars);
// Variables can be defined inline as well.
const { data } = await createActivity({ id: ..., title: ..., routine: ..., activityMode: ..., subject: ..., status: ..., code: ..., materialType: ..., activityDate: ..., submittedCount: ..., targetCount: ..., });

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
  activityDate: ...,
  submittedCount: ...,
  targetCount: ...,
};

// Call the `createActivityRef()` function to get a reference to the mutation.
const ref = createActivityRef(createActivityVars);
// Variables can be defined inline as well.
const ref = createActivityRef({ id: ..., title: ..., routine: ..., activityMode: ..., subject: ..., status: ..., code: ..., materialType: ..., activityDate: ..., submittedCount: ..., targetCount: ..., });

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
