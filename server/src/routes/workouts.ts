import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';
import { deleteWorkoutById } from '../db/workouts';

dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
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

export default route;
