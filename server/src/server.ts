import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './db/mongo_connector';
dotenv.config({ path: './config.env' });
import { job } from './jobs/cronUpdatingWorkout';
const secret: string = process.env.SECRET_KEY || '';

import path from 'path';
import session from 'express-session';

dotenv.config({ path: './config.env' });
const app: Application = express();
const port: string | number = process.env.PORT || 7036;

import authRoute from './routes/auth';
import workoutsRoute from './routes/workouts';
import externalRoute from './routes/exercises';
import userRoute from './routes/user';
import adminRoute from './routes/admin';

import isLoggedIn from './middleware/authenticated';
import authorizeAdmin from './middleware/authorizeAdmin';

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend-build')));

app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/auth', externalRoute);
app.use('/workouts', workoutsRoute);

job.start();
app.use('/api/user', isLoggedIn, userRoute);
app.use('/api/admin', isLoggedIn, authorizeAdmin, adminRoute);

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend-build', 'index.html'));
});

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
