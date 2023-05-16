import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { User } from '../../interfaces/user';
import {
    getSessionToken,
    removeSessionToken,
    setSessionToken,
} from '../../session/session';
import { AppDispatch } from '../../store';

export enum AuthStatus {
    loading,
    authenticated,
    unauthenticated,
    error,
}

interface AuthState {
    user?: User;
    status: AuthStatus;
}

const initialState: AuthState = {
    status: AuthStatus.unauthenticated,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = undefined;
        },
        setAuthStatus(state, action: PayloadAction<AuthStatus>) {
            state.status = action.payload;
        },
    },
});

export const logOutUser = () => (dispatch: any) => {
    removeSessionToken();
    dispatch(clearUser());
    dispatch(setAuthStatus(AuthStatus.unauthenticated));
};

export const loginUser =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        console.log('ATTEMPTING TO LOG IN USER');
        try {
            dispatch(setAuthStatus(AuthStatus.loading));
            const response = await instance.post(
                '/auth/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: 'true',
                    },
                }
            );
            const { sessionUserId, user } = await response.data;
            console.log('Attempting to make exercises for user');
            // Generate exercises
            console.log(
                `User exercises is empty: ${user.exercises.length === 0}`
            );
            if (user.exercises.length === 0 || !user.exercises) {
                console.log('No exercises found, generating exercises');
                const res = await instance.get('/auth/generateExercises');
            }

            if (sessionUserId && user) {
                setSessionToken(sessionUserId);
                dispatch(setUser(user));
                dispatch(setAuthStatus(AuthStatus.authenticated));
            } else {
                dispatch(setAuthStatus(AuthStatus.unauthenticated));
            }
        } catch (error) {
            dispatch(setAuthStatus(AuthStatus.error));
        }
    };

export const authenticateUser = () => async (dispatch: any) => {
    try {
        dispatch(setAuthStatus(AuthStatus.loading));
        const token = getSessionToken();
        if (token) {
            const response = await instance.get('/auth/login', {
                withCredentials: true,
            });
            const { user } = response.data;
            console.log(`User: ${user}`);
            if (user) {
                setSessionToken(user._id!);
                dispatch(setUser(user));
                dispatch(setAuthStatus(AuthStatus.authenticated));
            } else {
                console.error('Something went wrong');
                dispatch(setAuthStatus(AuthStatus.unauthenticated));
                dispatch(clearUser());
            }
        } else {
            dispatch(setAuthStatus(AuthStatus.unauthenticated));
            dispatch(clearUser());
        }
    } catch (error) {
        console.error(error);
        dispatch(setAuthStatus(AuthStatus.error));
        dispatch(clearUser());
    }
};

export const { setAuthStatus, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
