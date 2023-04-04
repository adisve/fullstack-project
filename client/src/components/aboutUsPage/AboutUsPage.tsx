import { Container } from '@mui/material';
import { OurTeam } from './OurTeam';
import { AboutProTrack } from './AboutProTrack';
import './AboutPage.css';

export function AboutUsPage() {
    return (
        <Container className="about">
            <h1>NAVBAR here...</h1>
            <AboutProTrack />
            <br />
            <OurTeam />
        </Container>
    );
}
