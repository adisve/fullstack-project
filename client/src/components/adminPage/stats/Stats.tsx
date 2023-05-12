import { Card, CardActionArea } from '@mui/material';
import { UsersSignedUp } from './UsersSignedUp';
import { WorkoutsInSystem } from './WorkoutsInSystem';

export function Stats() {
    return (
        <div className="stats-section">
            <h3>Statistics</h3>
            <Card
                sx={{
                    height: '300px',
                    display: 'flex',
                    borderRadius: '20px',
                }}
            >
                <CardActionArea>
                    <UsersSignedUp />
                </CardActionArea>
            </Card>
            <br />

            <Card
                sx={{
                    height: '350px',
                    display: 'flex',
                    borderRadius: '20px',
                }}
            >
                <CardActionArea>
                    <WorkoutsInSystem />
                </CardActionArea>
            </Card>
        </div>
    );
}
