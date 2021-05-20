import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {
  deleteCredential,
  readCredential,
  readCredentials,
  saveCredentials,
} from './utils/credentials';
import { connectDatabase } from './utils/database';

if (!process.env.MONGO_URL) {
  throw new Error('Missing new Mongo_URL');
}

const app = express();
const port = 5000;

// server can get JSON Data
app.use(express.json());

// Request all credentials
app.get('/api/credentials', async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

// Request a specific credential
app.get('/api/credentials/:service', async (request, response) => {
  const credentials = await readCredential(request.params.service);
  response.json(credentials);
});

// Add a new credential
app.post('/api/credentials', async (request, response) => {
  await saveCredentials(request.body, '321');
  response.send('Credential saved in DB');
});

// Delete a credential
app.delete('/api/credentials/:service', async (request, response) => {
  await deleteCredential(request.params.service);
  response.send('Credential has been deleted');
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`pwmanager listening at http://localhost:${port}`);
  });
});
