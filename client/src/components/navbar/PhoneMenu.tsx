import styled from '@emotion/styled';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Link_ = styled((props: any) => <Link {...props} />)(({ _ }) => ({
    textDecoration: 'none',
    color: 'black',
}));

export default function PhoneMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link_ to="/homepage">
                    <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </Link_>
                <Link_ to="/homepage/profile">
                    <MenuItem onClick={handleClose}>To Profile</MenuItem>
                </Link_>
                <Link_ to="/about-us">
                    <MenuItem onClick={handleClose}>About Us</MenuItem>
                </Link_>
            </Menu>
        </div>
    );
}
