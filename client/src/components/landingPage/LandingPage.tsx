import { Carousel } from './Carousel';
import { Start } from './sections/Start';
import { Features } from './sections/Features';

export function LandingPage() {
    return (
        <div id="landing-page">
            <Carousel children={[<Start />, <Features />]} />
        </div>
    );
}
