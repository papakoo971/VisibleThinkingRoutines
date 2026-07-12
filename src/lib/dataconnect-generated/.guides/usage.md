# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getMyTeacherProfile, upsertMyTeacherProfile, deleteMyTeacherProfile, listActivities, getActivity, upsertSchoolClass, upsertStudent, createActivity, deleteActivity, upsertActivityClass } from '@visible-thinking/dataconnect';


// Operation GetMyTeacherProfile: 
const { data } = await GetMyTeacherProfile(dataConnect);

// Operation UpsertMyTeacherProfile:  For variables, look at type UpsertMyTeacherProfileVars in ../index.d.ts
const { data } = await UpsertMyTeacherProfile(dataConnect, upsertMyTeacherProfileVars);

// Operation DeleteMyTeacherProfile: 
const { data } = await DeleteMyTeacherProfile(dataConnect);

// Operation ListActivities: 
const { data } = await ListActivities(dataConnect);

// Operation GetActivity:  For variables, look at type GetActivityVars in ../index.d.ts
const { data } = await GetActivity(dataConnect, getActivityVars);

// Operation UpsertSchoolClass:  For variables, look at type UpsertSchoolClassVars in ../index.d.ts
const { data } = await UpsertSchoolClass(dataConnect, upsertSchoolClassVars);

// Operation UpsertStudent:  For variables, look at type UpsertStudentVars in ../index.d.ts
const { data } = await UpsertStudent(dataConnect, upsertStudentVars);

// Operation CreateActivity:  For variables, look at type CreateActivityVars in ../index.d.ts
const { data } = await CreateActivity(dataConnect, createActivityVars);

// Operation DeleteActivity:  For variables, look at type DeleteActivityVars in ../index.d.ts
const { data } = await DeleteActivity(dataConnect, deleteActivityVars);

// Operation UpsertActivityClass:  For variables, look at type UpsertActivityClassVars in ../index.d.ts
const { data } = await UpsertActivityClass(dataConnect, upsertActivityClassVars);


```