import { ChatPromptTemplate } from '@langchain/core/prompts';
import { State } from '../annotation-state';
import { getOllamaModel } from '../models/ollama-model';
import { SUMMARIZE_JD_TEMPLATE } from './constants';
import { createHumanMsg } from '../utils/create-human-message';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { SummarizeJobDescription } from './intefaces/summarize-job-description';

export async function summarizeJobDescription(
  state: SummarizeJobDescription,
  llm: InvokableLLM
): Promise<{ summarizedJobDescription: string }> {
  const chatpromptTemplate = ChatPromptTemplate.fromTemplate(
    SUMMARIZE_JD_TEMPLATE
  );
  const msg = (
    await chatpromptTemplate.invoke({
      jd_json_text: state.parsedJobDescription,
    })
  ).toString();
  const aiRes = await llm.invoke([createHumanMsg(msg)]);
  return { summarizedJobDescription: aiRes.content.toString() };
}
export async function jobDescriptionSummarizer(state: State) {
  const llm = getOllamaModel(state.verbose);
  return summarizeJobDescription(state, llm);
}
