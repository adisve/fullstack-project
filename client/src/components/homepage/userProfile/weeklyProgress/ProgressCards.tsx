import { Card, CardActionArea } from '@mui/material';
import { PerDayProgress } from './PerDayProgress';
import { WeeklyProgress } from './WeeklyProgress';

export function ProgressCards() {
    return (
        <div className="cards-section">
            <Card className="the-card-area card-area-weekly">
                <CardActionArea>
                    <WeeklyProgress />
                </CardActionArea>
            </Card>
            <br />
            <Card className="the-card-area card-area-day">
                <CardActionArea>
                    <PerDayProgress />
                </CardActionArea>
            </Card>
        </div>
    );
}
