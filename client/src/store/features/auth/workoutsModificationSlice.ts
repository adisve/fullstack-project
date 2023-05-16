import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../interfaces/workout';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';
import { AppThunk } from '../types';

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
    (id: string) => async (dispatch: AppDispatch) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            await instance.put(`/auth/workoutCompleted/workouts/${id}`);
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
            await instance.post(`auth/addWorkout`, {
                workout,
            });
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const deleteWorkout =
    (workoutId: string) => async (dispatch: AppDispatch) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            await instance.delete(`/auth/deleteWorkoutById/${workoutId}`);
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const completeWorkout =
    (workoutId: string) => async (dispatch: AppDispatch) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            await instance.put(`/auth/workoutCompleted/workouts/${workoutId}`);
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const { setStatus } = workoutsModificationSlice.actions;
