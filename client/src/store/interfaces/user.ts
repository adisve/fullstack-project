import { Exercise } from './exercise';
import { UserSettings } from './userSettings';
import { Workout } from './workout';

export interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    settings?: UserSettings;
    workouts?: Workout[];
    exercises?: Exercise[];
}
