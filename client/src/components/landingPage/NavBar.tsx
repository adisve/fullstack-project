import { AppBar, Toolbar, Stack, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

export function NavBar() {
    return (
        <AppBar position="static" color="transparent" id="navbar">
            <Stack direction={'row'} id="navbar-container">
                <Toolbar disableGutters>
                    <h3>ProTracker</h3> {'\u00A0'}
                    <FontAwesomeIcon icon={faDumbbell} />
                </Toolbar>
                <Toolbar disableGutters>
                    <Stack direction={'row'} spacing={3}>
                        <Link href="/dashboard" id="link-group">
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
