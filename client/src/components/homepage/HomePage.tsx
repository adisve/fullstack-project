import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import UserHeader from './userHeader/UserHeader';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { AuthenticationModal } from '../login-register/AuthenticationModal';
import {
    AuthStatus,
    authenticateUser,
} from '../../store/features/auth/authSlice';
import LoadingSpinner from '../general/LoadingSpinner';

import './HomePage.css';

export function HomePage() {
    const [activeState, setActiveState] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    const { auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        console.log('Authenticating user ..');
        dispatch(authenticateUser());
    }, []);

    if (
        auth.status == AuthStatus.unauthenticated ||
        auth.status == AuthStatus.error
    ) {
        return <AuthenticationModal open={true} />;
    }

    if (auth.status == AuthStatus.loading) {
        return <LoadingSpinner />;
    }

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
