import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';
import { User } from '../../interfaces/user';
import { AppThunk } from '../types';

interface UserState {
    user?: User;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        },
        getUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

/**
 * Retrieves the user if token is present in authenticated state
 * @param userId
 * @returns
 */
export const fetchUser =
    (userId: string): AppThunk =>
    async (dispatch: Dispatch, getState) => {
        const { auth } = getState();
        const token = auth.token;
        if (!token) {
            dispatch(getUserFailure('Token is not present'));
            return;
        }
        try {
            dispatch(getUserStart());
            const response = await axios.get(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(getUserSuccess(response.data));
        } catch (error) {
            dispatch(getUserFailure((error as Error).message));
        }
    };

export const { getUserStart, getUserSuccess, getUserFailure } =
    usersSlice.actions;
export default usersSlice.reducer;
