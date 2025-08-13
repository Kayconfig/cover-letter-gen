import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { COVER_LETTER_GENERATOR_PROMPT } from './constants';
import { createSystemMsg } from '../utils/create-system-message';

export async function coverLetterGenerator(state: State) {
  const llm = getOllamaModel(state.verbose);
  const msg = await ChatPromptTemplate.fromTemplate(
    COVER_LETTER_GENERATOR_PROMPT
  ).invoke({
    jobDescription: state.parsedJobDescription,
    resume: state.parsedResume,
  });

  const aiRes = await llm.invoke([createSystemMsg(msg.toString())]);
  return {
    coverLetter: aiRes.content.toString(),
  };
}
