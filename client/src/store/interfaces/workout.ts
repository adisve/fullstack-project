import { Exercise } from './exercise';

export interface Workout {
    _id: string;
    userId: string;
    exercises: Exercise[];
    createdAt: Date;
    updatedAt: Date;
    notes: string;
    workoutDuration: number;
}
