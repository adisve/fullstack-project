import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader } from '@mui/material';
import './ActionCard.css';

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
                    cursor: 'pointer',
                }}
                onClick={() => console.log('Clicked')}
            />
        </Card>
    );
}
