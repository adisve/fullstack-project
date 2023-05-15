import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({ path: './config.env' });
import bodyParser from 'body-parser';
import { Session } from 'express-session';
import { createExercise, updateCompleted } from '../db/exercises';
import {
    getUserByEmail,
    getUserById,
    getUserByName,
    User,
    createUser,
} from '../db/user';
import { getSessionData, setSessionData } from '../session/session';

export interface ISession extends Session {
    _id?: any;
    email?: string;
    role?: 'user' | 'admin';
}

const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.post('/login', async function (req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        } else {
            setSessionData({
                _id: user._id.toString(),
                email: user.email,
                role: user.role,
            });
        }

        res.status(200).json({
            user: user,
        });
    } catch (error) {
        console.error('Unable to log in', error);
        return res.status(500).json({
            message: 'Unable to log in',
        });
    }
});

route.get('/login', async function (req: Request, res: Response) {
    const session = getSessionData();
    if (session) {
        const _id = session._id;
        const user = await getUserById(_id);

        return res.status(200).json({
            user: user,
        });
    }
});

route.get('/userExists', async function (req: Request, res: Response) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                message: 'Please provide a username or email',
            });
        }

        const user = await getUserByEmail(email.toString());

        if (!user) {
            return res.status(200).json({
                message: 'User exists',
                user: user,
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Could not check for account availability',
        });
    }
});

route.post('/register', async function (req: Request, res: Response) {
    try {
        const { user } = req.body;

        const email = user.email;
        const password = user.password;
        const name = user.name;
        const settings = user.settings;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        } else {
            const userExists = await getUserByEmail(email);
            if (userExists) {
                console.error('User email already exists');
                return res
                    .status(400)
                    .json({ message: 'Email already exists' });
            } else {
                await createUser({
                    email,
                    name,
                    password,
                    settings: settings,
                });
                return res.status(200).json({
                    message: 'created account',
                });
            }
        }
    } catch (error) {
        console.error(`Unable to register: ${error.message}`);
        return res.status(500).json({
            message: 'Could not create account',
        });
    }
});

route.get('/logout', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
            } else {
                res.status(200).json({
                    message: 'logged out',
                });
            }
        });
    }
});

export default route;
