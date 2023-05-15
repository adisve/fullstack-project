import { Container } from '@mui/system';
import { Users } from './users/Users';
import { Stats } from './stats/Stats';
import './AdminPage.css';
import { useSelector } from 'react-redux';
import { AuthStatus } from '../../store/features/auth/authSlice';
import { RootState } from '../../store/store';
import LoadingSpinner from '../general/LoadingSpinner';
import { AuthenticationModal } from '../login-register/AuthenticationModal';

export function AdminPage() {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const auth = useSelector((state: RootState) => state);

    if (
        authStatus == AuthStatus.unauthenticated ||
        authStatus == AuthStatus.error ||
        auth.auth.user?.role != 'admin'
    ) {
        return <AuthenticationModal open={true} />;
    }

    if (authStatus == AuthStatus.loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="admin-page">
            <h1>Admin dashboard</h1>
            <Stats />
            <Users />
        </Container>
    );
}
