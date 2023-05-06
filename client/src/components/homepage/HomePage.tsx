import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Drawer, Fab } from '@mui/material';
import { Outlet } from 'react-router-dom';

import UserHeader from './userHeader/UserHeader';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { ActionCard } from './dashboard/actionCard/ActionCard';

export function HomePage() {
    const [activeState, setActiveState] = useState(false);

    return (
        <>
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
                <Sidebar
                    activeState={activeState}
                    toggleActiveState={setActiveState}
                />
                <Box>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
}
