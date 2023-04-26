import { Container } from '@mui/material';
import { ActionCard } from './ActionCard';

export function Dashboard() {
    return (
        <Container>
            <h1>Dashboard</h1>
            <ActionCard
                actionName="Action 1"
                actionDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse"
            />
        </Container>
    );
}
