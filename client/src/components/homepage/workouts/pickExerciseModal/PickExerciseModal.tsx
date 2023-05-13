import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    Typography,
    styled,
} from '@mui/material';
// TODO: replace exercise.json call with actual user call
import exercises from '../../exercises/exercises.json';
import '../../exercises/Exercises.css';

const StyledDialog = styled((props: any) => <Dialog {...props} />)(({ _ }) => ({
    // Set border radius to 20px
    '& .MuiDialog-paper': {
        borderRadius: 20,
    },
}));

type PickExerciseModalProps = {
    open: boolean;
    handleClose: any;
    setExercises: any;
    currentExercises: any;
};

export function PickExerciseModal(props: any) {
    const { open, handleClose, setExercises, currentExercises } = props;

    function appendExercises(exercise: any) {
        setExercises([...currentExercises, exercise]);
        handleClose(false);
    }

    const cardWidth = window.screen.width > 768 ? '21.4em' : '15.4em';

    return (
        <StyledDialog open={open} onClose={() => handleClose(false)}>
            <DialogContent>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Pick Exercises
                </DialogTitle>
                {exercises.map((exercise: any) => (
                    <Card
                        className="exercise-card"
                        sx={{ width: cardWidth, margin: '1em' }}
                        key={exercise._id}
                    >
                        <CardActionArea
                            onClick={() => appendExercises(exercise)}
                        >
                            <CardHeader
                                sx={{ textAlign: 'center' }}
                                title={exercise.name}
                                subheader={`Sets: ${exercise.sets} Reps: ${exercise.reps} Weight: ${exercise.weight}`}
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ overflow: 'auto' }}
                                >
                                    {exercise.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </DialogContent>
        </StyledDialog>
    );
}
