import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { titleCase } from '../../../utils/stringUtils';
import { Exercise } from '../../../store/interfaces/exercise';

interface ExerciseTablesProps {
    exercises?: Exercise[];
}

export function ExercisesTable({ exercises }: ExerciseTablesProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="right">Reps</TableCell>
                        <TableCell align="right">Sets</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises?.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {titleCase(row.name)}
                            </TableCell>
                            <TableCell align="right">{row.reps}</TableCell>
                            <TableCell align="right">{row.sets}</TableCell>
                            <TableCell align="right">
                                {row.weight ? row.weight : 0}
                            </TableCell>
                            <TableCell align="right">
                                {row.description
                                    ? row.description
                                    : 'No description'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
