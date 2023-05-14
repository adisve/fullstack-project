import { Request, Response } from 'express';
import { Router } from 'express';
import { User } from '../db/model';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
import { createExercises } from './generatingExercises';
import { getMatchedExercises } from './exerciseRecommendations';
const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

// generating exercises automatically
route.get('/generateExercises', async function (req: Request, res: Response) {
    try {
        await createExercises();
        console.log("Exercises generated")
    } catch (error) {
         console.log(error);
    }
    return res.status(200).json({ message: 'Exercises generated' });
});

//users adding their own exercises
route.post('/addExercise/:_id', async function (req: Request, res: Response) {
    const id = req.params._id;
    const userData = req.body;

    User.findByIdAndUpdate(
        id,
        { $push: { exercises: userData } },
        { new: true }
    )
        .then((updatedUser) => {
            return res.status(200).json({ message: 'Exercises created' });
        })
        .catch((err) => {
            console.log(err);
        });
});

route.get(
    '/recommendExercises/:_id',
    async function (req: Request, res: Response) {
        try {
            const user = await User.findById(req.params._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                const recommendExercises = await getMatchedExercises(req, res);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
);

// Getting all the execrises created and recommended to the user.
route.get('/getUser/:_id', async function (req: Request, res: Response) {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const exercise = user.exercises;
            return res.status(200).json({ user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default route;
