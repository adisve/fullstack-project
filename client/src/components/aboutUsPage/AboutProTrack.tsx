import { Stack, Box } from '@mui/material';

import peopleExercisingOverlay from '../../assets/people_exercising_overlay.png';
import './AboutPage.css';

export function AboutProTrack() {
    return (
        <div className="about-us-hero">
            <h5 className="heading">ABOUT</h5>

            <div className="about-us">
                <div className="about-us-text">
                    <p>
                        <span className="paragraph-brand-name">ProTracker</span>{' '}
                        is a cutting-edge fitness tracker that helps you keep
                        track of your physical activities and progress towards
                        your fitness goals. It is designed to be user-friendly,
                        easy to navigate, and packed with features that will
                        motivate you to stay active and healthy.
                    </p>
                    <p>
                        ProTracker is equipped with advanced functionality that
                        considering your specs data will give you a
                        comprehensive overview of your health and fitness. With
                        the ProTracker app, you can set goals, track your
                        progress, and get personalized recommendations based on
                        your fitness level and preferences. The tracker is
                        perfect for all kinds of activities, whether you are
                        swimming, running, or biking.
                    </p>
                    <p>
                        In short, the ProTrack fitness tracker is a must-have
                        for anyone who is serious about their health and wants
                        to achieve their fitness goals.
                    </p>
                </div>
                <img
                    src={peopleExercisingOverlay}
                    alt="ProTracker"
                    className="protrack-image"
                />
            </div>
        </div>
    );
}
