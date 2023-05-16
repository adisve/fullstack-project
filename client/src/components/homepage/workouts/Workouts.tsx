import { Container, Divider } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './Workouts.css';

export function Workouts() {
    const nowDate = new Date();
    const { auth } = useSelector((state: RootState) => state);

    return (
        <Container className="workouts-container">
            <h2 className="your-workouts">Your workouts</h2>
        </Container>
    );
}
