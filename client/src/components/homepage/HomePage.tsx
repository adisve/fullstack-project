import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import UserHeader from './userHeader/UserHeader';
import { useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AuthenticationModal } from '../login-register/AuthenticationModal';
import { AuthStatus } from '../../store/features/auth/authSlice';
import LoadingSpinner from '../general/LoadingSpinner';

import './HomePage.css';

export function HomePage() {
    const [activeState, setActiveState] = useState(false);
    const authStatus = useSelector((state: RootState) => state.auth.status);

    // if (
    //     authStatus == AuthStatus.unauthenticated ||
    //     authStatus == AuthStatus.error
    // ) {
    //     return <AuthenticationModal open={true} />;
    // }

    // if (authStatus == AuthStatus.loading) {
    //     return <LoadingSpinner />;
    // }

    return (
        <>
            <Container className="home-page">
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
