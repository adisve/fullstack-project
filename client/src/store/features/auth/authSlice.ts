import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { User } from '../../interfaces/user';
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
    dispatch(clearUser());
    dispatch(setAuthStatus(AuthStatus.unauthenticated));
};

export const loginUser =
    (email: string, password: string) =>
    async (dispatch: AppDispatch, getState: any) => {
        const { auth } = getState();
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

            const { user } = await response.data;
            if (user) {
                dispatch(setUser(user));
                dispatch(setAuthStatus(AuthStatus.authenticated));
            } else {
                dispatch(setAuthStatus(AuthStatus.unauthenticated));
            }
        } catch (error) {
            dispatch(setAuthStatus(AuthStatus.error));
        }
    };

export const { setAuthStatus, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
