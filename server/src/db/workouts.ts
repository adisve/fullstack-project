import mongoose from 'mongoose';
import { User } from './user';
import { exerciseSchema } from './exercises';

export const workoutSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    createdAt: { type: Date, default: new Date(), required: true },
    exercises: [exerciseSchema],
    name: { type: String, required: false },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
});

const createWorkout = (values: Record<string, any>) => {
    new Workouts(values)
        .save()
        .then((workoutForToday) => workoutForToday.toObject());
};

function updateWorkoutsByIds(
    userId: String,
    workoutId: String,
    completedAt: Date
) {
    User.findByIdAndUpdate({
        _id: userId,
        workoutsForToday: {
            $elemMatch: {
                _id: workoutId,
            },
        },
        $set: {
            'workoutsForToday.$.completedAt': completedAt,
        },
    });
}

async function deleteWorkoutById(userId: string, workoutId: string) {
    try {
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    workouts: { _id: workoutId },
                },
            },
            { new: true }
        );
        console.log(`Workout with ID ${workoutId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting workout with ID ${workoutId}`);
    }
}

const Workouts = mongoose.model('Workouts', workoutSchema);

export { Workouts, createWorkout, deleteWorkoutById, updateWorkoutsByIds };
