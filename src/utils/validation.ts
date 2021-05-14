import fs from 'fs/promises';
import sha256 from 'crypto-js/sha256';
import { readCredentials } from './credentials';
import type { Credential } from '../types';

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const passwordHash = await fs.readFile('./.password', 'utf-8');
  return sha256(plaintextPassword).toString() === passwordHash;
};

export const isNewCredentialValid = async (
  newCredential: Credential
): Promise<boolean> => {
  const credentials = await readCredentials();
  const credentialAllreadyUsed = credentials.some(
    (credential) => credential.service.toLowerCase() === newCredential.service.toLowerCase()
  );
  return credentialAllreadyUsed;
};
