import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import workoutReducer from './features/workouts/workoutSlice';
import authReducer from './features/auth/authSlice';
import modalReducer from './features/login-register-modal/modalSlice';
import adminReducer from './features/admin/adminSlice';
import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
    workouts: workoutReducer,
    auth: authReducer,
    modal: modalReducer,
    admin: adminReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
});

export type AppDispatch = ThunkDispatch<RootState, undefined, any>;
