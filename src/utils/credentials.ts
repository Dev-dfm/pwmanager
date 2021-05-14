import fs from 'fs/promises';
import type { Credential } from '../types';

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile('./db.json', 'utf-8');
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  const credentials = await readCredentials();
  credentials.push(newCredential);
  await fs.writeFile(
    './db.json',
    JSON.stringify({ credentials: credentials }),
    'utf-8'
  );
};
