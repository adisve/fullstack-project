import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import UserHeader from './userHeader/UserHeader';
import { useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AuthenticationModal } from '../dashboard/login-register/AuthenticationModal';

export function HomePage() {
    const [activeState, setActiveState] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <AuthenticationModal open={token == undefined} />;
    }

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
