import { Grid, Divider } from '@mui/material';
import { Workout } from '../../../../store/interfaces/workout';
import { WorkoutCard } from '../workoutCard/WorkoutCard';

interface PassedWorkoutsProps {
    passedWorkouts?: Workout[];
    setAddingWorkout: any;
}

export function PassedWorkouts({
    passedWorkouts,
    setAddingWorkout,
}: PassedWorkoutsProps) {
    return (
        <>
            <h1>Passed</h1>
            <br />
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    justifyContent: 'eft',
                    position: 'relative',
                }}
                spacing={2}
            >
                <Divider />
                {passedWorkouts?.length == 0 || !passedWorkouts ? (
                    <h4>No passed workouts</h4>
                ) : (
                    passedWorkouts?.map((workout: Workout) => (
                        <Grid item>
                            <WorkoutCard
                                {...workout}
                                withActions={false}
                                setAddingWorkout={setAddingWorkout}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
}

export default PassedWorkouts;
