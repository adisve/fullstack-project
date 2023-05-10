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
import { useState } from 'react';
import { AddExerciseModal } from './addExerciseModal/AddExerciseModal';

export function Exercises() {
    const [exerciseModalActive, setExerciseModalActive] = useState(false);

    return (
        <Grid container={true} className="exercises-grid">
            {EXERCISES.map((exercise) => (
                <ExerciseCard {...exercise} />
            ))}
            <Fab
                className="add-exercise"
                variant="extended"
                onClick={() => setExerciseModalActive(true)}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: '1em' }}
                />
                <h4>Add Exercise</h4>
            </Fab>
            <AddExerciseModal
                open={exerciseModalActive}
                handleClose={setExerciseModalActive}
            />
        </Grid>
    );
}
