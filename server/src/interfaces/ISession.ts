import { Session } from 'express-session';

export interface ISession extends Session {
    _id: string;
    email: string;
    role: string;
}
