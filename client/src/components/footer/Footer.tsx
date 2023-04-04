import { AppBar, Stack, Toolbar, Link } from '@mui/material';

export function Footer() {
    // The footer should contain the logo, sitemap and contact info and should be fixed at bottom of screen
    return (
        <AppBar
            position="static"
            color="transparent"
            style={{
                boxShadow: 'none',
                color: 'white',
                border: 'solid 0.2em transparent',
                borderTopColor: 'white',
            }}
        >
            <Stack direction={'row'} spacing={3}>
                <Toolbar>
                    <h3>Logo</h3>
                </Toolbar>
                <Toolbar disableGutters={true}>
                    <Stack direction={'row'} spacing={3}>
                        <Link href="/login" id="navbar-link-group">
                            Contact Info
                        </Link>
                        <Link href="/about-us" id="navbar-link-group">
                            About Us
                        </Link>
                    </Stack>
                </Toolbar>
            </Stack>
        </AppBar>
    );
}
