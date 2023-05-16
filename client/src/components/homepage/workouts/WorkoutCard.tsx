import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';
import { Workout } from '../../../store/interfaces/workout';

interface WorkoutCardProps {
    workout: Workout;
    handleComplete: any;
    handleRemove: any;
    handleOpen: any;
}

export function WorkoutCard({
    workout,
    handleComplete,
    handleOpen,
    handleRemove,
}: WorkoutCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                padding: '0.5rem',
                margin: '1rem',
                width: '19rem',
                borderRadius: '15px',
                height: '15rem',
                backgroundColor: 'rgba(99, 112, 228, 0.05)',
            }}
        >
            <CardContent
                sx={{
                    overflow: 'auto',
                }}
            >
                <Typography
                    sx={{ fontSize: 14, color: '#353e54' }}
                    color="#FFFFFF"
                    gutterBottom
                >
                    {`Created ${
                        workout.createdAt
                            ? new Date(workout.createdAt)
                                  .toISOString()
                                  .split('T')[0]
                            : '[Date unavailable]'
                    }`}
                </Typography>
                <Typography
                    sx={{
                        mb: 1.5,
                        fontWeight: '600',
                        color: '#353e54',
                    }}
                    variant="h5"
                >
                    {workout.name ? workout.name : 'My Workout'}
                </Typography>
                <Typography
                    sx={{
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: '#353e54',
                    }}
                    variant="body2"
                    color="#353e54"
                >
                    {workout.notes
                        ? workout.notes
                        : 'No notes for this workout'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => {
                        handleOpen(workout);
                    }}
                    variant="outlined"
                    size="small"
                >
                    Open
                </Button>
                <Button
                    onClick={() => {
                        handleComplete(workout);
                    }}
                    variant="outlined"
                    color="success"
                    size="small"
                >
                    Complete
                </Button>
                <Button
                    onClick={() => {
                        handleRemove(workout._id);
                    }}
                    variant="outlined"
                    color="error"
                    size="small"
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}
