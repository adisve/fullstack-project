import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import workoutReducer from './features/workouts/workoutSlice';
import authReducer from './features/auth/authSlice';
import modalReducer from './features/login-register-modal/modalSlice';

const rootReducer = combineReducers({
    workouts: workoutReducer,
    auth: authReducer,
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
});

export type AppDispatch = ThunkDispatch<RootState, undefined, any>;
