import {
    faChevronRight,
    faEllipsis,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Fab,
    IconButton,
} from '@mui/material';

// ActionCard props:
type ActionCardProps = {
    actionName: string;
    actionDescription: string;
};

export function ActionCard(ActionCardProps: ActionCardProps) {
    const { actionName, actionDescription } = ActionCardProps;

    return (
        <Card className="action-card" style={{ position: 'relative' }}>
            <CardHeader
                title={<span className="card-header">{actionName}</span>}
            />
            <CardContent>
                <p className="card-description">{actionDescription}</p>
            </CardContent>
            <FontAwesomeIcon
                icon={faChevronRight}
                size="lg"
                color="white"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: '1rem',
                }}
            />
        </Card>
    );
}
