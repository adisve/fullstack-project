import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { User } from '../../interfaces/user';
import {
    getUser,
    removeSessionData,
    setSessionData,
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
    removeSessionData();
    dispatch(clearUser());
    dispatch(setAuthStatus(AuthStatus.unauthenticated));
};

export const loginUser =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
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
            const { user, id } = await response.data;
            if (id && user) {
                setSessionData(id, user);
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
        const user = getUser();
        if (user) {
            const user = getUser();
            // Set the session token
            dispatch(setUser(user!));
            dispatch(setAuthStatus(AuthStatus.authenticated));
        } else {
            dispatch(setAuthStatus(AuthStatus.unauthenticated));
        }
    } catch (error) {
        console.error(error);
        dispatch(setAuthStatus(AuthStatus.error));
    }
};

export const { setAuthStatus, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
