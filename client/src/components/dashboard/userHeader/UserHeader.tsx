import { Avatar, Container } from '@mui/material';
import './UserHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function UserHeader() {
    return (
        <Container
            sx={{ display: 'flex', paddingBottom: '1em', paddingTop: '1em' }}
        >
            <Avatar
                sx={{ width: 50, height: 50 }}
                alt="User Name"
                src="/static/images/avatar/1.jpg"
            />
            <div className="user-header-text" style={{ display: 'block' }}>
                <p>Hello, user</p>
                <p>Thursday, 10 Sep</p>
            </div>
            <FontAwesomeIcon
                style={{ color: '#727ee5', marginLeft: '0.5em' }}
                icon={faChevronCircleDown}
            />
        </Container>
    );
}
