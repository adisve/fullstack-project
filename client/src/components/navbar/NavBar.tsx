import { AppBar, Toolbar, Stack, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/Logo.png';
import './NavBar.css';

export function NavBar() {
    return (
        <AppBar position="static" color="transparent" id="navbar">
            <Stack direction={'row'} id="navbar-container">
                <Toolbar disableGutters>
                    <img src={Logo} style={{ height: '60px', width: '60px' }} />
                </Toolbar>
                <Toolbar disableGutters>
                    <Stack direction={'row'} spacing={6}>
                        <Link href="/homepage" id="link-group">
                            Dashboard
                        </Link>
                        <Link href="/about-us" id="link-group">
                            About Us
                        </Link>
                    </Stack>
                </Toolbar>
            </Stack>
        </AppBar>
    );
}
