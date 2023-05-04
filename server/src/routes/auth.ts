import { Request, Response } from 'express';
import { Router } from 'express';
import {
    User,
    getUser,
    createUser,
    getEmail,
    updateUser,
    createExercise,
    updateSeenGreeting,
} from '../db/model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });

import { Session } from 'express-session';

export interface ISession extends Session {
    _id?: any;
    Email?: string;
}

const router = Router();

router.post('/login', async function (req: Request, res: Response) {
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

router.get('/login', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
    const _id = (req.session as ISession)._id;

    const userDetails = await getUser(_id);
    console.log(userDetails);

    return res
        .status(200)
        .json({ id: (req.session as ISession)._id, userDetails: userDetails });
    }
});

router.post(
    '/workoutInformation',
    async function (req: Request, res: Response) {
        const { interests, fitnessLevel, name, sets, reps } = req.body;
        const exer = {
            interests: interests,
            fitnessLevel: fitnessLevel,
            name: name,
            sets: sets,
            reps: reps,
        };
        console.log(exer);
        const inputExercise = await createExercise({
            exercise: exer,
        });
        return res.status(200).json({
            message: 'Exercise added',
        });
    }
);

router.get(
    '/workoutInformation',
    async function (req: Request, res: Response) {}
);

router.post('/register', async function (req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

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
                const user = await createUser({
                    email,
                    name,
                    password,
                });
                return res.status(200).json({
                    message: 'created account',
                });
            }
        }
    } catch (error) {
        console.error('Unable to register');
        return res.status(400).json({
            message: 'Could not create account',
        });
    }
});

router.get('/logout', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/auth/login');
            }
        });
    }
});

router.put('/greetingModal/:_id', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        const _id = req.params._id;
        const { userSettings } = req.body;

        const interests = userSettings.interests;
        const goals = userSettings.goals;
        const age = userSettings.age;
        const height = userSettings.height;
        const weight = userSettings.weight;
        const gender = userSettings.gender;
        const fitnessLevel = userSettings.fitnessLevel;
        console.log(gender);
        const updatedUser = await updateUser(
            _id,
            interests,
            goals,
            age,
            gender,
            weight,
            height,
            fitnessLevel
        );
        return res.status(200).send(JSON.stringify(updatedUser));
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.put(
    '/greetingModal/:_id/boarded',
    async function (req: Request, res: Response) {
        if ((req.session as ISession)._id) {
        const _id = req.params._id;
        const updated = updateSeenGreeting(_id);

        res.status(200).json({ message: 'Value updated' });
    }
    }
);

router.get('/greetingModal/:_id', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        return res.status(200);
    }
});

export default router;
