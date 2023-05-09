import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../../config/axios';

export enum AuthStatus {
    loading,
    authenticated,
    unauthenticated,
    error,
}

interface AuthState {
    token: string | null;
    status: AuthStatus;
}

const initialState: AuthState = {
    token: null,
    status: AuthStatus.unauthenticated,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.status = AuthStatus.authenticated;
        },
        clearToken(state) {
            state.token = null;
            state.status = AuthStatus.unauthenticated;
        },
        setLoading(state) {
            state.status = AuthStatus.loading;
        },
        setError(state) {
            state.status = AuthStatus.error;
        },
    },
});

export const loginUser =
    (email: string, password: string) => async (dispatch: any) => {
        try {
            dispatch(setLoading());
            const response = await instance.post(
                '/auth/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = await response.data;
            console.log(data);
            if (data.token) {
                dispatch(setToken(data.token));
            }
        } catch (error) {
            dispatch(setError());
        }
    };

export const { setToken, clearToken, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
