import { Request, Response } from 'express';
import { Router } from 'express';
import { getUser, createUser, getEmail, createExercise } from '../db/model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({ path: './config.env' });
import bodyParser from 'body-parser';
import { Session } from 'express-session';

export interface ISession extends Session {
    _id?: any;
    Email?: string;
    role?: 'user' | 'admin';
}

const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.post('/login', async function (req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await getEmail(email);
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
            (req.session as ISession)._id = user._id;
            (req.session as ISession).Email = user.email;
            (req.session as ISession).role = user.role;
        }

        res.status(200).json({
            user: user,
            id: (req.session as ISession)._id,
        });
    } catch (error) {
        console.error('Unable to log in', error);
        return res.status(500).json({
            message: 'Unable to log in',
        });
    }
});

route.get('/login', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        const _id = (req.session as ISession)._id;

        const userDetails = await getUser(_id);
        console.log(userDetails);

        return res.status(200).json({
            id: (req.session as ISession)._id,
            userDetails: userDetails,
        });
    }
});

route.post('/workoutInformation', async function (req: Request, res: Response) {
    const { interests, fitnessLevel, name, sets, reps } = req.body;
    const exer = {
        interests: interests,
        fitnessLevel: fitnessLevel,
        name: name,
        sets: sets,
        reps: reps,
    };
    console.log(exer);
    await createExercise({
        exercise: exer,
    });
    return res.status(200).json({
        message: 'Exercise added',
    });
});

route.get(
    '/workoutInformation',
    async function (req: Request, res: Response) {}
);

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
            const userExists = await getEmail(email);
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
                console.log(err);
            } else {
                res.status(200).json({
                    message: 'logged out',
                });
            }
        });
    }
});

export default route;
