import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../interfaces/workout';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';
import { setUser } from './authSlice';
import { User } from '../../interfaces/user';

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

            const updatedUser = {
                ...user,
                workoutsForToday: [...user.workoutsForToday, workout],
            };

            // Update the local user object in the auth slice
            dispatch(setUser(updatedUser));
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const deleteWorkout =
    (workoutId: string) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        try {
            const { auth } = getState();
            const user = auth.user;
            if (!user) {
                return;
            }
            await instance.delete(`/auth/deleteWorkoutById/${workoutId}`);

            const updatedWorkouts = user.workoutsForToday.filter(
                (workout: Workout) => workout._id !== workoutId
            );

            const updatedUser = {
                ...user,
                workoutsForToday: updatedWorkouts,
            };

            dispatch(setUser(updatedUser));
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const completeWorkout =
    (workoutId: string) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(WorkoutsModificationStatus.loading));
        const { auth } = getState();
        const user: User = auth.user;
        try {
            await instance.put(`/auth/workoutCompleted/workouts/${workoutId}`);
            const updatedUser = {
                ...user,
                workoutsForToday: user.workoutsForToday?.map((workout) =>
                    workout._id === workoutId
                        ? { ...workout, completed: true }
                        : workout
                ),
            };
            dispatch(setUser(updatedUser));
            dispatch(setStatus(WorkoutsModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(WorkoutsModificationStatus.error));
        }
    };

export const { setStatus } = workoutsModificationSlice.actions;
