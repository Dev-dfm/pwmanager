import inquirer from 'inquirer';
import { Command } from '../types';

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
