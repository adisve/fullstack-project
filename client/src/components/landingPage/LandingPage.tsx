import {
    Container,
    Fab,
    Box,
    AppBar,
    Stack,
    Toolbar,
    Link,
} from '@mui/material';
import { NavBar } from './NavBar';
import people from '../../assets/people.png';

export function LandingPage() {
    return (
        <Container>
            <NavBar />
            <Box top={'10%'} textAlign={'left'} marginTop={'4em'}>
                <Box display={'flex'}>
                    <Box
                        width={'50%'}
                        height={'fit-content'}
                        textOverflow={'ellipsis'}
                    >
                        <h1>Fitness Tracker</h1>
                        <div>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.
                        </div>
                    </Box>
                    <Box width={'50%'} height={'16em'}>
                        <img
                            src={people}
                            alt="Nothing here"
                            style={{
                                width: '100%',
                                height: '150%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Box>
                <Fab
                    color="primary"
                    variant="extended"
                    style={{ marginTop: '1em', float: 'left' }}
                >
                    Register now
                </Fab>
            </Box>
        </Container>
    );
}
