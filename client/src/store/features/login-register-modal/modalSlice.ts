import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageStatus } from '../../../enums/pageStatus';
import { UserSettings } from '../../interfaces/userSettings';
import { User } from '../../interfaces/user';
import { AppDispatch } from '../../store';
import instance from '../../../config/axios';
import { toast } from 'react-hot-toast';

interface ModalState {
    registerStatus: PageStatus;
    loginStatus: PageStatus;
    successModal: boolean;
    currentStep: number;
    user?: User;
}

const initialState: ModalState = {
    registerStatus: PageStatus.initial,
    loginStatus: PageStatus.initial,
    successModal: false,
    currentStep: 1,
    user: {
        settings: {},
    },
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
        const { modal } = getState();
        const user = modal.user;

        dispatch(setRegisterStatus(PageStatus.loading));

        try {
            await instance.post(
                `/auth/register`,
                { user },
                { headers: { 'Content-Type': 'application/json' } }
            );
            dispatch(setRegisterStatus(PageStatus.success));
            toast.success('Successfully registered account');
        } catch (error) {
            dispatch(setRegisterStatus(PageStatus.error));
            toast.error('Failed to create account! Try again later.');
        }
    };
}

export function checkUserAvailability() {
    return async function (dispatch: AppDispatch, getState: any) {
        dispatch(setRegisterStatus(PageStatus.loading));
        try {
            const { modal } = getState();
            const user = modal.user;
            const params: { [key: string]: string } = {};
            if (user.username) {
                params['username'] = user.username;
            } else if (user.email) {
                params['email'] = user.email;
            } else {
                dispatch(setRegisterStatus(PageStatus.error));
                toast.error('Email address is already in use');
                return;
            }

            const response = await instance.get<{
                message: string;
            }>('/auth/userExists', { params });

            if (response.status === 200 || response.status === 304) {
                // User available
                dispatch(setRegisterStatus(PageStatus.initial));
                dispatch(incrementStep());
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Try again later.');
            dispatch(setRegisterStatus(PageStatus.error));
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
