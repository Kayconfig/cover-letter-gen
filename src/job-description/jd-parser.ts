import { State } from '../annotation-state';
import { loadText } from '../loaders/txt-loader';
import { getOllamaModel } from '../models/ollama-model';
import { createHumanMsg } from '../utils/create-human-message';
import { PARSE_JD_TEMPLATE } from './constants';
import { ChatPromptTemplate } from '@langchain/core/prompts';

export async function jobDescriptionParser(state: State) {
  const jobPath = state.jobPath;
  const jdText = await loadText(jobPath);
  const llm = getOllamaModel(state.verbose);
  const chatPromptTemplate = ChatPromptTemplate.fromTemplate(PARSE_JD_TEMPLATE);
  const msg = await chatPromptTemplate.invoke({
    jd_text: JSON.stringify(jdText),
  });
  const aiMsg = await llm.invoke([createHumanMsg(msg.toString())]);

  return { parsedJobDescription: aiMsg.content };
}
