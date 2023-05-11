import { Container } from '@mui/system';
import { Users } from './users/Users';
import { Stats } from './stats/Stats';
import './AdminPage.css';
import { Divider } from '@mui/material';

export function AdminPage() {
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
