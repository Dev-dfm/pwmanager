import {
  askForMainPassword,
  askForNewCredential,
  chooseCommand,
  chooseService,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import { printPassword } from './utils/messages';

// function start() {
const start = async () => {
  /* Solution with while */
  let mainPassword = await askForMainPassword();
  while (!isMainPasswordValid(mainPassword)) {
    console.log('Is invalid');
    mainPassword = await askForMainPassword();
  }
  console.log('is valid');

  const command = await chooseCommand();

  switch (command) {
    // Case: List all credentials
    case 'list':
      {
        const service = await chooseService(['Github', 'Codewars', 'Google']);
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
