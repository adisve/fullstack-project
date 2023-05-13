import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Exercise } from '../../../../store/interfaces/exercise';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export function WorkoutCardTable({ exercises }: { exercises: Exercise[] }) {
    return (
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
                {exercises.map((exercise, index) => (
                    <TableRow key={index}>
                        {[exercise.name, exercise.sets, exercise.reps].map(
                            (item, index) => (
                                <TableCell key={index}>
                                    <Chip label={item} />
                                </TableCell>
                            )
                        )}
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
    );
}
