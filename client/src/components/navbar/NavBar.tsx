import { AppBar, Toolbar, Stack, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

export function NavBar() {
    return (
        <AppBar position="static" color="transparent" id="navbar">
            <Stack direction={'row'} id="navbar-container">
                <Toolbar disableGutters>
                    <h3>ProTracker</h3> {'\u00A0'}
                    <FontAwesomeIcon icon={faDumbbell} />
                </Toolbar>
                <Toolbar disableGutters>
                    <Stack direction={'row'} spacing={6}>
                        <Link href="/homepage" id="link-group">
                            Dashboard
                        </Link>
                        <Link href="/login" id="link-group">
                            Login
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
