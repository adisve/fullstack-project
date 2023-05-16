/**
 * A page containing a date organized list of the users workout days

 */

import { Container, Divider, Grid } from '@mui/material';
import { WorkoutCard } from './workoutCard/WorkoutCard';
import { AddWorkoutCard } from './AddWorkoutCard/AddWorkoutCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Workout } from '../../../store/interfaces/workout';
import PassedWorkouts from './passedWorkouts/PassedWorkouts';
import WorkoutsForToday from './workoutsForToday/WorkoutsForToday';

export function Workouts() {
    const [addingWorkout, setAddingWorkout] = useState(false);

    const nowDate = new Date();
    const { auth } = useSelector((state: RootState) => state);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
            }}
        >
            <h1>Today</h1>
            <Divider />
            {!addingWorkout ? (
                <AddWorkoutCard workoutAdded={setAddingWorkout} />
            ) : (
                <WorkoutCard
                    {...{
                        _id: '',
                        userId: '',
                        exercises: [],
                        createdAt: nowDate,
                        workoutDuration: 0,
                        notes: '',
                        completed: false,
                    }}
                    withActions={true}
                    setAddingWorkout={setAddingWorkout}
                />
            )}

            <WorkoutsForToday
                workoutsForToday={auth.user?.workoutsForToday}
                setAddingWorkout={setAddingWorkout}
            />

            <PassedWorkouts
                passedWorkouts={auth.user?.workouts}
                setAddingWorkout={setAddingWorkout}
            />
        </Container>
    );
}
