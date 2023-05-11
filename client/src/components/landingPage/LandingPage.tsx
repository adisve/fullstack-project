import { Carousel } from './Carousel';
import { Start } from './sections/Start';
import { Features } from './sections/Features';
import { Suggestions } from './sections/Suggestions';

export function LandingPage() {
    return (
        <div id="landing-page">
            <Carousel children={[<Start />, <Features />, <Suggestions />]} />
        </div>
    );
}
