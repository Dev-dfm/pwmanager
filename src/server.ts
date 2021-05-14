import {
  askForMainPassword,
  askForNewCredential,
  chooseCommand,
  chooseService,
} from './utils/questions';
import { isMainPasswordValid, isNewCredentialValid } from './utils/validation';
// import { printPassword } from './utils/messages';
import { readCredentials, saveCredentials } from './utils/credentials';
import CryptoJS from 'crypto-js';

const start = async () => {
  let mainPassword = await askForMainPassword();
  // validation of mainPassword
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid');
    mainPassword = await askForMainPassword();
  }
  console.log('is valid');

  // save chosen command (List / Add)
  const command = await chooseCommand();

  switch (command) {
    // Case: List all credentials
    case 'list':
      {
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.service
        );
        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.service === service
        );
        if (selectedService) {
          const decrypted = CryptoJS.AES.decrypt(
            selectedService.password,
            'BatmanAndRobin'
          );
          console.log(
            `*** Your password for ${
              selectedService.service
            } is ${decrypted.toString(CryptoJS.enc.Utf8)} ***`
          );
        }
      }
      break;
    // Case: Add new credentials
    case 'add':
      {
        let newCredential = await askForNewCredential();
        while (await isNewCredentialValid(newCredential)) {
          console.log(
            `The service name "${newCredential.service}" has already been assigned. Please choose an other service name`
          );
          newCredential = await askForNewCredential();
        }
        // Save new credential
        await saveCredentials(newCredential);
        console.log(
          `Your entries for ${newCredential.service} have been saved`
        );
      }
      break;
  }
};

start();
