import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import UserHeader from './userHeader/UserHeader';
import { useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';

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
