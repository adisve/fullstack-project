import { LandingPage } from './components/landingPage/LandingPage';
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
                    </Routes>
                </main>
            </Container>
        </div>
    );
}

export default App;
