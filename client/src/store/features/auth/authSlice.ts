import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { User } from '../../interfaces/user';

export enum AuthStatus {
    loading,
    authenticated,
    unauthenticated,
    error,
}

interface AuthState {
    sessionId?: string;
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
        setSession(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearSession(state) {
            state.sessionId = undefined;
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
    dispatch(clearSession());
    dispatch(clearUser());
    dispatch(setAuthStatus(AuthStatus.unauthenticated));
};

export const loginUser =
    (email: string, password: string) => async (dispatch: any) => {
        try {
            dispatch(setAuthStatus(AuthStatus.loading));
            const response = await instance.post(
                '/auth/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { user, id } = await response.data;
            console.log(`User ${JSON.stringify(user)}`);
            if (id && user) {
                dispatch(setSession(id));
                dispatch(setUser(user));
                dispatch(setAuthStatus(AuthStatus.authenticated));
            } else {
                dispatch(setAuthStatus(AuthStatus.unauthenticated));
            }
        } catch (error) {
            dispatch(setAuthStatus(AuthStatus.error));
        }
    };

export const { setSession, clearSession, setAuthStatus, setUser, clearUser } =
    authSlice.actions;
export default authSlice.reducer;
