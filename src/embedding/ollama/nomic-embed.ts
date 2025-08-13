import { OllamaEmbeddings } from '@langchain/ollama';
import { getSecretOrThrow } from '../../config/secret';
import { ENV_KEYS } from '../../config/env-keys';

function createNomicEmbedding() {
  const model = getSecretOrThrow(ENV_KEYS.OLLAMA_EMBEDDING_MODEL);
  return new OllamaEmbeddings({ model });
}
