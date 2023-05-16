import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { Workout } from '../../../store/interfaces/workout';
import { titleCase } from '../../../utils/stringUtils';
import { ExercisesTable } from './Exercisestable';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../../../store/features/auth/workoutsModificationSlice';

interface WorkoutDetailDialogProps {
    viewDetails: boolean;
    workout?: Workout;
    handleClose: any;
}

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function WorkoutDetailDialog({
    viewDetails,
    handleClose,
    workout,
}: WorkoutDetailDialogProps) {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    async function handleRemoveWorkout() {
        const userId = auth.user?._id;
        if (userId && workout && workout._id) {
            handleClose();
            await dispatch(deleteWorkout(workout._id));
        }
    }

    return (
        <Dialog
            fullScreen
            open={viewDetails}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {workout?.name || workout ? workout?.name : 'My Workout'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        marginBottom: '2rem',
                    }}
                    id="alert-dialog-slide-description"
                >
                    {workout?.notes.length == 0 || workout
                        ? workout?.notes
                        : 'No notes for this workout'}
                </DialogContentText>
                <ExercisesTable exercises={workout?.exercises} />
            </DialogContent>
            <DialogActions>
                <Button color="info" onClick={handleClose}>
                    Close
                </Button>
                <Button color="error" onClick={handleRemoveWorkout}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
