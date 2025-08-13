import { readFile } from 'node:fs/promises';

function getTimeoutSignal(): AbortSignal {
  const controller = new AbortController();
  const oneMinuteInMilliseconds = 60 * 1000;
  setTimeout(() => controller.abort(), oneMinuteInMilliseconds);
  return controller.signal;
}

export async function loadText(jdPath: string): Promise<string> {
  const signal = getTimeoutSignal();
  const content = await readFile(jdPath, { encoding: 'utf-8', signal });
  return content;
}
