import Cookies from 'universal-cookie';
import { User } from '../interfaces/user';

const cookies = new Cookies();

export const setSessionData = (token: string, user: User) => {
    cookies.set('sessionToken', token, { path: '/' });
    cookies.set('user', JSON.stringify(user), { path: '/' });
};

export const getSessionToken = () => {
    return cookies.get('sessionToken');
};

export const getUser = (): User | undefined => {
    const userString = cookies.get('user');
    if (userString) {
        return userString as User;
    }
    return undefined;
};

export const removeSessionData = () => {
    cookies.remove('sessionToken', { path: '/' });
    cookies.remove('user', { path: '/' });
};
