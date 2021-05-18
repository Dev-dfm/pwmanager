import type { Credential } from '../types';
import { getCredentialsCollection } from './database';
import { chooseService } from './questions';
import CryptoJS from 'crypto-js';

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const saveCredentials = async (
  newCredential: Credential,
  mainPassword: string
): Promise<void> => {
  // Encrypt Password for newCredential
  encryptServicePassword(newCredential, mainPassword);
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

export const decryptServicePassword = async (
  selectedService: Credential,
  mainPassword: string
): Promise<string> => {
  return CryptoJS.AES.decrypt(selectedService.password, mainPassword).toString(
    CryptoJS.enc.Utf8
  );
};

const encryptServicePassword = (newCredential: Credential, mainPassword: string) => {
  newCredential.password = CryptoJS.AES.encrypt(
    newCredential.password,
    mainPassword
  ).toString();
}

