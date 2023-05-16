import { Exercise } from './exercise';

export interface Workout {
    _id?: string;
    name: string;
    exercises: Exercise[];
    createdAt?: Date;
    notes: string;
    workoutDuration: number;
    completed?: boolean;
}

export function validateWorkout(obj: any): obj is Workout {
    if (
        typeof obj.name === 'string' &&
        obj.name.length > 0 &&
        Array.isArray(obj.exercises) &&
        obj.exercises.length > 0 &&
        obj.exercises.every((exercise: any) => typeof exercise === 'object')
    ) {
        return true;
    }
    return false;
}
