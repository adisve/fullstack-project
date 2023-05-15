import mongoose from 'mongoose';
import { User } from './user';
import { exerciseSchema } from './exercises';

export const workoutSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    createdAt: { type: Date, default: new Date(), required: true },
    exercises: [exerciseSchema],
    completed: { type: Boolean, default: false },
    notes: { type: String, required: false },
    workoutDuration: { type: Number, required: false },
});

const createWorkout = (values: Record<string, any>) => {
    new Workout(values)
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

export async function addWorkout(userId: string, workout: typeof Workout) {
    console.log(`Adding workout: ${JSON.stringify(workout)}`);
    try {
        await User.findByIdAndUpdate(
            userId,
            { $push: { workoutsForToday: workout } },
            { new: true }
        );
    } catch (err) {
        console.error(err);
    }
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

const Workout = mongoose.model('Workouts', workoutSchema);

export { Workout, createWorkout, deleteWorkoutById, updateWorkoutsByIds };
