import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../types';
import axios from 'axios';
import { PageStatus } from '../../../enums/pageStatus';
import { UserSettings } from '../../interfaces/userSettings';
import { User } from '../../interfaces/user';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';

interface ModalState {
    registerStatus: PageStatus;
    loginStatus: PageStatus;
    successModal: boolean;
    currentStep: number;
    user?: User;
}

const initialState: ModalState = {
    registerStatus: PageStatus.success,
    loginStatus: PageStatus.success,
    successModal: false,
    currentStep: 1,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setRegisterStatus(state, action: PayloadAction<PageStatus>) {
            state.registerStatus = action.payload;
        },
        setLoginStatus(state, action: PayloadAction<PageStatus>) {
            state.loginStatus = action.payload;
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
        updateUser(state, action: PayloadAction<Partial<User>>) {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        updateUserSettings(
            state,
            action: PayloadAction<Partial<UserSettings>>
        ) {
            state.user = {
                ...state.user,
                settings: {
                    ...state.user?.settings,
                    ...action.payload,
                },
            };
        },
    },
});

export function registerUser() {
    return async function (dispatch: AppDispatch, getState: any) {
        const { modal, auth } = getState();
        const token = auth.token;
        const user = modal.user;
        dispatch(setRegisterStatus(PageStatus.loading));
        try {
            const response = await instance.post(
                `/auth/register`,
                { body: JSON.stringify(user) },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch(setRegisterStatus(PageStatus.success));
        } catch (error) {
            dispatch(setRegisterStatus(PageStatus.error));
        }
    };
}

export function loginUser(email: string, password: string) {
    return async function (dispatch: AppDispatch) {
        console.log(email, password);
        dispatch(setLoginStatus(PageStatus.loading));
        try {
            const response = await instance.post(`/auth/login`, {
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            dispatch(setLoginStatus(PageStatus.success));
        } catch (error) {
            dispatch(setLoginStatus(PageStatus.error));
        }
    };
}

export const {
    setRegisterStatus,
    setLoginStatus,
    incrementStep,
    decrementStep,
    updateUserSettings,
    updateUser,
    setSuccessModal,
} = modalSlice.actions;

export default modalSlice.reducer;
