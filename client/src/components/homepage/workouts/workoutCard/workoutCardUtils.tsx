import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@mui/material';

export function presentDate(date: Date): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${month}-${day}-${year}`;
}

type ActionProps = {
    handleAddWorkouts: () => void;
    setPickExerciseModalActive: (active: boolean) => void;
    setAddingWorkout: (adding: boolean) => void;
};

export function WorkoutCardActions(props: ActionProps) {
    const { handleAddWorkouts, setPickExerciseModalActive, setAddingWorkout } =
        props;

    return (
        <>
            <Fab
                size="small"
                variant="extended"
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) =>
                        theme.palette.getContrastText(
                            theme.palette.success.main
                        ),
                    padding: '0.6em',
                }}
                onClick={handleAddWorkouts}
            >
                Submit
                <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '1em' }} />
            </Fab>
            <Fab
                size="small"
                variant="extended"
                sx={{
                    backgroundColor: (theme) => theme.palette.success.main,
                    color: (theme) =>
                        theme.palette.getContrastText(
                            theme.palette.success.main
                        ),
                    padding: '0.6em',
                }}
                onClick={() => setPickExerciseModalActive(true)}
            >
                Add
                <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '1em' }} />
            </Fab>
            <Fab
                size="small"
                variant="extended"
                sx={{
                    color: (theme) =>
                        theme.palette.getContrastText(theme.palette.error.main),
                    backgroundColor: (theme) => theme.palette.error.main,
                    padding: '0.6em',
                }}
                onClick={() => setAddingWorkout(false)}
            >
                Delete
                <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '1em' }} />
            </Fab>
        </>
    );
}
