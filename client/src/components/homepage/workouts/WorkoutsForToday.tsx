import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Workout } from '../../../store/interfaces/workout';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Fab,
    Grid,
    Slide,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { WorkoutDetailDialog } from './WorkoutDetailDialog';
import { WorkoutCard } from './WorkoutCard';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { completeWorkout } from '../../../store/features/auth/workoutsModificationSlice';
import { CreateWorkoutDialog } from './CreateWorkoutDialog';

interface WorkoutsForTodayProps {
    workoutsForToday?: Workout[];
}

export function WorkoutsForToday({ workoutsForToday }: WorkoutsForTodayProps) {
    const [viewDetails, setViewDetails] = useState(false);
    const [viewedWorkout, setViewedWorkout] = useState<Workout | undefined>(
        undefined
    );
    const [showCreateWorkout, setShowCreateWorkout] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const handleOpenCreateWorkout = () => setShowCreateWorkout(true);
    const handleCloseCreateWorkout = () => setShowCreateWorkout(false);

    const handleOpenWorkoutDetail = (workout: Workout) => {
        setViewDetails(true);
        setViewedWorkout(workout);
    };

    const handleCloseWorkoutDetail = () => {
        setViewDetails(false);
        setViewedWorkout(undefined);
    };

    const handleComplete = async (workout: Workout) => {
        try {
            if (workout._id) {
                await dispatch(completeWorkout(workout._id));
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                {workoutsForToday?.length == 0 ||
                workoutsForToday === undefined ? (
                    <Container>
                        <h3>No workouts for today</h3>
                    </Container>
                ) : (
                    workoutsForToday
                        ?.filter((w) => !w.completed)
                        .map((workout) => {
                            return (
                                <WorkoutCard
                                    workout={workout}
                                    handleComplete={handleComplete}
                                    handleOpen={handleOpenWorkoutDetail}
                                />
                            );
                        })
                )}
            </Grid>
            <Fab
                onClick={handleOpenCreateWorkout}
                variant="extended"
                sx={{
                    height: '4rem',
                    margin: '1rem',
                    borderRadius: '15px',
                    backgroundColor: '#6370e4',
                    color: '#FFFFFF',
                }}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: '10px' }}
                />
                New
            </Fab>
            <WorkoutDetailDialog
                viewDetails={viewDetails}
                workout={viewedWorkout}
                handleClose={handleCloseWorkoutDetail}
            />
            <CreateWorkoutDialog
                showCreateWorkout={showCreateWorkout}
                handleCloseCreateWorkout={handleCloseCreateWorkout}
            />
        </>
    );
}
