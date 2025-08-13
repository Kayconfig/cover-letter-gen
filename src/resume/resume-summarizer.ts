import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { SUMMARIZE_RESUME_TEMPLATE } from './constants';
import { createSystemMsg } from '../utils/create-system-message';

export async function resumeSummarizer(state: State) {
  const llm = getOllamaModel(state.verbose);
  const chatpromptTemplate = ChatPromptTemplate.fromTemplate(
    SUMMARIZE_RESUME_TEMPLATE
  );
  const msg = (
    await chatpromptTemplate.invoke({ resumeJsonData: state.parsedResume })
  ).toString();
  const aiRes = await llm.invoke([createSystemMsg(msg)]);
  return { summarizedResume: aiRes.content };
}
