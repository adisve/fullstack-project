import { Button, Link } from '@mui/material';

export function Start() {
    return (
        <section>
            <h1>One app the fitness industry loves.</h1>
            <p>Fitness has never been easier.</p>
            <p>
                Open a free account in minutes right from your phone or browser.
            </p>
            <Link href="/homepage">
                <Button className="primary-btn" variant="contained">
                    Get Started
                </Button>
            </Link>
        </section>
    );
}
