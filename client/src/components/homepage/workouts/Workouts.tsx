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

export function Workouts() {
    const [addingWorkout, setAddingWorkout] = useState(false);

    const nowDate = new Date();
    const { auth } = useSelector((state: RootState) => state);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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

            <h1>Previously</h1>
            <br />
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
                spacing={2}
            >
                <Divider />
                {auth.user?.workoutsForToday?.map((workout: Workout) => (
                    <Grid item>
                        <WorkoutCard
                            {...workout}
                            withActions={false}
                            setAddingWorkout={setAddingWorkout}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
