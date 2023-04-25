import { Container } from '@mui/material';
import { ActionCard } from './ActionCard';

export function Dashboard() {
    return (
        <Container>
            <h1>Dashboard</h1>
            <ActionCard
                actionName="Action 1"
                actionDescription="This is the description for action 1."
            />
        </Container>
    );
}
