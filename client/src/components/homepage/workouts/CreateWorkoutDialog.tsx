import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import WorkoutNotesTextArea from './StyledTextArea';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import CreateWorkoutDialogExercisesGrid from './CreateWorkoutDialogExercisesGrid';
import { Transition } from './WorkoutDetailDialog';
import { Workout, validateWorkout } from '../../../store/interfaces/workout';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../../store/features/auth/workoutsModificationSlice';
import { toast } from 'react-hot-toast';

interface CreateWorkoutDialogProps {
    showCreateWorkout: boolean;
    handleCloseCreateWorkout: any;
}

export function CreateWorkoutDialog({
    showCreateWorkout,
    handleCloseCreateWorkout,
}: CreateWorkoutDialogProps) {
    const [newWorkout, setNewWorkout] = useState<Workout>({
        name: '',
        workoutDuration: 0,
        exercises: [],
        notes: '',
    });
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    const modifyNewWorkoutField = (fieldName: string, value: any) => {
        setNewWorkout((prevWorkout: any) => {
            const updatedWorkout = { ...prevWorkout };
            updatedWorkout[fieldName] = value;
            return updatedWorkout;
        });
    };

    const handleCreateWorkout = async () => {
        if (validateWorkout(newWorkout)) {
            await dispatch(addWorkout(newWorkout));
        } else {
            toast.error(
                'You are missing fields required to create a new workout!'
            );
        }
    };

    const handleChange = (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            modifyNewWorkoutField(
                'workoutDuration',
                parseInt(e.target.value, 10)
            );
        }
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            open={showCreateWorkout}
        >
            <DialogTitle>Create a new workout</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                <FormControl>
                    <TextField
                        sx={{ margin: '1rem' }}
                        className="create-workout-textfield"
                        id="outlined-basic"
                        label="Workout name"
                        required
                        name="name"
                        onChange={(e) =>
                            modifyNewWorkoutField('name', e.target.value)
                        }
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: '1rem' }}
                        className="create-workout-textfield"
                        id="outlined-basic"
                        label="Duration"
                        name="workoutDuration"
                        variant="outlined"
                        type="number"
                        onChange={(e) => handleChange(e)}
                        value={newWorkout.workoutDuration}
                    />
                    {auth.user?.exercises?.length == 0 ||
                    !auth.user?.exercises ? (
                        'Please add exercises before attempting to create a workout'
                    ) : (
                        <CreateWorkoutDialogExercisesGrid
                            rows={auth.user?.exercises}
                            selectedRows={newWorkout.exercises}
                            setSelectedRows={(value) =>
                                modifyNewWorkoutField('exercises', value)
                            }
                        ></CreateWorkoutDialogExercisesGrid>
                    )}
                    <WorkoutNotesTextArea
                        setTextAreaValue={(value) =>
                            modifyNewWorkoutField('notes', value)
                        }
                        value={newWorkout.notes}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={handleCreateWorkout}
                >
                    Create
                </Button>
                <Button
                    variant="outlined"
                    color="info"
                    onClick={handleCloseCreateWorkout}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
