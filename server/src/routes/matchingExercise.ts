import { Request, Response } from 'express';
import {
    User,
    Exercise,
} from '../db/model';

async function getMatchedExercises(req: Request, res: Response) {
  const userId = req.params._id;
    const user = await User.findById(userId).populate(
        'userProfileSchema.Exercise'
    );
   
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const fitnessLevel = user.userProfileSchema.fitnessLevel;
    const interests = user.userProfileSchema.interests;

    let exerciseCount: number;
    if (fitnessLevel === 'beginner') {
        exerciseCount = 5;
    } else if (fitnessLevel === 'intermediate') {
        exerciseCount = 7;
    } else {
        exerciseCount = 10;
    }
    let matchedExercises = [];

    matchedExercises = await Exercise.find({
        interests: { $in: interests },
        fitnessLevel: { $in: fitnessLevel },
    });
    console.log(interests);
    console.log(fitnessLevel);
   

    user.userProfileSchema.Exercise = matchedExercises.map(
        (exercise) => exercise._id
    );
    user.save();
    res.json({ exercises: matchedExercises });

    console.log(matchedExercises);
}
export { getMatchedExercises }

