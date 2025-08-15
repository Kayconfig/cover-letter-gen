import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { JOB_FIT_PROMPT } from './constants';
import { createSystemMsg } from '../utils/create-system-message';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { AggregateJobFitState } from './interface/aggregate-jobfit';
import { JobfitMeta } from './interface/job-fit-meta';

export async function aggregateJobFit(
  state: AggregateJobFitState,
  llm: InvokableLLM
): Promise<{
  jobMatchPercent: number;
  jobMatchReason: string;
  jobMisMatchReason: string;
}> {
  const chatPromptTemplate = await ChatPromptTemplate.fromTemplate(
    JOB_FIT_PROMPT
  ).invoke({
    jobDescription: state.parsedJobDescription,
    resume: state.parsedResume,
  });
  const msg = chatPromptTemplate.toString();

  const aiRes = await llm.invoke([createSystemMsg(msg)]);
  const data: JobfitMeta = JSON.parse(aiRes.content.toString());
  return {
    jobMatchPercent: data.score,
    jobMatchReason: data.matchReason,
    jobMisMatchReason: data.misMatchReason,
  };
}

export async function jobFitAggregator(state: State) {
  const llm = getOllamaModel(state.verbose);
  return await aggregateJobFit(state, llm);
}
