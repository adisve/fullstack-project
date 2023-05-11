/**
 * A page containing a date organized list of the users workout days

 */

import { Box, Container, Divider, Grid } from '@mui/material';
import WORKOUTS from './workouts.json';
import { WorkoutCard } from './workoutCard/WorkoutCard';
import { AddWorkoutCard } from './AddWorkoutCard/AddWorkoutCard';
import { useState } from 'react';

export function Workouts() {
    const [addingWorkout, setAddingWorkout] = useState(false);

    const nowDate = new Date();

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
            {/* <WorkoutCard {...WORKOUTS[0]} withActions={true} /> */}
            {!addingWorkout ? (
                <AddWorkoutCard workoutAdded={setAddingWorkout} />
            ) : (
                <WorkoutCard
                    {...{
                        _id: '',
                        userId: '',
                        date: '',
                        exercises: [],
                        createdAt: '2020-10-19T00:00:00.000Z',
                        updatedAt: '2020-10-19T00:00:00.000Z',
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
                {WORKOUTS.map((workout) => (
                    <Grid item>
                        <WorkoutCard {...workout} withActions={false} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
