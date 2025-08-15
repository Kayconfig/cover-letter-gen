import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { RESUME_IMPROVEMENT_PROMPT } from './constants';
import { createSystemMsg } from '../utils/create-system-message';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { GenerateResumeImprovementState } from './interfaces/generate-resume-improvement';

export async function generateResumeImprovements(
  state: GenerateResumeImprovementState,
  llm: InvokableLLM
): Promise<{ resumeImprovements: string }> {
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

export async function resumeImprovementsGenerator(state: State) {
  const llm = getOllamaModel(state.verbose);
  return await generateResumeImprovements(state, llm);
}
