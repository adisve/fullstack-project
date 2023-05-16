import { AppBar, Stack, Toolbar, Link } from '@mui/material';
import Logo from '../../assets/Logo.png';

export function Footer() {
    return (
        <AppBar position="static" color="transparent" id="footer">
            <Stack direction={'row'} spacing={3}>
                <Toolbar>
                    <img src={Logo} style={{ height: '30px', width: '30px' }} />
                </Toolbar>
                <Toolbar disableGutters={true}>
                    <Stack direction={'row'} spacing={3}>
                        <Link
                            style={{ color: '#353e54' }}
                            href="/about-us"
                            id="link-group"
                        >
                            About Us
                        </Link>
                    </Stack>
                </Toolbar>
            </Stack>
        </AppBar>
    );
}
