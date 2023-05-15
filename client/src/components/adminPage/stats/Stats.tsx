import { Card, CardActionArea } from '@mui/material';
import { UsersSignedUp } from './UsersSignedUp';
import { WorkoutsInSystem } from './WorkoutsInSystem';

export function Stats() {
    return (
        <div className="stats-section">
            <h3>Statistics</h3>
            <Card className="card-area card-area-users">
                <CardActionArea>
                    <UsersSignedUp />
                </CardActionArea>
            </Card>
            <br />
            <Card className="card-area card-area-workouts">
                <CardActionArea>
                    <WorkoutsInSystem />
                </CardActionArea>
            </Card>
        </div>
    );
}
