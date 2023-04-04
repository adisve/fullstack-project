import { AppBar, Container, Toolbar, Box, Stack, Link } from '@mui/material';

export function NavBar() {
    return (
        <AppBar position="static" color="transparent" id="navbar">
            <Stack direction={'row'} id="navbar-container">
                <Toolbar disableGutters>
                    <h3>Logo</h3>
                </Toolbar>
                <Toolbar disableGutters>
                    <Stack direction={'row'} spacing={3}>
                        <Link href="/dashboard" id="navbar-link-group">
                            Dashboard
                        </Link>
                        <Link href="/login" id="navbar-link-group">
                            Login
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
