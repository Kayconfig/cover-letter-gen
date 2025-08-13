import { State } from '../annotation-state';
import { loadPdf } from '../loaders/pdf-loader';
import { getOllamaModel } from '../models/ollama-model';
import { createSystemMsg } from '../utils/create-system-message';
import { PARSE_RESUME_TEMPLATE } from './constants';
import { ChatPromptTemplate } from '@langchain/core/prompts';

export async function resumeParser(state: State) {
  const resumePath = state.resumePath;
  const pdfs = await loadPdf(resumePath);
  const llm = getOllamaModel(state.verbose);
  const chatPromptTemplate = ChatPromptTemplate.fromTemplate(
    PARSE_RESUME_TEMPLATE
  );
  const msg = await chatPromptTemplate.invoke({
    documents: JSON.stringify(pdfs),
  });
  const aiMsg = await llm.invoke([createSystemMsg(msg.toString())]);

  return { parsedResume: aiMsg.content };
}
