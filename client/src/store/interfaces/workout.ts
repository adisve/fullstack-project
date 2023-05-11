import { Exercise } from './exercise';

export interface Workout {
    _id: string;
    userId: string;
    date: Date;
    exercises: Exercise[];
    createdAt: Date;
    updatedAt: Date;
    workoutName: number;
    notes: string;
}
