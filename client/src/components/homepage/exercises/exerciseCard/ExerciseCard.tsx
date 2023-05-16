/**
 * @typedef Exercise
 * @property {string} name - The name of the exercise
 * @property {number} sets - The description of the exercise
 * @property {number} reps - The description of the exercise
 * @property {number} weight - The description of the exercise
 * @property {string} description - The description of the exercise
 */

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material';
import './ExerciseCard.css';
import { Exercise } from '../../../../store/interfaces/exercise';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { removeExercise } from '../../../../store/features/auth/exerciseModificationSlice';

export function ExerciseCard(props: Exercise) {
    const { _id, name, sets, reps, weight, description } = props;
    const dispatch: AppDispatch = useDispatch();

    async function deleteExercise() {
        if (_id) {
            await dispatch(removeExercise(_id));
            window.location.reload();
        }
    }

    return (
        <Card className="exercise-card">
            <CardHeader
                title={name}
                subheader={`Sets: ${sets} Reps: ${reps} Weight: ${weight}`}
            />
            <CardContent className="exercise-description">
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => {
                        deleteExercise();
                    }}
                    size="small"
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
