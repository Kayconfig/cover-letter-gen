import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { RESUME_IMPROVEMENT_PROMPT } from './constants';
import { createSystemMsg } from '../utils/create-system-message';

export async function resumeImprovements(state: State) {
  const llm = getOllamaModel(state.verbose);
  const chatPromptTemplate = await ChatPromptTemplate.fromTemplate(
    RESUME_IMPROVEMENT_PROMPT
  ).invoke({
    jobDescription: state.parsedJobDescription,
    resume: state.parsedResume,
  });
  const msg = chatPromptTemplate.toString();

  const aiRes = await llm.invoke([createSystemMsg(msg)]);

  return {
    resumeImprovements: aiRes.content.toString(),
  };
}
