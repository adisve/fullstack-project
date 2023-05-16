import { Request, Response } from 'express';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '/etc/secrets/config.env' });
import bodyParser from 'body-parser';
import { getMatchedExercises } from '../utils/getMatchedExercises';
import { deleteExerciseById } from '../db/exercises';
import { User } from '../db/user';
const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.delete(
    '/deleteExercises/:exerciseId',
    async function (req: Request, res: Response) {
        const userId = req.session.sessionUserId;
        const exerciseId = req.params.exerciseId;
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

route.post('/addExercise', async function (req: Request, res: Response) {
    const sessionUserId = req.session.sessionUserId;
    const userData = req.body.exercise;

    User.findByIdAndUpdate(
        sessionUserId,
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

route.get('/user/workouts', async function (req: Request, res: Response) {
    const sessionUserId = req.session.sessionUserId;
    try {
        const user = await User.findById(sessionUserId);

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
