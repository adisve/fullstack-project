import express, { Application } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { connect } from './db/connection';
dotenv.config({ path: './config.env' });
const app: Application = express();
const port: string | number = process.env.PORT || 7036;

import authRoute from './routes/auth';

app.use('/auth', authRoute);

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        name: 'session',
        maxAge: 30 * 24 * 60 * 60,
        keys: ['secretKey'],
    })
);

app.listen(port, () => {
    connect()
        .then(() => {
            console.log(`Server is running on port: ${port}`);
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
});
