import { Container, Fab, Box } from '@mui/material';
import people from '../../assets/people.png';
import { NavBar } from '../navbar/NavBar';

export function LandingPage() {
    return (
        <Container style={{ minHeight: '100vh' }}>
            <NavBar />
            <Box id="landing-page-box">
                <Box display={'flex'}>
                    <Box id="landing-page-text">
                        <h1>Fitness Tracker</h1>
                        <div>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.
                        </div>
                    </Box>
                    <Box id="landing-page-image-box">
                        <img
                            src={people}
                            alt="Nothing here"
                            id="landing-page-image"
                        />
                    </Box>
                </Box>
            </Box>
            <Fab
                color="primary"
                variant="extended"
                id="landing-page-fab"
                href="/homepage"
            >
                Register Now!
            </Fab>
        </Container>
    );
}
