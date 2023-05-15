import { NavBar } from '../navbar/NavBar';
import './AboutPage.css';
import { AboutProTrack } from './AboutProTrack';
import { OurTeam } from './OurTeam';

export function AboutUsPage() {
    return (
        <div className="about" style={{ minHeight: '100vh' }}>
            <NavBar />
            <AboutProTrack />
            <br />
            <OurTeam />
        </div>
    );
}
