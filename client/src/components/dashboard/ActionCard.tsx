import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader, Fab, IconButton } from '@mui/material';
import './ActionCard.css';

type ActionCardProps = {
    actionName: string;
    actionDescription: string;
};

export function ActionCard(ActionCardProps: ActionCardProps) {
    const { actionName, actionDescription } = ActionCardProps;

    return (
        <Card id="action-card">
            <CardHeader
                title={<span style={{ float: 'left' }}>{actionName}</span>}
                action={
                    <IconButton>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </IconButton>
                }
                id="action-card-header"
            />
            <CardContent style={{ display: 'flex' }}>
                <p className="action-card-description">{actionDescription}</p>
                <Fab id="action-card-fab" color="primary" aria-label="add">
                    <FontAwesomeIcon icon={faPlus} color="white" />
                </Fab>
            </CardContent>
        </Card>
    );
}
