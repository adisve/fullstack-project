import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader } from '@mui/material';
import './ActionCard.css';
import { Link } from 'react-router-dom';

type ActionCardProps = {
    actionName: string;
    actionDescription: string;
    linkTo: string;
};

export function ActionCard(ActionCardProps: ActionCardProps) {
    const { actionName, actionDescription, linkTo } = ActionCardProps;

    return (
        <Card className="action-card" style={{ position: 'relative' }}>
            <CardHeader
                title={<span className="card-header">{actionName}</span>}
            />
            <CardContent>
                <p className="card-description">{actionDescription}</p>
            </CardContent>
            <Link to={`${linkTo}`}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    size="lg"
                    color="white"
                    className="card-floating-btn"
                />
            </Link>
        </Card>
    );
}
