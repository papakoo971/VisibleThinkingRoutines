# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getMyTeacherProfile, upsertMyTeacherProfile, deleteMyTeacherProfile, getMyAiCredential, upsertMyAiCredential, deleteMyAiCredential, listActivities, getTeacherActivity, upsertAiAnalysis, getTeacherActivityResults } from '@visible-thinking/dataconnect';


// Operation GetMyTeacherProfile:
const { data } = await GetMyTeacherProfile(dataConnect);

// Operation UpsertMyTeacherProfile:  For variables, look at type UpsertMyTeacherProfileVars in ../index.d.ts
const { data } = await UpsertMyTeacherProfile(dataConnect, upsertMyTeacherProfileVars);

// Operation DeleteMyTeacherProfile:
const { data } = await DeleteMyTeacherProfile(dataConnect);

// Operation GetMyAiCredential:
const { data } = await GetMyAiCredential(dataConnect);

// Operation UpsertMyAiCredential:  For variables, look at type UpsertMyAiCredentialVars in ../index.d.ts
const { data } = await UpsertMyAiCredential(dataConnect, upsertMyAiCredentialVars);

// Operation DeleteMyAiCredential:
const { data } = await DeleteMyAiCredential(dataConnect);

// Operation ListActivities:
const { data } = await ListActivities(dataConnect);

// Operation GetTeacherActivity:  For variables, look at type GetTeacherActivityVars in ../index.d.ts
const { data } = await GetTeacherActivity(dataConnect, getTeacherActivityVars);

// Operation UpsertAiAnalysis:  For variables, look at type UpsertAiAnalysisVars in ../index.d.ts
const { data } = await UpsertAiAnalysis(dataConnect, upsertAiAnalysisVars);

// Operation GetTeacherActivityResults:  For variables, look at type GetTeacherActivityResultsVars in ../index.d.ts
const { data } = await GetTeacherActivityResults(dataConnect, getTeacherActivityResultsVars);


```