import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Fab } from '@mui/material';
import { ActionCard } from '../ActionCard';
import './Suggestions.css';

export function Suggestions() {
    return (
        <Container sx={{ position: 'relative', paddingBottom: '80px' }}>
            <ActionCard
                actionName="Browse workouts"
                actionDescription="Look through a collection of workouts, tailored to your profile."
            />
            <ActionCard
                actionName="Making your own workouts"
                actionDescription="Be creative and plan your own workout or make one from a provided template."
            />
            <ActionCard
                actionName="Nutritional plans"
                actionDescription="Check out our nutritional programs and plans that could offer you extra opportunities during your training process."
            />
            <ActionCard
                actionName="Your progress"
                actionDescription="View your progress, receive analytical feedback, and see how far you've come."
            />
            <Fab className="floating-btn" variant="extended">
                <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: '1em' }}
                />
                <h4>Add Workout</h4>
            </Fab>
        </Container>
    );
}
