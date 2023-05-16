import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import instance from '../../../config/axios';
import { AppDispatch } from '../../store';
import { Exercise } from '../../interfaces/exercise';

enum ExerciseModificationStatus {
    initial,
    loading,
    success,
    error,
}

interface ExerciseModificationState {
    status: ExerciseModificationStatus;
}

const initialState: ExerciseModificationState = {
    status: ExerciseModificationStatus.initial,
};

const exerciseModificationSlice = createSlice({
    name: 'exercise modification',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<ExerciseModificationStatus>) {
            state.status = action.payload;
        },
    },
});

export const addExercise =
    (exercise: Exercise) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(ExerciseModificationStatus.loading));
        try {
            const { auth } = getState();
            const user = auth.user;
            if (!user) {
                dispatch(setStatus(ExerciseModificationStatus.error));
                return;
            }
            // Assumes that the user object contains ObjectId from mongo
            await instance.post(`auth/addExercise`, {
                exercise,
            });
            dispatch(setStatus(ExerciseModificationStatus.success));
        } catch (error) {
            dispatch(setStatus(ExerciseModificationStatus.error));
        }
    };

export const removeExercise =
    (exerciseId: string) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(setStatus(ExerciseModificationStatus.loading));
        try {
            await instance.delete(`/auth/deleteExercises/${exerciseId}`);
            dispatch(setStatus(ExerciseModificationStatus.success));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(ExerciseModificationStatus.error));
        }
    };

export const { setStatus } = exerciseModificationSlice.actions;
