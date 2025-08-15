import { AIMessageChunk } from '@langchain/core/messages';

export function createAIMsgChunk(content: string): AIMessageChunk {
  return new AIMessageChunk({ content });
}
