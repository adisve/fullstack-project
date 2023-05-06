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

import { Container, Grid } from '@mui/material';
import { ActionCard } from '../dashboard/actionCard/ActionCard';

export function Exercises() {
    return (
        <Grid container={true}>
            <ActionCard
                actionName="Browse workouts"
                actionDescription="Look through a collection of workouts, tailored to your profile."
            />
            <ActionCard
                actionName="Browse workouts"
                actionDescription="Look through a collection of workouts, tailored to your profile."
            />
            <ActionCard
                actionName="Browse workouts"
                actionDescription="Look through a collection of workouts, tailored to your profile."
            />
            <ActionCard
                actionName="Browse workouts"
                actionDescription="Look through a collection of workouts, tailored to your profile."
            />
        </Grid>
    );
}
