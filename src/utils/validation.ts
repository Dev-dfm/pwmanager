import fs from 'fs/promises';

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const passwordHash = await fs.readFile('./.password', 'utf-8');
  return plaintextPassword === passwordHash;
};