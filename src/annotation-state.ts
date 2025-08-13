import { Annotation } from '@langchain/langgraph';

export const AnnotationState = Annotation.Root({
  verbose: Annotation<boolean>,
  resumePath: Annotation<string>,
  jobPath: Annotation<string>,
  summarizedResume: Annotation<string>,
  summarizedJobDescription: Annotation<string>,
  parsedResume: Annotation<string>,
  parsedJobDescription: Annotation<string>,
  jobMatchPercent: Annotation<number>,
  jobMatchReason: Annotation<string>,
  jobMisMatchReason: Annotation<string>,
  resumeImprovements: Annotation<string>,
  coverLetter: Annotation<string>,
});

export type State = typeof AnnotationState.State;
