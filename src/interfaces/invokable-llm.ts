import { AIMessageChunk, BaseMessage } from '@langchain/core/messages';

export interface InvokableLLM {
  invoke: (msgs: Array<BaseMessage>) => Promise<AIMessageChunk>;
}
