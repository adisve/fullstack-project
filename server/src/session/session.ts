import Cookies from 'universal-cookie';

interface Session {
    _id: string;
    email: string;
    role: string;
}

const cookies = new Cookies();

export const setSessionData = (session: Session) => {
    cookies.set('session', session, { path: '/' });
};

export const getSessionData = (): Session => {
    return cookies.get('session');
};

export const removeSessionToken = () => {
    cookies.remove('session', { path: '/' });
};
