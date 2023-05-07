import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../types';
import axios from 'axios';
import { PageStatus } from '../../../enums/pageStatus';
import { UserSettings } from '../../interfaces/userSettings';
import { User } from '../../interfaces/user';

interface ModalState {
    status: PageStatus;
    successModal: boolean;
    currentStep: number;
    user?: User;
}

const initialState: ModalState = {
    status: PageStatus.success,
    successModal: false,
    currentStep: 1,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<PageStatus>) {
            state.status = action.payload;
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

export const registerUser =
    (): AppThunk => async (dispatch: Dispatch, getState) => {
        const { modal, auth } = getState();
        const token = auth.token;
        const user = modal.user;
        dispatch(setStatus(PageStatus.loading));
        axios
            .put(
                `/api/register`,
                {
                    body: JSON.stringify(user),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((_) => {
                dispatch(setStatus(PageStatus.success));
            })
            .catch((_) => {
                dispatch(setStatus(PageStatus.error));
            });
    };

export const {
    setStatus,
    incrementStep,
    decrementStep,
    updateUserSettings,
    setSuccessModal,
} = modalSlice.actions;

export default modalSlice.reducer;
