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
import { addExercise } from '../../../../store/features/placeholder/workoutsSlicePlaceholder';
import './AddExerciseModal.css';

type ExerciseModalProps = {
    open: boolean;
    handleClose: any;
};

const StyledDialog = styled((props: any) => <Dialog {...props} />)(({ _ }) => ({
    // Set border radius to 20px
    '& .MuiDialog-paper': {
        borderRadius: 20,
    },
}));

export function AddExerciseModal(props: ExerciseModalProps) {
    const { open, handleClose } = props;

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseWeight, setExerciseWeight] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(
            addExercise({
                _id: 'placeholder',
                name: exerciseName,
                description: exerciseDescription,
                sets: Number.parseInt(exerciseSets),
                reps: Number.parseInt(exerciseReps),
                weight: Number.parseInt(exerciseWeight),
            })
        );
        handleClose(false);

        setExerciseDescription('');
        setExerciseName('');
        setExerciseReps('');
        setExerciseSets('');
        setExerciseWeight('');
    };

    return (
        <StyledDialog open={open} onClose={() => handleClose(false)}>
            <DialogContent>
                <Container>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <h2>Add Exercise</h2>
                    </Box>
                    <FormControl
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1em',
                            marginTop: '1em',
                        }}
                    >
                        <FormGroup sx={{ gap: '1em' }}>
                            <TextField
                                id="exercise-name"
                                label="Exercise Name"
                                variant="outlined"
                                value={exerciseName}
                                required={true}
                                onChange={(e) =>
                                    setExerciseName(e.target.value)
                                }
                                helperText="Name of the exercise"
                            />

                            <TextField
                                id="exercise-description"
                                label="Exercise Description"
                                variant="outlined"
                                value={exerciseDescription}
                                onChange={(e) =>
                                    setExerciseDescription(e.target.value)
                                }
                                helperText="Description on how to perform the exercise"
                            />
                        </FormGroup>
                        <FormGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1em',
                            }}
                        >
                            <TextField
                                id="exercise-sets"
                                label="Exercise Sets"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseSets}
                                onChange={(e) =>
                                    setExerciseSets(e.target.value)
                                }
                                sx={{ width: '20ch' }}
                            />
                            <TextField
                                id="exercise-reps"
                                label="Exercise Reps"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseReps}
                                onChange={(e) =>
                                    setExerciseReps(e.target.value)
                                }
                                sx={{ width: '20ch' }}
                            />

                            <TextField
                                id="exercise-weight"
                                label="Exercise Weight"
                                variant="outlined"
                                type="number"
                                required={true}
                                value={exerciseWeight}
                                onChange={(e) =>
                                    setExerciseWeight(e.target.value)
                                }
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
