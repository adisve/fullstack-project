import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../types';
import axios from 'axios';
import { PageStatus } from '../../../enums/pageStatus';

interface UserSettings {
    exercise: string[];
    goal: string;
    age: number | string;
    gender: string;
    weight: number | string;
    height: number | string;
    fitnessLevel: string;
}

interface ModalState {
    status: PageStatus;
    showModal: boolean;
    successModal: boolean;
    currentStep: number;
    userSettings: UserSettings;
}

const initialUserSettings: UserSettings = {
    exercise: [],
    goal: '',
    age: 0 || '',
    gender: '',
    weight: 0 || '',
    height: 0 || '',
    fitnessLevel: '',
};

const initialState: ModalState = {
    status: PageStatus.success,
    showModal: false,
    successModal: false,
    currentStep: 1,
    userSettings: initialUserSettings,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<PageStatus>) {
            state.status = action.payload;
        },
        setShowModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
        setSuccessModal(state, action: PayloadAction<boolean>) {
            state.successModal = action.payload;
        },
        incrementStep(state) {
            state.currentStep++;
        },
        decrementStep(state) {
            state.currentStep--;
        },
        setExercise(state, action: PayloadAction<string[]>) {
            state.userSettings.exercise = action.payload;
        },
        setGoal(state, action: PayloadAction<string>) {
            state.userSettings.goal = action.payload;
        },
        setAge(state, action: PayloadAction<number | string>) {
            state.userSettings.age = action.payload;
        },
        setGender(state, action: PayloadAction<string>) {
            state.userSettings.gender = action.payload;
        },
        setWeight(state, action: PayloadAction<number | string>) {
            state.userSettings.weight = action.payload;
        },
        setHeight(state, action: PayloadAction<number | string>) {
            state.userSettings.height = action.payload;
        },
        setFitnessLevel(state, action: PayloadAction<string>) {
            state.userSettings.fitnessLevel = action.payload;
        },
    },
});

export const isUserOnBoarded =
    (): AppThunk => async (dispatch: Dispatch, getState) => {
        const { user, auth } = getState();
        const onBoarded = user.user?.seen_greeting_modal;
        const token = auth.token;
        if (!onBoarded && !token) {
            dispatch(setShowModal(true));
        } else {
            dispatch(setShowModal(false));
        }
    };

export const handleSubmitData =
    (): AppThunk => async (dispatch: Dispatch, getState) => {
        const { modal, auth, user } = getState();
        const token = auth.token;
        const userId = user.user?._id;
        const userSettings = modal.userSettings;
        dispatch(setStatus(PageStatus.loading));
        axios
            .put(
                `/api/greetingModal/${userId}`,
                {
                    body: JSON.stringify(userSettings),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((_) => {
                dispatch(setStatus(PageStatus.success));
                dispatch(setShowModal(false));
                dispatch(setSuccessModal(true));
            })
            .catch((_) => {
                dispatch(setStatus(PageStatus.error));
                dispatch(setShowModal(false));
            });
    };

export const handleUserOnboarded =
    (): AppThunk => async (dispatch: Dispatch, getState) => {
        const { auth, user } = getState();
        const token = auth.token;
        const userId = user.user?._id;
        dispatch(setStatus(PageStatus.loading));
        axios
            .put(
                `/api/greetingModal/${userId}/boarded`,
                {
                    body: JSON.stringify({ seen_greeting_modal: true }),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((_) => {
                dispatch(setStatus(PageStatus.success));
                dispatch(setShowModal(false));
            })
            .catch((_) => {
                dispatch(setStatus(PageStatus.error));
                dispatch(setShowModal(false));
            });
    };

export const {
    setStatus,
    setShowModal,
    incrementStep,
    decrementStep,
    setExercise,
    setGoal,
    setAge,
    setGender,
    setWeight,
    setHeight,
    setFitnessLevel,
    setSuccessModal,
} = modalSlice.actions;
export default modalSlice.reducer;
