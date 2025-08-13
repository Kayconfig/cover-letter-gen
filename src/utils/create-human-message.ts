import { HumanMessage } from '@langchain/core/messages';

export function createHumanMsg(content: string) {
  return new HumanMessage({ content });
}
