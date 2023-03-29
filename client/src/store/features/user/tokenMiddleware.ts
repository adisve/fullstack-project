import { Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { fetchUser, getUserFailure } from './userSlice';

export const tokenMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => async (action) => {
  if (action.type === fetchUser.type) {
    const token = (getState() as RootState).auth.token;
    if (!token) {
      return dispatch(getUserFailure('Token not found.'));
    }
    try {
      const response = await axios.get(`/api/users/${action.payload}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      action.payload = response.data;
    } catch (error) {
      return dispatch(getUserFailure((error as Error).message));
    }
  }
  return next(action);
};
