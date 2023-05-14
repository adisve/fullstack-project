import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { connect } from './db/connection';

dotenv.config({ path: './config.env' });
const app: Application = express();
const secret: string = process.env.SECRET_KEY || '';
const port: string | number = process.env.PORT || 7036;

import authRoute from './routes/auth';
import userRoute from './routes/user';
import adminRoute from './routes/admin';

import isLoggedIn from './middleware/authenticated';
import isAdmin from './middleware/isAdmin';

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    })
);

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/api/user', isLoggedIn, userRoute);
app.use('/api/admin', isLoggedIn, isAdmin, adminRoute);

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
