import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
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
        <Card
            style={{
                marginTop: '1rem',
                height: '18em',
                width: '32em',
            }}
        >
            <CardHeader
                title={
                    <span
                        style={{
                            float: 'left',
                            color: 'white',
                        }}
                    >
                        {actionName}
                    </span>
                }
                action={
                    <IconButton>
                        <FontAwesomeIcon icon={faEllipsis} color="white" />
                    </IconButton>
                }
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                }}
            />
            <CardContent
                style={{
                    display: 'flex',
                }}
            >
                <p
                    style={{
                        textAlign: 'left',
                        width: '80%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {actionDescription}
                </p>
                <Fab
                    style={{
                        position: 'relative',
                        left: '2rem',
                        top: '8rem',
                    }}
                    color="primary"
                    aria-label="add"
                >
                    <FontAwesomeIcon icon={faPlus} color="white" />
                </Fab>
            </CardContent>
        </Card>
    );
}
