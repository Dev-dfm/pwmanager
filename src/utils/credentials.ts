import type { Credential } from '../types';
import AES from 'crypto-js/aes';
import { getCredentialsCollection } from './database';
import { chooseService } from './questions';

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const saveCredentials = async (
  newCredential: Credential,
  mainPassword: string
): Promise<void> => {
  // Encrypt Password for newCredential
  newCredential.password = AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();
  // Save newCredential to MongoDB
  await getCredentialsCollection().insertOne(newCredential);
};

export const deleteCredential = async (service: Credential): Promise<void> => {
  await getCredentialsCollection().deleteOne(service);
};

export const selectService = async (): Promise<Credential> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );
  const service = await chooseService(credentialServices);
  const selectedService = credentials.find(
    (credential) => credential.service === service
  );
  if (!selectedService) {
    throw new Error('Can`t find credential');
  }
  return selectedService;
};
