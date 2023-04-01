import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userReducer from './features/user/userSlice';
import workoutReducer from './features/workouts/workoutSlice';
import authReducer from './features/auth/authSlice';

const rootReducer = combineReducers({
    user: userReducer,
    workouts: workoutReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
});

export type AppDispatch = typeof store.dispatch;