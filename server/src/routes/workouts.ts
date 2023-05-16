import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';
import {
    addWorkout,
    deleteWorkoutById,
    updateWorkoutCompleted,
} from '../db/workouts';
import { createExercise } from '../db/exercises';
import { User } from '../db/user';

dotenv.config({ path: './config.env' });
import bodyParser from 'body-parser';
const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.delete(
    'deleteWorkoutById/:userId/:workoutId',
    async function (req: Request, res: Response) {
        const userId = req.params.userId;
        const workoutId = req.params.workoutId;
        try {
            await deleteWorkoutById(userId, workoutId);
            return res.status(200).json({
                message: 'Workout deleted successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to delete workout',
            });
        }
    }
);

route.post('/addWorkout/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const workout = req.body;

    try {
        await addWorkout(userId, workout);
        return res.status(200).json({ message: 'Workout added' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to add workout',
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
    await createExercise({
        exercise: exer,
    });
    return res.status(200).json({
        message: 'Exercise added',
    });
});

route.get('/workoutToday/:_id', async function (req: Request, res: Response) {
    const userId = req.params._id;
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

route.post('/createWorkout/:_id', async function (req: Request, res: Response) {
    const workoutData = req.body;
    const userId = req.params._id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.workoutsForToday.push(workoutData);

            user.save()
                .then((updatedUser) => {
                    if (!updatedUser) {
                        return res
                            .status(404)
                            .json({ message: 'User cannot be updated' });
                    }
                    return res.status(200).json({ message: 'Workout created' });
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        });
});

route.put(
    '/workoutCompleted/workouts/:workoutId',
    async function (req: Request, res: Response) {
        const userId = req.session.sessionUserId;
        const workoutId = req.params.workoutId;
        try {
            await updateWorkoutCompleted(userId, workoutId);
            return res.status(200).json({
                message: `Workout set to completed on user ${userId}`,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to update completed',
            });
        }
    }
);

export default route;
