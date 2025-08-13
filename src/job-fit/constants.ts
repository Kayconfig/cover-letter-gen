export const JOB_FIT_PROMPT = `You are an expert resume and job description analyst. 
Analyse the following resume and job description and determine if the resume is a good fit for the job description.

<resume>
{resume}
</resume>

<jobDescription>
{jobDescription}
</jobDescription>

Your response should be a json that contains 
'score' - a number representing the percentage match on a scale of  1 - 100.
'matchReason' - reason(s) why the score is appropriate.
'misMatchReason' - reasons why the resume is not a match for the job description, leave empty if none.
Be as thorough as possible in your evaluations. No explanation, no prologue just the json.
`;
