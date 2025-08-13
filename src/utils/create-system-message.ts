import { SystemMessage } from '@langchain/core/messages';

export function createSystemMsg(content: string) {
  return new SystemMessage({ content });
}
