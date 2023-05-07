import { Box, Container, Fab } from '@mui/material';
import { ActionCard } from './actionCard/ActionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationModal } from '../../dashboard/login-register/AuthenticationModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export function Dashboard() {
    const [activeState, setActiveState] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <AuthenticationModal open={token == undefined} />;
    }

    return (
        <Container>
            <Box>
                <ActionCard
                    actionName="Browse workouts"
                    actionDescription="Look through a collection of workouts, tailored to your profile."
                />
            </Box>
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
