import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import './AboutPage.css';

export function OurTeam() {
    return (
        <Box
            top={'10%'}
            textAlign={'center'}
            marginTop={'4em'}
            marginBottom={'4em'}
        >
            <h1 className="heading">Our Team</h1>
            <p>
                Our team is a diverse group of talented individuals with a
                passion for innovation and excellence. We come from different
                backgrounds, cultures, and disciplines, but we share a common
                goal: to make a positive impact in the world through our work.
                We value collaboration, creativity, and continuous learning, and
                we strive to create a supportive and inclusive environment where
                everyone can thrive. With our combined expertise and experience,
                we tackle challenges and deliver innovative solutions that meet
                the needs of our clients and partners.
            </p>

            <Grid container spacing={4} marginTop={'4em'}>
                {theTeam.map(({ img, name, role }) => (
                    <Grid item key={name} xs={12} md={6} lg={3}>
                        <Card
                            className="team-card"
                            sx={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    1: 1,
                                    width: '100%',
                                    height: 350,
                                }}
                                image={img}
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {name}
                                </Typography>
                                <Typography>{role}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

const theTeam = [
    {
        img: 'https://source.unsplash.com/random/?man',
        name: 'Dzenis',
        role: 'Developer',
    },
    {
        img: 'https://source.unsplash.com/random/?woman',
        name: 'Anam',
        role: 'Developer',
    },
    {
        img: 'https://source.unsplash.com/random/?women',
        name: 'Liis',
        role: 'Developer',
    },
    {
        img: 'https://source.unsplash.com/random/?guy',
        name: 'Adis',
        role: 'Developer',
    },
];
