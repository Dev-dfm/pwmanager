import type { Credential } from '../types';
import AES from 'crypto-js/aes';
import { getCredentialsCollection } from './database';

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection()
    .find()
    .sort({ service: 1 })
    .toArray();
};

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
  await getCredentialsCollection().insertOne(newCredential);
};
