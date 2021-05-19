import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { readCredentials } from './utils/credentials';
import { connectDatabase } from './utils/database';

if(!process.env.MONGO_URL) {
  throw new Error('Missing new Mongo_URL');
}

const app = express();
const port = 5000;

// Server kann JSON kodierte Inhalte annehmen
app.use(express.json());

app.get('/api/credentials', async (_request, response) => {
  // read credentials
  const credentials = await readCredentials();
  // return
  response.json(credentials);
});

// app.post('/api/credentials', async (_request, response) => {
//   const credentials = await saveCredentials(newCredential, mainPassword);
//   response.json(credentials);
// });

app.delete('/api/credentials/MyService', (_request, response) => {
  response.send('MyService has been deleted');
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`pwmanager listening at http://localhost:${port}`);
  });
});

