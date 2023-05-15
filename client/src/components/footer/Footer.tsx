import { AppBar, Stack, Toolbar, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
export function Footer() {
    return (
        <AppBar position="static" color="transparent" id="footer">
            <Stack direction={'row'} spacing={3}>
                <Toolbar>
                    <h3>
                        ProTracker{'\u00A0'}{' '}
                        <FontAwesomeIcon icon={faDumbbell} />
                    </h3>
                </Toolbar>
                <Toolbar disableGutters={true}>
                    <Stack direction={'row'} spacing={3}>
                        <Link href="/homepage" id="link-group">
                            Contact Info
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
