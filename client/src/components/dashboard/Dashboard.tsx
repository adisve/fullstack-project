import { Container, Fab } from '@mui/material';
import { ActionCard } from './ActionCard';
import { Outlet } from 'react-router-dom';
import UserHeader from './userHeader/UserHeader';

export function Dashboard() {
    return (
        <div>
            <UserHeader />
            <Outlet />
        </div>
    );
}
