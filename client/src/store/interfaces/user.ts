import { UserSettings } from './userSettings';

export interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    settings?: UserSettings;
    role?: string;
}
