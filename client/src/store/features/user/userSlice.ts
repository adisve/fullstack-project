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
        setLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        },
        setUserFailure(state, action: PayloadAction<string>) {
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
            dispatch(setUserFailure('Token is not present'));
            return;
        }
        try {
            dispatch(setLoading());
            const response = await axios.get(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setUserSuccess(response.data));
        } catch (error) {
            dispatch(setUserFailure((error as Error).message));
        }
    };

// User logged in anyway
// axios.put() -> change from false to true

// export const updateUserSeenModal =
//     (): AppThunk => async (dispatch: Dispatch, getState) => {
//         const { auth, user } = getState();
//         const token = auth.token;
//         const userId = user.user?._id;

//         if (!token) {
//             dispatch(setUserFailure('Token is not present'));

//             return;
//         }
//         try {
//             const response = await axios.put(
//                 `/api/greetingModal/${userId}`,
//                 {},
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             dispatch(seenStartModal()); // update the name in the Redux store
//             dispatch(setUserSuccess(response.data)); // update the user in the Redux store with the updated data from the backend
//         } catch (error) {
//             dispatch(setUserFailure((error as Error).message));
//         }
//     };

export const { setLoading, setUserSuccess, setUserFailure } =
    usersSlice.actions;
export default usersSlice.reducer;
