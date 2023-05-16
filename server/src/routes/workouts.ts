import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';
import {
    addWorkout,
    deleteWorkoutById,
    updateWorkoutCompleted,
} from '../db/workouts';

dotenv.config({ path: './config.env' });
import bodyParser from 'body-parser';
const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.delete(
    '/deleteWorkoutById/:workoutId',
    async function (req: Request, res: Response) {
        const userId = req.session.sessionUserId;
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

route.post('/addWorkout', async (req: Request, res: Response) => {
    const userId = req.session.sessionUserId;
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
