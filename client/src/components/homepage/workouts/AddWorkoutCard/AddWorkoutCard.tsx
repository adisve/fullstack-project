import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardActionArea } from '@mui/material';

type AddWorkoutCardProps = {
    workoutAdded: (added: boolean) => void;
};

export function AddWorkoutCard(props: AddWorkoutCardProps) {
    const { workoutAdded } = props;
    return (
        <Card
            sx={{
                height: '480px',
                width: '380px',
                display: 'flex',
                borderRadius: '20px',
            }}
        >
            <CardActionArea onClick={() => workoutAdded(true)}>
                <h1>
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                </h1>
            </CardActionArea>
        </Card>
    );
}
