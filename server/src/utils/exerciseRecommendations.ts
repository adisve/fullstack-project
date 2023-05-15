import { Request, Response } from 'express';
import { Exercise } from '../db/exercises';
import { User } from '../db/user';

async function getMatchedExercises(req: Request, res: Response) {
    const id = req.params._id;

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const fitnessLevel = user.settings.fitnessLevel;

    enum FitnessLevel {
        NONE = 'none',
        BEGINNER = 'beginner',
        MODERATE = 'moderate',
        SOMEWHAT_EXPERT = 'somewhatExpert',
        EXPERT = 'expert',
    }

    const fitnessLevelValues = Object.values(FitnessLevel);

    let exerciseCount: number;
    switch (fitnessLevel) {
        case FitnessLevel.NONE:
            exerciseCount = 3;
            break;
        case FitnessLevel.BEGINNER:
            exerciseCount = 5;
            break;
        case FitnessLevel.MODERATE:
            exerciseCount = 7;
            break;
        case FitnessLevel.SOMEWHAT_EXPERT:
            exerciseCount = 9;
            break;
        case FitnessLevel.EXPERT:
            exerciseCount = 11;
            break;
        default:
            throw new Error(`Invalid fitness level: ${fitnessLevel}`);
    }

    const exercises = await Exercise.find({
        interests: user.settings.interests,
        fitnessLevel: user.settings.fitnessLevel,
    }).limit(exerciseCount);

    const addingExercises = exercises.map((exercise) => ({
        interests: exercise.interests,
        fitnessLevel: exercise.fitnessLevel,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
    }));

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { exercises: addingExercises },
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'Exercises created' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
export { getMatchedExercises };
