import { Grid, Divider } from '@mui/material';
import { Workout } from '../../../../store/interfaces/workout';
import { WorkoutCard } from '../workoutCard/WorkoutCard';

interface WorkoutsForTodayProps {
    workoutsForToday?: Workout[];
    setAddingWorkout: any;
}

export function WorkoutsForToday({
    workoutsForToday,
    setAddingWorkout,
}: WorkoutsForTodayProps) {
    return (
        <>
            <h1>Workouts for today</h1>
            <br />
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    justifyContent: 'left',
                    position: 'relative',
                }}
                spacing={2}
            >
                <Divider />
                {workoutsForToday?.map((workout: Workout) => (
                    <Grid item>
                        <WorkoutCard
                            {...workout}
                            withActions={false}
                            setAddingWorkout={setAddingWorkout}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default WorkoutsForToday;
