import { Carousel } from './Carousel';
import { Start } from './sections/Start';
import { Features } from './sections/Features';
import { Suggestions } from './sections/Suggestions';
import { NavBar } from '../navbar/NavBar';

export function LandingPage() {
    return (
        <div id="landing-page">
            <NavBar />
            <Carousel children={[<Start />, <Features />, <Suggestions />]} />
        </div>
    );
}
