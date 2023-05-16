import { Box, Container, Fab } from '@mui/material';
import { ActionCard } from './actionCard/ActionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function Dashboard() {
    return (
        <Container>
            <Box
            >
                <ActionCard
                    actionName="Browse exercises"
                    actionDescription="Look through a collection of exercises, tailored to your profile. Or create your own!"
                    linkTo="/homepage/exercises"
                />
                <ActionCard
                    actionName="Browse workouts"
                    actionDescription="Add your daily workouts to your profile, and keep track of your progress."
                    linkTo="/homepage/workouts"
                />
                <ActionCard
                    actionName="Your profile"
                    actionDescription="View your profile."
                    linkTo="/homepage/profile"
                />
            </Box>
            <Link to="/homepage/workouts">
                <Fab className="floating-btn" variant="extended">
                    <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        style={{ marginRight: '1em' }}
                    />
                    <h4>Add Workout</h4>
                </Fab>
            </Link>
        </Container>
    );
}
