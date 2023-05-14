import { Avatar, Button, Container } from '@mui/material';
import './UserHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type UserHeaderProps = {
    toggleDrawer: any;
    drawerState: boolean;
};

export default function UserHeader(userHeaderProps: UserHeaderProps) {
    const { toggleDrawer, drawerState } = userHeaderProps;
    const { auth } = useSelector((state: RootState) => state);

    return (
        <Container className="user-header-container">
            <Avatar
                sx={{ width: 50, height: 50 }}
                alt="User avatar"
                src="/static/images/avatar/1.jpg"
            />
            <div className="user-header-text" style={{ display: 'block' }}>
                <p>Hello, {auth.user?.name}</p>
                <p>{new Date().toDateString()}</p>
            </div>
            <FontAwesomeIcon
                style={{ color: '#727ee5', marginLeft: '0.5em' }}
                icon={faChevronCircleDown}
            />
            <Button
                variant="outlined"
                sx={{
                    marginLeft: 'auto',
                    marginRight: '1em',
                    borderColor: '#727ee5',
                    color: '#727ee5',
                }}
                onClick={() => toggleDrawer(!drawerState)}
            >
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </Button>
        </Container>
    );
}
