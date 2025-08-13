export function getSecret(key: string): string | undefined {
  return process.env[key];
}

export function getSecretOrThrow(key: string): string {
  const value = getSecret(key);
  if (!value) {
    throw new Error(`error: ${key} is not set in environment`);
  }
  return value;
}
