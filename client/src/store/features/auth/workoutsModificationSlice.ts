import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../interfaces/workout';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';

enum WorkoutsModificationStatus {
    initial,
    loading,
    success,
    error,
}

interface WorkoutsModificationState {
    status: WorkoutsModificationStatus;
}

const initialState: WorkoutsModificationState = {
    status: WorkoutsModificationStatus.initial,
};

const workoutsModificationSlice = createSlice({
    name: 'workouts modification',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<WorkoutsModificationStatus>) {
            state.status = action.payload;
        },
    },
});

export const addWorkout =
    (exercise: Workout) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            const { auth } = getState();
            const user = auth.user;
            if (!user) {
                return;
            }
            // Assumes that the user object contains ObjectId from mongo
            await instance.post(`auth/addWorkout/${user._id}`, {
                body: JSON.stringify(exercise),
            });
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const { setStatus } = workoutsModificationSlice.actions;
