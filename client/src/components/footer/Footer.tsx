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
            <Stack direction="row" justifyContent="space-between">
                <Toolbar>
                    <h3>Logo</h3>
                </Toolbar>
                <Toolbar disableGutters={true}>
                    <Link href="#" color="inherit">
                        Contact
                    </Link>
                    <Link href="#" color="inherit">
                        Contact
                    </Link>
                    <Link href="#" color="inherit">
                        Contact
                    </Link>
                </Toolbar>
            </Stack>
        </AppBar>
    );
}
