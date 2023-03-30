import { LandingPage } from './components/landingPage/LandingPage';
import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';

import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import './App.css';

function App() {
    return (
        <div className="App">
            <Container>
                <main>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about-us" element={<AboutUsPage />} />
                    </Routes>
                </main>
            </Container>
        </div>
    );
}

export default App;
