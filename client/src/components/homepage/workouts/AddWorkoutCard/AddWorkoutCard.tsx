import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardActionArea, Fab } from '@mui/material';

export function AddWorkoutCard() {
    return (
        <Card
            sx={{
                height: '480px',
                width: '380px',
                display: 'flex',
                borderRadius: '20px',
            }}
        >
            <CardActionArea>
                <h1>
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                </h1>
            </CardActionArea>
        </Card>
    );
}
