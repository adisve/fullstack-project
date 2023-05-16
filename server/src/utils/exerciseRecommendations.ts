import { Request, Response } from 'express';
import { Exercise } from '../db/exercises';
import { User } from '../db/user';

async function getMatchedExercises(userId: string) {
    const id = userId;

    const user = await User.findById(id);
    console.log(user);

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
            exerciseCount = 10;
            break;
        case FitnessLevel.BEGINNER:
            exerciseCount = 15;
            break;
        case FitnessLevel.MODERATE:
            exerciseCount = 20;
            break;
        case FitnessLevel.SOMEWHAT_EXPERT:
            exerciseCount = 25;
            break;
        case FitnessLevel.EXPERT:
            exerciseCount = 30;
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

    await User.findByIdAndUpdate(userId, {
        $push: { exercises: addingExercises },
    });
}

export { getMatchedExercises };
