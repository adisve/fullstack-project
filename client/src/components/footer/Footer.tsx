import { AppBar, Stack, Toolbar, Link } from '@mui/material';

export function Footer() {
    return (
        <AppBar position="static" color="transparent" id="footer">
            <Stack direction={'row'} spacing={3}>
                <Toolbar>
                    <h3>Logo</h3>
                </Toolbar>
                <Toolbar disableGutters={true}>
                    <Stack direction={'row'} spacing={3}>
                        <Link href="/login" id="link-group">
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
