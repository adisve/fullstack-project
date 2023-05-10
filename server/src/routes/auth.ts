import { Request, Response } from 'express';
import { Router } from 'express';
import {
    User,
    getUser,
    createUser,
    getEmail,
    updateUser,
    Exercise,
    updateSeenGreeting,
    updateCreatedExercise,
} from '../db/model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
import { createExercises } from './generatingExercises';
import { getMatchedExercises } from './ExerciseRecommendation';

import { Session } from 'express-session';

export interface ISession extends Session {
    _id?: any;
    Email?: string;
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
                res.redirect('/auth/login');
            }
        });
    }
});
// use this route to implement the update seen greating. Link that to the skip button and the user will only see the form once
route.put(
    '/greetingModal/:_id/boarded',
    async function (req: Request, res: Response) {
        if ((req.session as ISession)._id) {
            const _id = req.params._id;
            const updated = updateSeenGreeting(_id);

            res.status(200).json({ message: 'Value updated' });
        }
    }
);
// generating exercises automatically
route.get('/createExercises', async function (req: Request, res: Response) {
    await createExercises();
    return res.status(200).json({ message: 'Value updated' });
});

route.get(
    '/recommendExercises/:_id',
    async function (req: Request, res: Response) {
        const recommendExercises = await getMatchedExercises(req, res);
    }
);
//users adding their own exercises
route.put('/addExercise/:_id', async function (req: Request, res: Response) {
    const id = req.params._id;
    console.log(id);
    const userData = req.body;
    const interests = userData.interests;
    const fitnessLevel = userData.fitnessLevel;
    const name = userData.name;
    const sets = userData.sets;
    const reps = userData.reps;

    const updatedUser = await updateCreatedExercise(
        id,
        interests,
        fitnessLevel,
        name,
        sets,
        reps
    );

    return res.status(200).json({ message: 'Exercises created' });
});
// Getting all the execrises created and recommended to the user.
route.get('/allExercises/:_id', async function (req: Request, res: Response) {
    const allExercises = [];
    const id = req.params._id;
    const user = await User.findById(id).populate('Exercise');
    const createdExercises = user.createdExercises;
    console.log(createdExercises);

    const userExercise = user.Exercise;
    console.log(userExercise);
    if (userExercise === undefined || userExercise.length == 0) {
        res.status(500).json({ error: 'Exercises cannot be retrieved' });
    } else {
        if (
            createdExercises == null ||
            typeof createdExercises === 'undefined'
        ) {
            allExercises.push(userExercise);
        } else {
            allExercises.push(userExercise);
            allExercises.push(createdExercises);
            console.log(allExercises);
        }

        res.status(200).json({ exercise: allExercises });
    }
});

export default route;
