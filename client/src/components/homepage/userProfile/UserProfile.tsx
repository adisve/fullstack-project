import { ProgressCards } from './weeklyProgress/ProgressCards';
import './UserProfile.css';
import { Container } from '@mui/material';

export function UserProfile() {
    return (
        <Container className="user-page">
            <h1>User Profile</h1>
            <ProgressCards />
        </Container>
    );
}
