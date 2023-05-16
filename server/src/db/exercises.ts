import mongoose from 'mongoose';
import { User } from './user';
import { ObjectId } from 'mongodb';

export const exerciseSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    description: { type: String, required: false },
    interests: { type: String, required: false },
    fitnessLevel: { type: String, required: false },
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true, default: 0 },
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

const createExercise = (values: Record<string, any>) =>
    new Exercise(values).save().then((exercises) => exercises.toObject());

async function deleteExerciseById(userId: string, exerciseId: string) {
    try {
        const exerciseObjectId = new ObjectId(exerciseId);
        console.log(`Deleting exercise ${exerciseId}`);
        const res = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    exercises: { _id: exerciseObjectId },
                },
            },
            { new: true }
        );

        if (res) {
            console.log(`Exercise with ID ${exerciseId} deleted successfully.`);
        } else {
            console.error(`User with ID ${userId} not found.`);
        }
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

export { Exercise, createExercise, updateExerciseByIds, deleteExerciseById };
