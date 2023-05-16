import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
import bodyParser from 'body-parser';
import { getMatchedExercises } from '../utils/exerciseRecommendations';
import { createExercises } from '../utils/generatingExercises';
import { deleteExerciseById } from '../db/exercises';
import { User } from '../db/user';
const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.delete(
    '/deleteExercises/:userId/:exerciseId',
    async function (req: Request, res: Response) {
        const userId = req.params.userId;
        const exerciseId = req.params.exerciseId;
        console.log(`Removing ${exerciseId}`);
        try {
            await deleteExerciseById(userId, exerciseId);
            return res.status(200).json({ message: 'Exercise deleted' });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: 'Exercise could not be deleted' });
        }
    }
);

//users adding their own exercises
route.post('/addExercise/:_id', async function (req: Request, res: Response) {
    const id = req.params._id;
    const userData = req.body.exercise;

    User.findByIdAndUpdate(
        id,
        { $push: { exercises: userData } },
        { new: true }
    )
        .then((_) => {
            return res.status(200).json({ message: 'Exercises created' });
        })
        .catch((err) => {
            console.error(err);
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
//To get statistics for the user
route.get('/user/workouts/:id', async function (req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const workout = user.workouts;
            return res.status(200).json(user);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default route;
