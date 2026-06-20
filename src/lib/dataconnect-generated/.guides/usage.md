# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listActivities, getActivity, upsertSchoolClass, upsertStudent, upsertActivity, upsertActivityClass, upsertActivityAttendance, upsertActivityGroup, upsertActivityGroupMember, upsertIndividualSubmission } from '@visible-thinking/dataconnect';


// Operation ListActivities: 
const { data } = await ListActivities(dataConnect);

// Operation GetActivity:  For variables, look at type GetActivityVars in ../index.d.ts
const { data } = await GetActivity(dataConnect, getActivityVars);

// Operation UpsertSchoolClass:  For variables, look at type UpsertSchoolClassVars in ../index.d.ts
const { data } = await UpsertSchoolClass(dataConnect, upsertSchoolClassVars);

// Operation UpsertStudent:  For variables, look at type UpsertStudentVars in ../index.d.ts
const { data } = await UpsertStudent(dataConnect, upsertStudentVars);

// Operation UpsertActivity:  For variables, look at type UpsertActivityVars in ../index.d.ts
const { data } = await UpsertActivity(dataConnect, upsertActivityVars);

// Operation UpsertActivityClass:  For variables, look at type UpsertActivityClassVars in ../index.d.ts
const { data } = await UpsertActivityClass(dataConnect, upsertActivityClassVars);

// Operation UpsertActivityAttendance:  For variables, look at type UpsertActivityAttendanceVars in ../index.d.ts
const { data } = await UpsertActivityAttendance(dataConnect, upsertActivityAttendanceVars);

// Operation UpsertActivityGroup:  For variables, look at type UpsertActivityGroupVars in ../index.d.ts
const { data } = await UpsertActivityGroup(dataConnect, upsertActivityGroupVars);

// Operation UpsertActivityGroupMember:  For variables, look at type UpsertActivityGroupMemberVars in ../index.d.ts
const { data } = await UpsertActivityGroupMember(dataConnect, upsertActivityGroupMemberVars);

// Operation UpsertIndividualSubmission:  For variables, look at type UpsertIndividualSubmissionVars in ../index.d.ts
const { data } = await UpsertIndividualSubmission(dataConnect, upsertIndividualSubmissionVars);


```