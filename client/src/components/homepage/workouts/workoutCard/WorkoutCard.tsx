/**
 * @typedef Workout
 * @property {string} _id
 * @property {string} userId
 * @property {Date} date
 * @property {Exercise[]} exercises
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number} workoutDuration
 * @property {string} notes
 */

import {
    faPen,
    faPlus,
    faTrash,
    faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Card,
    CardHeader,
    CardContent,
    Chip,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Typography,
    Divider,
    CardActions,
    Fab,
} from '@mui/material';
import './WorkoutCard.css';

type WorkoutProps = {
    _id: string;
    userId: string;
    date: string;
    exercises: any[];
    createdAt: string;
    updatedAt: string;
    workoutDuration: number;
    notes: string;
    withActions: boolean;
};

export function WorkoutCard(props: WorkoutProps) {
    const { date, exercises, workoutDuration, notes, withActions } = props;

    function presentDate(date: string) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();

        return `${month}-${day}-${year}`;
    }

    return (
        <Card className="workout-card">
            <CardHeader
                title={
                    new Date(date).toLocaleString('en-us', {
                        weekday: 'long',
                    }) +
                    ' ' +
                    presentDate(date)
                }
                subheader={
                    withActions ? (
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {workoutDuration} minutes &nbsp;
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="delete"
                                onClick={() => console.log('delete')}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Fab>
                        </CardActions>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {workoutDuration} minutes
                        </Typography>
                    )
                }
            />
            <CardContent>
                <CardContent sx={{ marginTop: '0px' }}>
                    <Typography variant="body2" color="text.secondary">
                        {notes}
                    </Typography>
                </CardContent>
                <Divider />
                <TableContainer sx={{ maxHeight: '18em' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell>Sets</TableCell>
                                <TableCell>Reps</TableCell>
                                <TableCell>Weight (kg)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exercises.map((exercise) => (
                                <TableRow>
                                    <TableCell>
                                        <Chip label={exercise.name} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={exercise.sets} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={exercise.reps} />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={
                                                <span>
                                                    {exercise.weight}{' '}
                                                    <FontAwesomeIcon
                                                        icon={faWeightHanging}
                                                    />
                                                </span>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {withActions && (
                    <CardActions
                        sx={{
                            display: 'flex',
                            float: 'right',
                            margin: '0.6em',
                        }}
                    >
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.success.main
                                    ),
                                padding: '0.6em',
                            }}
                        >
                            Submit
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    marginLeft: '1em',
                                }}
                            />
                        </Fab>
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.success.main,
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.success.main
                                    ),
                                padding: '0.6em',
                            }}
                        >
                            Add
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    marginLeft: '1em',
                                }}
                            />
                        </Fab>
                        <Fab
                            size="small"
                            variant="extended"
                            sx={{
                                color: (theme) =>
                                    theme.palette.getContrastText(
                                        theme.palette.error.main
                                    ),
                                backgroundColor: (theme) =>
                                    theme.palette.error.main,
                                padding: '0.6em',
                            }}
                        >
                            Delete
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginLeft: '1em' }}
                            />
                        </Fab>
                    </CardActions>
                )}
            </CardContent>
        </Card>
    );
}
