import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './db/mongo_connector';
import { job } from './jobs/cronUpdatingWorkout';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app: Application = express();
const port: string | number = process.env.PORT || 7036;

import authRoute from './routes/auth';
import workoutsRoute from './routes/workouts';
import externalRoute from './routes/exercises';
import userRoute from './routes/user';
import adminRoute from './routes/admin';

import isLoggedIn from './middleware/authenticated';
import authorizeAdmin from './middleware/authorizeAdmin';

dotenv.config({ path: '/etc/secrets/config.env' });

declare module 'express-session' {
    interface SessionData {
        sessionUserId: string;
        role: string;
    }
}

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
    })
);
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.static(path.join(__dirname, '..', 'frontend-build')));

app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/auth', externalRoute);
app.use('/auth', workoutsRoute);

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
