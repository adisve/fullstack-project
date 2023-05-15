import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Link, Stack, Toolbar } from '@mui/material';
import './NavBar.css';
import PhoneMenu from './PhoneMenu';

export function NavBar() {
    const screenBreakpoint = document.body.clientWidth;

    return (
        <AppBar position="static" color="transparent" id="navbar">
            <Stack direction={'row'} id="navbar-container">
                <Toolbar disableGutters>
                    <h3>ProTracker</h3> {'\u00A0'}
                    <FontAwesomeIcon icon={faDumbbell} />
                </Toolbar>
                <Toolbar disableGutters>
                    {screenBreakpoint > 600 ? (
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
                    ) : (
                        <PhoneMenu />
                    )}
                </Toolbar>
            </Stack>
        </AppBar>
    );
}
