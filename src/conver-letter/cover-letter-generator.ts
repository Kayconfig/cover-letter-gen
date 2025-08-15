import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { COVER_LETTER_GENERATOR_PROMPT } from './constants';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { createHumanMsg } from '../utils/create-human-message';
import { GenerateCoverLetterState } from './interfaces/generate-cover-letter-state';

export async function generateCoverLetter(
  state: GenerateCoverLetterState,
  llm: InvokableLLM
): Promise<{ coverLetter: string }> {
  const msg = await ChatPromptTemplate.fromTemplate(
    COVER_LETTER_GENERATOR_PROMPT
  ).invoke({
    jobDescription: state.parsedJobDescription,
    resume: state.parsedResume,
  });

  const aiRes = await llm.invoke([createHumanMsg(msg.toString())]);
  return {
    coverLetter: aiRes.content.toString(),
  };
}

export async function coverLetterGenerator(state: State) {
  const llm = getOllamaModel(state.verbose);
  const converLetterState = await generateCoverLetter(state, llm);
  return converLetterState;
}
