import { Container, Fab, Box, Button } from '@mui/material';
import people from '../../assets/people.png';

export function LandingPage() {
    return (
        <div id="landing-page">
            <section className="section-1">
                <h1>One app the fitness industry loves.</h1>
                <p>
                    Fitness has never been easier with ProTracker. Open a free
                    account in minutes right from your phone or browser.
                </p>
                <Button className="get-started-btn" variant="contained">
                    Get started
                </Button>
            </section>
        </div>
    );
}
