import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageStatus } from '../../../enums/pageStatus';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';

interface UserState {
    userPageStatus: PageStatus;
    exercises: any;
}

const initialState: UserState = {
    userPageStatus: PageStatus.initial,
    exercises: [],
};

const userSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserPageStatus(state, action: PayloadAction<PageStatus>) {
            state.userPageStatus = action.payload;
        },
        setAllUserExercises(state, action: PayloadAction<[]>) {
            state.exercises = action.payload;
        },
    },
});

export const fetchAllExercises =
    () => async (dispatch: AppDispatch, getState: any) => {
        const { auth } = getState();
        const session = auth.sessionId;
        const userId = auth.user._id;
        dispatch(setUserPageStatus(PageStatus.loading));
        try {
            const response = await instance.get(`/auth/user/workouts`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const user = await response.data;

            let workouts: any = [...user.workouts, ...user.workoutsForToday];
            const updatedWorkouts: any = workouts.map((wo: any) => {
                const { createdAt, ...rest } = wo;
                return { created_at: createdAt, ...rest };
            });
            dispatch(setAllUserExercises(updatedWorkouts));
            dispatch(setUserPageStatus(PageStatus.success));
        } catch (error) {
            dispatch(setUserPageStatus(PageStatus.error));
        }
    };

export const { setUserPageStatus, setAllUserExercises } = userSlice.actions;
export default userSlice.reducer;
