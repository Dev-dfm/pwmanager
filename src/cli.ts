import dotenv from 'dotenv';
import {
  askForMainPassword,
  askForNewCredential,
  chooseCommand,
} from './utils/questions';
import { isMainPasswordValid, isNewCredentialValid } from './utils/validation';
import { connectDatabase, disconnectDatabase } from './utils/database';

dotenv.config();
import {
  decryptServicePassword,
  deleteCredential,
  saveCredentials,
  selectService,
} from './utils/credentials';

const start = async () => {
  // Connect to MongoDB
  if (!process.env.MONGO_URL) {
    throw new Error('Missing env MONGO_URL');
  }
  await connectDatabase(process.env.MONGO_URL);

  let mainPassword = await askForMainPassword();
  // Validate of mainPassword
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid');
    mainPassword = await askForMainPassword();
  }
  console.log('is valid');

  // Save choosen command (List / Add)
  const command = await chooseCommand();

  switch (command) {
    // Case: List all credentials
    case 'list':
      {
        const selectedService = await selectService();
        // Decrypt Password from selected credential
        if (selectedService) {
          const decryptedPassword = await decryptServicePassword(
            selectedService,
            mainPassword
          );
          console.log(
            `*** Your password for ${selectedService.service} is ${decryptedPassword} ***`
          );
        }
      }
      break;
    // Case: Add new credentials
    case 'add':
      {
        let newCredential = await askForNewCredential();
        // Validate double username
        while (await isNewCredentialValid(newCredential)) {
          console.log(
            `The service name "${newCredential.service}" has already been assigned. Please choose an other service name`
          );
          newCredential = await askForNewCredential();
        }
        // Save new credential
        await saveCredentials(newCredential, mainPassword);
        console.log(
          `Your entries for ${newCredential.service} have been saved`
        );
      }
      break;
    // Case: Delete credential
    case 'delete':
      {
        const selectedService = await selectService();
        if (selectedService) {
          await deleteCredential(selectedService.service);
          console.log('Service was deleted');
        }
      }
      break;
  }
  // Disconnect from MongoDatabase
  await disconnectDatabase();
};

start();
