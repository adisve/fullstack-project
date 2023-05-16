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

export const setWorkoutComplete =
    (id: string) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        const { auth } = getState();
        try {
            await instance.put(
                `/auth/workoutCompleted/${auth.user_id}/workouts/${id}`
            );
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const addWorkout =
    (workout: Workout) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            const { auth } = getState();
            const user = auth.user;
            if (!user) {
                return;
            }
            await instance.post(`/auth/addWorkout/${user._id}`, {
                workout,
            });
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const { setStatus } = workoutsModificationSlice.actions;
