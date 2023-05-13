import {
    faPen,
    faPlus,
    faTrash,
    faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Card,
    CardHeader,
    CardContent,
    Chip,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Typography,
    Divider,
    CardActions,
    Fab,
} from '@mui/material';
import './WorkoutCard.css';
import { Workout } from '../../../../store/interfaces/workout';
import { presentDate } from './workoutCardUtils';
import { useState } from 'react';
import { PickExerciseModal } from '../pickExerciseModal/PickExerciseModal';
import { ChangeDurationNoteModal } from '../changeDurationNoteModal/ChangeDurationNoteModal';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../../../store/features/auth/workoutsModificationSlice';

type WorkoutProps = Workout & {
    withActions: boolean;
    setAddingWorkout: any;
};

export function WorkoutCard(props: WorkoutProps) {
    const {
        exercises,
        workoutDuration,
        notes,
        withActions,
        createdAt,
        setAddingWorkout,
    } = props;
    const [exercises_, setExercises_] = useState(exercises);
    const [workoutDuration_, setWorkoutDuration_] = useState(workoutDuration);
    const [notes_, setNotes_] = useState(notes);
    const [pickExerciseModalActive, setPickExerciseModalActive] =
        useState(false);

    const [changeDurationNoteModalActive, setChangeDurationNoteModalActive] =
        useState(false);

    const dispatch: AppDispatch = useDispatch();

    const handleAddWorkouts = () => {
        const workout: Workout = {
            _id: '',
            userId: '',
            exercises: exercises_,
            createdAt: createdAt,
            updatedAt: createdAt,
            workoutDuration: workoutDuration_,
            notes: notes_,
        };

        dispatch(addWorkout(workout));
        setAddingWorkout(false);
    };

    return (
        <Card
            className={
                'workout-card' +
                (withActions ? ' workout-card-with-actions' : '')
            }
        >
            <CardHeader
                title={
                    new Date(createdAt).toLocaleString('en-us', {
                        weekday: 'long',
                    }) +
                    ' ' +
                    presentDate(createdAt)
                }
                subheader={
                    withActions ? (
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {workoutDuration_} minutes &nbsp;
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="delete"
                                onClick={() =>
                                    setChangeDurationNoteModalActive(true)
                                }
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Fab>
                        </CardActions>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {workoutDuration_} minutes
                        </Typography>
                    )
                }
            />
            <CardContent>
                <CardContent
                    sx={
                        withActions
                            ? { padding: '0px', marginTop: '0px' }
                            : { marginTop: '0px' }
                    }
                >
                    <Typography variant="body2" color="text.secondary">
                        {notes_}
                    </Typography>
                </CardContent>
                <Divider />
                <TableContainer sx={{ maxHeight: '18em' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell>Sets</TableCell>
                                <TableCell>Reps</TableCell>
                                <TableCell>Weight (kg)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exercises_.map((exercise, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Chip label={exercise.name} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={exercise.sets} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={exercise.reps} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={
                                                <span>
                                                    {exercise.weight}{' '}
                                                    <FontAwesomeIcon
                                                        icon={faWeightHanging}
                                                    />
                                                </span>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {withActions && (
                    <CardActions
                        sx={{
                            display: 'flex',
                            position: 'absolute',
                            bottom: '0',
                            float: 'right',
                            margin: '0.6em',
                        }}
                    >
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.success.main
                                    ),
                                padding: '0.6em',
                            }}
                            onClick={handleAddWorkouts}
                        >
                            Submit
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    marginLeft: '1em',
                                }}
                            />
                        </Fab>
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.success.main,
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.success.main
                                    ),
                                padding: '0.6em',
                            }}
                            onClick={() => setPickExerciseModalActive(true)}
                        >
                            Add
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    marginLeft: '1em',
                                }}
                            />
                        </Fab>
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.error.main
                                    ),
                                backgroundColor: (theme) =>
                                    theme.palette.error.main,
                                padding: '0.6em',
                            }}
                            onClick={() => setAddingWorkout(false)}
                        >
                            Delete
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginLeft: '1em' }}
                            />
                        </Fab>
                    </CardActions>
                )}
            </CardContent>

            <PickExerciseModal
                open={pickExerciseModalActive}
                handleClose={setPickExerciseModalActive}
                currentExercises={exercises_}
                setExercises={setExercises_}
            />

            <ChangeDurationNoteModal
                open={changeDurationNoteModalActive}
                handleClose={setChangeDurationNoteModalActive}
                currentDuration={workoutDuration_}
                setDuration={setWorkoutDuration_}
                currentNotes={notes_}
                setNotes={setNotes_}
            />
        </Card>
    );
}
