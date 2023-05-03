import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Drawer, Fab } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ActionCard } from './actionCard/ActionCard';
import UserHeader from './userHeader/UserHeader';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';

export function Dashboard() {
    const [activeState, setActiveState] = useState(false);

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
