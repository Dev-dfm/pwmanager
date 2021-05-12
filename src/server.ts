import {
  askForMainPassword,
  askForNewCredential,
  chooseCommand,
  chooseService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import { printPassword } from './utils/messages';
import { readCredentials } from './utils/credentials';

// function start() {
const start = async () => {
  /* Solution with while */
  let mainPassword = await askForMainPassword();
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid');
    mainPassword = await askForMainPassword();
  }
  console.log('is valid');

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
        console.log(selectedService);
        printPassword(service);
      }
      break;
    // Case: Add new credentials
    case 'add':
      {
        const newCredential = await askForNewCredential();
        console.log(newCredential);
      }
      break;
  }
};

start();
