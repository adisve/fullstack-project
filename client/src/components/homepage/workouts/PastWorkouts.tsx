import React from 'react';
import { Workout } from '../../../store/interfaces/workout';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
} from '@mui/material';

interface PastWorkoutsProps {
    workouts?: Workout[];
}

export function PastWorkouts({ workouts }: PastWorkoutsProps) {
    function getView(): React.ReactNode {
        if (workouts?.length === 0 || !workouts) {
            return (
                <Container>
                    <h3>No workouts missed yet</h3>
                </Container>
            );
        }
        return (
            <>
                {workouts?.map((workout) => {
                    return (
                        <Card
                            variant="outlined"
                            sx={{
                                padding: '0.5rem',
                                margin: '1rem',
                                width: '19rem',
                                borderRadius: '15px',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14, color: '#353e54' }}
                                    color="#FFFFFF"
                                    gutterBottom
                                >
                                    Created{' '}
                                    {workout.createdAt
                                        ? new Date(workout.createdAt)
                                              .toISOString()
                                              .split('T')[0]
                                        : '[Date unavailable]'}
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: 1.5,
                                        fontWeight: '600',
                                        color: '#353e54',
                                    }}
                                    variant="h5"
                                >
                                    {workout.name ? workout.name : 'My Workout'}
                                </Typography>
                                <Typography variant="body2" color="#353e54">
                                    {workout.notes
                                        ? workout.notes
                                        : 'No notes for this workout'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" size="small">
                                    Open
                                </Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </>
        );
    }

    return (
        <>
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    justifyContent: 'left',
                    position: 'relative',
                }}
            >
                {getView()}
            </Grid>
        </>
    );
}
