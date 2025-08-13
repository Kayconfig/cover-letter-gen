import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { JOB_FIT_PROMPT } from './constants';
import { createSystemMsg } from '../utils/create-system-message';

export async function jobFitAggregator(state: State) {
  const llm = getOllamaModel(state.verbose);
  const chatPromptTemplate = await ChatPromptTemplate.fromTemplate(
    JOB_FIT_PROMPT
  ).invoke({
    jobDescription: state.parsedJobDescription,
    resume: state.parsedResume,
  });
  const msg = chatPromptTemplate.toString();

  const aiRes = await llm.invoke([createSystemMsg(msg)]);
  const data: { score: number; matchReason: string; misMatchReason: string } =
    JSON.parse(aiRes.content.toString());
  return {
    jobMatchPercent: data.score,
    jobMatchReason: data.matchReason,
    jobMisMatchReason: data.misMatchReason,
  };
}
