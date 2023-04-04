import { Stack, Box } from '@mui/material';

import people from '../../assets/people.png';
import './AboutPage.css';

export function AboutProTrack() {
    return (
        <Box
            top={'10%'}
            textAlign={'center'}
            marginTop={'4em'}
            marginBottom={{ sm: '5em', md: '4em' }}
        >
            <h1 className="heading">About ProTracker</h1>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{ alignItems: 'center', gap: '2em' }}
            >
                <Box
                    width={{ xs: '100%', md: '60%' }}
                    textAlign={{ xs: 'center', md: 'left' }}
                >
                    <p>
                        ProTracker is a cutting-edge fitness tracker that helps
                        you keep track of your physical activities and progress
                        towards your fitness goals. It is designed to be
                        user-friendly, easy to navigate, and packed with
                        features that will motivate you to stay active and
                        healthy.
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
                </Box>
                <Box
                    width={{ xs: '60%', md: '40%' }}
                    height={{ sm: '10em', md: '16em' }}
                >
                    <img
                        src={people}
                        alt="ProTracker"
                        style={{
                            width: '100%',
                            height: '150%',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
}
