/**
 * A page containing a date organized list of the users workout days

 */

import { Container, Divider, Grid } from '@mui/material';
import WORKOUTS from './workouts.json';
import { WorkoutCard } from './workoutCard/WorkoutCard';
import { AddWorkoutCard } from './AddWorkoutCard/AddWorkoutCard';
import { useState } from 'react';

export function Workouts() {
    const [addingWorkout, setAddingWorkout] = useState(false);

    const nowDate = new Date();
    const preparedSpoofWorkouts = WORKOUTS.map((workout) => {
        return {
            ...workout,
            createdAt: new Date(workout.createdAt),
            updatedAt: new Date(workout.updatedAt),
        };
    });

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
                        updatedAt: nowDate,
                        workoutDuration: 0,
                        notes: '',
                    }}
                    withActions={true}
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
                {preparedSpoofWorkouts.map((workout) => (
                    <Grid item>
                        <WorkoutCard {...workout} withActions={false} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
