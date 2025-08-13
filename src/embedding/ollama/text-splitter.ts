import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export function textSplitter(): RecursiveCharacterTextSplitter {
  return new RecursiveCharacterTextSplitter({
    chunkOverlap: 200,
    chunkSize: 2000,
  });
}
