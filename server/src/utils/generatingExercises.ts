import { Exercise } from '../db/exercises';
import { User } from '../db/user';

async function createExercises(userId: string) {
    const fitnessLevel = [
        'none',
        'beginner',
        'moderate',
        'somewhatExpert',
        'expert',
    ];
    const interests = [
        'Cardio',
        'Flex',
        'Strength',
        'HIIT',
        'Plyometric',
        'Calisthenics',
        'Core',
        'Functional',
    ];

    const exerciseTypes = [
        'pushups',
        'pullups',
        'lunges',
        'mountain climbers',
        'squats',
        'shoulder press',
        'box jumps',
        'burpees',
        'leg raises',
    ];
    const exerciseCount = 50;
    const noneReps = 10;
    const beginnerReps = 20;
    const moderateReps = 35;
    const somewhatExpert = 43;
    const expertReps = 50;

    const sets = 3;
    const exercises = [];
    for (let i = 0; i < exerciseCount; i++) {
        const fitnessScale =
            fitnessLevel[Math.floor(Math.random() * fitnessLevel.length)];
        let repss = -1;
        if (fitnessScale === 'none') {
            repss = noneReps;
        } else if (fitnessScale === 'beginner') {
            repss = beginnerReps;
        } else if (fitnessScale === 'moderate') {
            repss = moderateReps;
        } else if (fitnessScale === 'somewhatExpert') {
            repss = somewhatExpert;
        } else {
            repss = expertReps;
        }
        const exercise = {
            interests: interests[Math.floor(Math.random() * interests.length)],
            fitnessLevel: fitnessScale,
            name: exerciseTypes[
                Math.floor(Math.random() * exerciseTypes.length)
            ],
            sets: sets,
            reps: repss,
        };
        exercises.push(exercise);
    }
    await User.findByIdAndUpdate(userId, {
        $push: { exercises: exercises },
    });
}

export { createExercises };
