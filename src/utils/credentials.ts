import type { Credential } from '../types';
import AES from 'crypto-js/aes';
import { getCollection } from './database';

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCollection('credentials')
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
  await getCollection('credentials').insertOne(newCredential);
};
