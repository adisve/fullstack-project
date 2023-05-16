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
// For testing purposes change auth.user.exercises to EXERCISES
// import EXERCISES from './exercises.json';
import { ExerciseCard } from './exerciseCard/ExerciseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Exercises.css';
import { useReducer, useState } from 'react';
import { AddExerciseModal } from './addExerciseModal/AddExerciseModal';
import { Exercise } from '../../../store/interfaces/exercise';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

export function Exercises() {
    const [exerciseModalActive, setExerciseModalActive] = useState(false);
    const { auth } = useSelector((state: RootState) => state);

    return (
        <Grid container={true} className="exercises-grid">
            {auth.user?.exercises?.length == 0 || !auth.user?.exercises ? (
                <h2>No exercises yet</h2>
            ) : (
                auth.user?.exercises?.map((exercise: Exercise) => (
                    <ExerciseCard {...exercise} />
                ))
            )}
            <Fab
                onClick={() => setExerciseModalActive(true)}
                className="floating-btn"
                variant="extended"
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
                handleClose={() => {
                    setExerciseModalActive(false);
                    window.location.reload();
                }}
            />
        </Grid>
    );
}
