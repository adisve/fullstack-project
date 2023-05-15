import mongoose from 'mongoose';
import { User } from './user';

export const exerciseSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    description: { type: String, required: false },
    interests: { type: String, required: false },
    fitnessLevel: { type: String, required: false },
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

const createExercise = (values: Record<string, any>) =>
    new User(values).save().then((exercises) => exercises.toObject());

async function deleteExerciseById(userId: string, exerciseId: string) {
    try {
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    exercises: { _id: exerciseId },
                },
            },
            { new: true }
        );
        console.log(`Exercise with ID ${exerciseId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting exercise: ${error}`);
    }
}

function updateExerciseByIds(
    userId: String,
    exerciseId: String,
    interests: String,
    name: String,
    sets: Number,
    reps: Number
) {
    User.findByIdAndUpdate({
        _id: userId,
        exercises: {
            $elemMatch: {
                _id: exerciseId,
            },
        },
        $set: {
            'exercises.$.interests': interests,
            'exercises.$.name': name,
            'exercises.$.sets': sets,
            'exercises.$.reps': reps,
        },
    });
}

async function updateCompleted(userId: string, workoutId: string) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return console.log('User not found');
        }

        const workoutIndex = user.workoutsForToday.findIndex(
            (workout) => workout._id.toString() === workoutId
        );

        if (workoutIndex === -1) {
            return console.log('Workout not found');
        }

        user.workoutsForToday[workoutIndex].completed = true;
        await user.save();
    } catch (error) {
        console.log(error);
    }
}

export {
    Exercise,
    createExercise,
    updateExerciseByIds,
    updateCompleted,
    deleteExerciseById,
};
