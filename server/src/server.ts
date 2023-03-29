import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recordRouter from './routes/record';
import { connectToServer } from './db/connection';

dotenv.config({ path: './config.env' });

const app: Application = express();
const port: string | number = process.env.PORT || 7036;

app.use(cors());
app.use(express.json());
app.use(recordRouter);

app.listen(port, () => {
  connectToServer((err: Error) => {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
