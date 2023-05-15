import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardActionArea } from '@mui/material';
import './AddWorkoutCard.css';

type AddWorkoutCardProps = {
    workoutAdded: (added: boolean) => void;
};

export function AddWorkoutCard(props: AddWorkoutCardProps) {
    const { workoutAdded } = props;
    return (
        <Card className="add-workout-card">
            <CardActionArea onClick={() => workoutAdded(true)}>
                <h1>
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                </h1>
            </CardActionArea>
        </Card>
    );
}
