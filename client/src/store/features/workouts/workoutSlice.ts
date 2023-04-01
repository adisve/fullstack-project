import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Exercise, Workout } from '../../interfaces/workout';
import { AppThunk } from '../types';

interface WorkoutsState {
    workout?: Workout;
    loading: boolean;
    error: string | null;
}

const initialState: WorkoutsState = {
    workout: undefined,
    loading: false,
    error: null,
};

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        getWorkoutStart(state) {
            state.loading = true;
            state.error = null;
        },
        getWorkoutSuccess(state, action: PayloadAction<Workout>) {
            state.loading = false;
            state.error = null;
            state.workout = action.payload;
        },
        getWorkoutFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const fetchWorkout =
    (workoutId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getWorkoutStart());
            const response = await axios.get(`API_ENDPOINT/${workoutId}`);
            dispatch(getWorkoutSuccess(response.data));
        } catch (error) {
            dispatch(getWorkoutFailure((error as Error).message));
        }
    };

export const createWorkout =
    (userId: string, date: Date, exercises: Exercise[]): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getWorkoutStart());
            const response = await axios.post(`API_ENDPOINT`, {
                userId,
                date,
                exercises,
            });
            dispatch(getWorkoutSuccess(response.data));
        } catch (error) {
            dispatch(getWorkoutFailure((error as Error).message));
        }
    };

export const { getWorkoutStart, getWorkoutSuccess, getWorkoutFailure } =
    workoutsSlice.actions;

export default workoutsSlice.reducer;
