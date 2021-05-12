import inquirer from 'inquirer';
import type { Command, Credential } from '../types';

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: 'password',
        name: 'mainPassword',
        message: 'Enter main password',
      },
    ])
    .then((answer) => answer.mainPassword);
};

export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: 'list',
    name: 'command',
    message: 'What should be be done?',
    choices: [
      { name: 'List all credentials', value: 'list' },
      { name: 'Add new credentials', value: 'add' },
    ],
  });
  return answers.command;
};

export const chooseService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>({
    type: 'list',
    name: 'service',
    message: 'Please choose a service',
    choices: services,
  });
  return answers.service;
};

// in the type Credential all 3 names are declaired as string
export const askForNewCredential = async (): Promise<Credential> => {
  const newCredential = await inquirer.prompt<Credential>([
    // Array with 3 objects: service, user, password 
    {
      type: 'input',
      name: 'service',
      message: 'Please enter service name:',
    },
    {
      type: 'input',
      name: 'user',
      message: 'Please enter username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Please enter your password:',
      mask: [],
    },
  ]);
  return newCredential;
};
