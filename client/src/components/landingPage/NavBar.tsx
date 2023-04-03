import { AppBar, Container, Toolbar, Box, Stack, Link } from '@mui/material';

export function NavBar() {
    return (
        <AppBar position="static" color="transparent">
            <Container
                maxWidth="xl"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    textOverflow: 'ellipsis',
                }}
            >
                <Toolbar disableGutters>
                    <h3>Logo</h3>
                </Toolbar>
                <Toolbar disableGutters>
                    <Stack direction={'row'} spacing={3}>
                        <Link
                            underline="none"
                            color={'white'}
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link underline="none" color={'white'} href="/login">
                            Login
                        </Link>
                        <Link underline="none" color={'white'} href="/about-us">
                            About Us
                        </Link>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
