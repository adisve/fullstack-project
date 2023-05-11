import { Container } from '@mui/system';
import { Users } from './users/Users';
import { Stats } from './stats/Stats';
import './AdminPage.css';
import { Divider } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthStatus } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import LoadingSpinner from '../general/LoadingSpinner';
import { Navigate } from 'react-router-dom';

export function AdminPage() {
    // const authStatus = useSelector((state: RootState) => state.auth.status);
    // const auth = useSelector((state: RootState) => state.auth);

    // if (
    //     authStatus == AuthStatus.unauthenticated ||
    //     authStatus == AuthStatus.error ||
    //     auth.user?.role !== 'admin'
    // ) {
    //     <Navigate to="/homepage" />;
    // }

    // if (authStatus == AuthStatus.loading) {
    //     return <LoadingSpinner />;
    // }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>Admin dashboard</h1>
                {/* <Stats />
                <Divider /> */}
                <Users />
            </Container>
        </>
    );
}
