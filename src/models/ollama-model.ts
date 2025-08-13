import { ChatOllama } from '@langchain/ollama';
import { ENV_KEYS } from '../config/env-keys';
import { getSecretOrThrow } from '../config/secret';

function createModel(verbose: boolean, model: string) {
  return new ChatOllama({
    model,
    verbose,
    temperature: 0,
  });
}

export function getOllamaModel(verbose: boolean = false) {
  const ollamaModelName = getSecretOrThrow(ENV_KEYS.OLLAMA_MODEL);
  return createModel(verbose, ollamaModelName);
}
