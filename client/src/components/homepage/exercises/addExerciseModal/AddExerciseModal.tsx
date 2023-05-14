/**
 * Appends a new exercise to the database
 */

import {
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    FormControl,
    FormGroup,
    InputAdornment,
    TextField,
    styled,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AddExerciseModal.css';
import { addExercise } from '../../../../store/features/auth/exerciseModificationSlice';
import { AppDispatch } from '../../../../store/store';
import { Exercise } from '../../../../store/interfaces/exercise';

interface ExerciseModalProps {
    open: boolean;
    handleClose: any;
}

const StyledDialog = styled((props: any) => <Dialog {...props} />)(({ _ }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 20,
    },
}));

export function AddExerciseModal({ open, handleClose }: ExerciseModalProps) {
    const [exerciseData, setExerciseData] = useState({
        name: '',
        description: '',
        sets: '',
        reps: '',
        weight: '',
    });
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = () => {
        const exercise: Exercise = {
            name: exerciseData.name,
            sets: Number.parseInt(exerciseData.sets),
            reps: Number.parseInt(exerciseData.reps),
            weight: Number.parseInt(exerciseData.weight),
            description: exerciseData.description,
        };
        dispatch(addExercise(exercise));
        handleClose();

        setExerciseData({
            name: '',
            description: '',
            sets: '',
            reps: '',
            weight: '',
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setExerciseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <StyledDialog open={open} onClose={() => handleClose(false)}>
            <DialogContent>
                <Container>
                    <Box className="exercise-modal-header">
                        <h2>Add Exercise</h2>
                    </Box>
                    <FormControl className="exercise-modal-form-control">
                        <FormGroup sx={{ gap: '1em' }}>
                            <TextField
                                id="exercise-name"
                                label="Exercise Name"
                                variant="outlined"
                                value={exerciseData.name}
                                required={true}
                                onChange={handleChange}
                                helperText="Name of the exercise"
                            />

                            <TextField
                                id="exercise-description"
                                label="Exercise Description"
                                variant="outlined"
                                value={exerciseData.description}
                                onChange={handleChange}
                                helperText="Description on how to perform the exercise"
                            />
                        </FormGroup>
                        <FormGroup className="exercise-modal-form-group">
                            <TextField
                                id="exercise-sets"
                                label="Exercise Sets"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseData.sets}
                                onChange={handleChange}
                                sx={{ width: '20ch' }}
                            />
                            <TextField
                                id="exercise-reps"
                                label="Exercise Reps"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseData.reps}
                                onChange={handleChange}
                                sx={{ width: '20ch' }}
                            />

                            <TextField
                                id="exercise-weight"
                                label="Exercise Weight"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseData.weight}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            kg
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormGroup>
                        <Button onClick={handleSubmit} variant="outlined">
                            Submit
                        </Button>
                    </FormControl>
                </Container>
            </DialogContent>
        </StyledDialog>
    );
}
