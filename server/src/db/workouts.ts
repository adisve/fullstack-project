import mongoose, { mongo } from 'mongoose';
import { User } from './user';

export const workoutSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    createdAt: { type: Date, default: new Date(), required: true },
    exercises: { type: Array, required: true },
    completed: { type: Boolean, default: false },
    notes: { type: String, required: false },
    workoutDuration: { type: Number, required: false },
});

const createWorkout = (values: Record<string, any>) => {
    new Workout(values)
        .save()
        .then((workoutForToday) => workoutForToday.toObject());
};

async function updateWorkoutCompleted(userId: string, workoutId: string) {
    try {
        const res = User.findOneAndUpdate(
            { _id: userId, 'workoutsForToday._id': workoutId },
            { $set: { 'workoutsForToday.$.completed': true } }
        );
        console.log(`RESULT: ${res}`);
        console.log((await User.findOne({ _id: userId })).workoutsForToday);
    } catch (error) {
        console.error(error);
    }
}

export async function addWorkout(userId: string, workout: any) {
    try {
        workout.workout._id = new mongoose.Types.ObjectId();
        await workout.workout.exercises.forEach(async (exercise: any) => {
            exercise._id = new mongoose.Types.ObjectId();
        });
        await User.updateOne(
            { _id: userId },
            { $push: { workoutsForToday: workout.workout } }
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

export { Workout, createWorkout, deleteWorkoutById, updateWorkoutCompleted };
