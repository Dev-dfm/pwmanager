import fs from 'fs/promises';
import type { Credential } from '../types';
import AES from 'crypto-js/aes';
import { getCollection } from './database';

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile('./db.json', 'utf-8');
  const data: DB = JSON.parse(response);
  return data.credentials;
};

// export const saveCredentials = async (
//   newCredential: Credential
// ): Promise<void> => {
//   const credentials = await readCredentials();
//   credentials.push(newCredential);
//   const encryptPassword = AES.encrypt(
//     newCredential.password,
//     'BatmanAndRobin'
//   ).toString();
//   newCredential.password = encryptPassword;
//   await fs.writeFile(
//     './db.json',
//     JSON.stringify({ credentials: credentials }, null, 2),
//     'utf-8'
//   );
// };

export const saveCredentials = async (
  newCredential: Credential
): Promise<void> => {
  // Encrypt Password for newCredential
  const encryptPassword = AES.encrypt(
    newCredential.password,
    'BatmanAndRobin'
  ).toString();
  newCredential.password = encryptPassword;
  // Save newCredential to MongoDB
  await getCollection('credentials').insertOne(newCredential);
};
