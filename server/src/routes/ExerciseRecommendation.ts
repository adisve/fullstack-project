import { Request, Response } from 'express';
import { User, Exercise, updateExercises } from '../db/model';


async function getMatchedExercises(req: Request, res: Response) {
    const id = req.params._id;

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
   
    const fitnessLevel = user.settings.fitnessLevel;
    
    console.log(fitnessLevel)
   
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
    } else {
        exerciseCount = 11;
    }
     
    const exercises = await Exercise.find({
        interests: user.settings.interests,
        fitnessLevel: user.settings.fitnessLevel,
    }).limit(exerciseCount);
    console.log(exercises)

    const addingExercises = exercises.map((exercise) => ({
        interests: exercise.interests,
        fitnessLevel: exercise.fitnessLevel,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
    }));
    console.log(addingExercises)
    
    User.findByIdAndUpdate(
        id,
        { $push: { exercises: addingExercises } },
        
    )
        .then((updatedUser) => {
            return res.status(200).json({ message: 'Exercises created' });
        })
        .catch((err) => {
            console.log(err);
        });

    
}
export{getMatchedExercises}
