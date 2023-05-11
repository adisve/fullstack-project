/**
 * A page containing a date organized list of the users workout days

 */

import { Container, Divider, Grid } from '@mui/material';
import workouts from './workouts.json';
import { WorkoutCard } from './workoutCard/WorkoutCard';
import { AddWorkoutCard } from './AddWorkoutCard/AddWorkoutCard';
import { useState } from 'react';

export function Workouts() {
    const [addingWorkout, setAddingWorkout] = useState(false);

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
                        user_id: '',
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
                {workouts.map((workout, index) => (
                    <Grid key={index} item>
                        <WorkoutCard
                            key={index}
                            {...workout}
                            withActions={false}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
