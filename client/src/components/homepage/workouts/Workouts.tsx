/**
 * A page containing a date organized list of the users workout days

 */

import { Box, Container, Divider, Grid } from '@mui/material';
import WORKOUTS from './workouts.json';
import { WorkoutCard } from './workoutCard/WorkoutCard';
import { AddWorkoutCard } from './AddWorkoutCard/AddWorkoutCard';

export function Workouts() {
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
            <AddWorkoutCard />

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
                    <Grid item style={{ width: '23em' }}>
                        <WorkoutCard {...workout} withActions={false} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
