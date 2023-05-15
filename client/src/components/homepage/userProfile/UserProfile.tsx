import { ProgressCards } from './weeklyProgress/ProgressCards';
import './UserProfile.css';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExercises } from '../../../store/features/user/userSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { PageStatus } from '../../../enums/pageStatus';
import LoadingSpinner from '../../general/LoadingSpinner';

export function UserProfile() {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(fetchAllExercises());
    }, []);

    if (user.userPageStatus == PageStatus.loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="user-page">
            <h1>User Profile</h1>
            <ProgressCards />
        </Container>
    );
}
