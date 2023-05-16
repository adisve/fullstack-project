import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Card,
    CardHeader,
    CardContent,
    TableContainer,
    Typography,
    Divider,
    CardActions,
    Fab,
} from '@mui/material';
import './WorkoutCard.css';
import { Workout } from '../../../../store/interfaces/workout';
import { presentDate, WorkoutCardActions } from './workoutCardUtils';
import { useState } from 'react';
import { PickExerciseModal } from '../pickExerciseModal/PickExerciseModal';
import { ChangeDurationNoteModal } from '../changeDurationNoteModal/ChangeDurationNoteModal';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import {
    addWorkout,
    setWorkoutComplete,
} from '../../../../store/features/auth/workoutsModificationSlice';
import { WorkoutCardTable } from './WorkoutCardTable';

type WorkoutProps = Workout & {
    withActions: boolean;
    setAddingWorkout: any;
};

export function WorkoutCard(props: WorkoutProps) {
    const {
        _id,
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
            exercises: exercises_,
            createdAt: createdAt,
            workoutDuration: workoutDuration_,
            notes: notes_,
            completed: false,
        };
        dispatch(addWorkout(workout));
        setAddingWorkout(false);
        window.location.reload();
    };

    const handleCompleteWorkout = (id: string) => {
        dispatch(setWorkoutComplete(id));
        window.location.reload();
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
                    <WorkoutCardTable exercises={exercises_} />
                </TableContainer>

                {withActions && (
                    <CardActions className="workout-card-actions">
                        <WorkoutCardActions
                            setPickExerciseModalActive={
                                setPickExerciseModalActive
                            }
                            setAddingWorkout={setAddingWorkout}
                            handleAddWorkouts={handleAddWorkouts}
                        />
                    </CardActions>
                )}
            </CardContent>
            {!withActions && (
                <CardActions>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Complete"
                        onClick={() => {
                            console.log(props);
                            if (_id != '' && _id) {
                                handleCompleteWorkout(_id);
                            }
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                        }}
                    >
                        Confirm
                    </Fab>
                </CardActions>
            )}
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
