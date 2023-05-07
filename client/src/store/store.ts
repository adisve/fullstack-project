import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import userReducer from './features/user/userSlice';
import workoutReducer from './features/workouts/workoutSlice';
import authReducer from './features/auth/authSlice';
import modalReducer from './features/user/modalSlice';

const rootReducer = combineReducers({
    user: userReducer,
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
