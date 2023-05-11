/**
 * @module Exercises
 * Show all the exercises that the user has created
 *
 * @typedef Exercise
 * @property {string} name - The name of the exercise
 * @property {number} sets - The description of the exercise
 * @property {number} reps - The description of the exercise
 * @property {number} weight - The description of the exercise
 * @property {string} description - The description of the exercise
 */

import { Fab, Grid } from '@mui/material';
import EXERCISES from './exercises.json';
import { ExerciseCard } from './exerciseCard/ExerciseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Exercises.css';

export function Exercises() {
    return (
        <Grid
            container={true}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            {EXERCISES.map((exercise) => (
                <ExerciseCard {...exercise} />
            ))}
            <Fab className="floating-btn" variant="extended">
                <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: '1em' }}
                />
                <h4>Add Exercise</h4>
            </Fab>
        </Grid>
    );
}
