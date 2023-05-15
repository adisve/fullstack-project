import Cookies from 'universal-cookie';
import { User } from '../interfaces/user';

const cookies = new Cookies();

export const setSessionToken = (token: string) => {
    cookies.set('sessionToken', token, { path: '/' });
};

export const getSessionToken = () => {
    return cookies.get('sessionToken');
};

export const removeSessionToken = () => {
    cookies.remove('sessionToken', { path: '/' });
};
