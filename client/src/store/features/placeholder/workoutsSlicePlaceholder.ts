import { Exercise } from '../../interfaces/exercise';
import EXERCISES from '../../../components/homepage/exercises/exercises.json';

export function addExercise(exercise: Exercise) {
    return {
        type: 'workouts/addExercise',
        payload: exercise,
    };
}

function appendJson(exercise: Exercise) {
    EXERCISES.push(exercise);
}
