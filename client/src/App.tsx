import { LandingPage } from './components/landingPage/LandingPage';
import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';

import { Routes, Route } from 'react-router-dom';

import './App.css';
import './components/landingPage/LandingPage.css';
import { Footer } from './components/footer/Footer';

function App() {
    return (
        <div className="App">
            <main
                style={{
                    minHeight: '100vh',
                }}
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
