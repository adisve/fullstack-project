import { Request, Response } from 'express';
import {
    User,
    Exercise,
} from '../db/model';

async function getMatchedExercises(req: Request, res: Response) {
  const userId = req.params._id;
    const user = await User.findById(userId).populate(
        'Exercise'
    );
   
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const fitnessLevel = user.settings.fitnessLevel;
    const interests = user.settings.interests;

    let exerciseCount: number;
    if (fitnessLevel === 'none') {
        exerciseCount = 3;
    }
    if (fitnessLevel === 'beginner') {
        exerciseCount = 5;
    } else if (fitnessLevel === 'moderate') {
        exerciseCount = 7;
    } else if (fitnessLevel === 'somewhatExpert') {
        exerciseCount = 9;
    }
    else {
        exerciseCount = 11;
    }
    let matchedExercises = [];

    matchedExercises = await Exercise.find({
        interests: { $in: interests },
        fitnessLevel: { $in: fitnessLevel },
    });
   

    user.Exercise = matchedExercises.map(
        (exercise) => exercise._id
    );
    user.save();
    res.json({ exercises: matchedExercises });

}
export { getMatchedExercises }

