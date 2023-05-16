import { Container, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './Workouts.css';
import { WorkoutsForToday } from './WorkoutsForToday';
import { PastWorkouts } from './PastWorkouts';
import { useEffect } from 'react';

export function Workouts() {
    const { auth } = useSelector((state: RootState) => state);
    return (
        <>
            <Container className="workouts-container">
                <Container>
                    <h2>Today's Workouts</h2>
                </Container>
                <Divider />
                <WorkoutsForToday
                    workoutsForToday={auth.user?.workoutsForToday}
                />
            </Container>
            <Container className="past-workouts-container">
                <Container>
                    <h2>Missed workouts</h2>
                </Container>
                <Divider />
                <PastWorkouts workouts={auth.user?.workouts} />
            </Container>
        </>
    );
}
