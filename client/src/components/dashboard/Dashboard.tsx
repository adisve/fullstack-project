import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Fab, Modal, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ActionCard } from './actionCard/ActionCard';
import UserHeader from './userHeader/UserHeader';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AuthenticationModal } from './login-register/AuthenticationModal';

export function Dashboard() {
    const [activeState, setActiveState] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <AuthenticationModal open={token == undefined} />;
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <UserHeader
                toggleDrawer={setActiveState}
                drawerState={activeState}
            />
            <Box>
                <Outlet />
                <ActionCard
                    actionName="Browse workouts"
                    actionDescription="Look through a collection of workouts, tailored to your profile."
                />
            </Box>
            <Sidebar
                activeState={activeState}
                toggleActiveState={setActiveState}
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
