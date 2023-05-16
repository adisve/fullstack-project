import mongoose, { mongo } from 'mongoose';
import { User } from './user';
import { ObjectId } from 'mongodb';

export const workoutSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new ObjectId(),
        required: true,
        auto: true,
    },
    name: { type: String, required: true, default: 'My Workout' },
    createdAt: { type: Date, default: new Date(), required: true },
    exercises: { type: Array, required: true },
    completed: { type: Boolean, default: false, required: true },
    notes: { type: String, required: false },
    workoutDuration: { type: Number, required: false, default: 0 },
});

const createWorkout = (values: Record<string, any>) => {
    new Workout(values)
        .save()
        .then((workoutForToday) => workoutForToday.toObject());
};

async function updateWorkoutCompleted(userId: string, workoutId: string) {
    try {
        await User.findOneAndUpdate(
            { _id: userId, 'workoutsForToday._id': workoutId },
            { $set: { 'workoutsForToday.$.completed': true } }
        ).exec();
        console.log('Updated workout to completed');
    } catch (error) {
        console.error(error);
    }
}

export async function addWorkout(userId: string, workout: any) {
    try {
        workout.workout._id = new mongoose.Types.ObjectId();

        for (const exercise of workout.workout.exercises) {
            exercise._id = new mongoose.Types.ObjectId();
        }

        await User.updateOne(
            { _id: userId },
            { $push: { workoutsForToday: workout.workout } }
        ).exec();
    } catch (err) {
        console.error(err);
    }
}

async function deleteWorkoutById(userId: string, workoutId: string) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $pull: {
                    workoutsForToday: { _id: workoutId },
                },
            },
            { new: true }
        );

        if (updatedUser) {
            console.log(`Workout with ID ${workoutId} deleted successfully.`);
        } else {
            console.error(`User with ID ${userId} not found.`);
        }
    } catch (error) {
        console.error(`Error deleting workout with ID ${workoutId}`);
    }
}

const Workout = mongoose.model('Workouts', workoutSchema);

export { Workout, createWorkout, deleteWorkoutById, updateWorkoutCompleted };
