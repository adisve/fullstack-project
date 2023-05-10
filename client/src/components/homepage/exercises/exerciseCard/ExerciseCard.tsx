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

type Exercise = {
    name: string;
    sets: number;
    reps: number;
    weight: number;
    description: string;
};

export function ExerciseCard(props: Exercise) {
    const { name, sets, reps, weight, description } = props;

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
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    );
}
