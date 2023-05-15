import { Exercise } from './exercise';

export interface Workout {
    _id: string;
    exercises: Exercise[];
    createdAt: Date;
    notes: string;
    workoutDuration: number;
    completed: boolean;
}
