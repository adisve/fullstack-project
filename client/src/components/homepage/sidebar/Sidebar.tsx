import {
    faAmbulance,
    faDashboard,
    faDumbbell,
    faRunning,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

type SidebarProps = {
    activeState: boolean;
    toggleActiveState: (activeState: boolean) => void;
};

function iconSelect(iconName: string) {
    switch (iconName) {
        case 'Workouts':
            return faRunning;
        case 'Exercises':
            return faDumbbell;
        case 'Profile':
            return faUser;
        case 'Dashboard':
            return faDashboard;
        default:
            return faAmbulance;
    }
}

export function Sidebar(props: SidebarProps) {
    const { activeState, toggleActiveState } = props;

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            anchor="right"
            open={activeState}
            onClose={() => toggleActiveState(false)}
        >
            <List>
                {['Dashboard', 'Workouts', 'Exercises', 'Profile'].map(
                    (text, _) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                    to={`${text.toLowerCase()}`}
                                >
                                    <ListItemText
                                        primary={
                                            <span>
                                                <ListItemIcon
                                                    sx={{
                                                        margin: '0.2em',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={iconSelect(text)}
                                                    />
                                                </ListItemIcon>
                                                {text}
                                            </span>
                                        }
                                    ></ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
        </Drawer>
    );
}