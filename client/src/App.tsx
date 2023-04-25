import { LandingPage } from './components/landingPage/LandingPage';
import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';

import { Routes, Route } from 'react-router-dom';

import './App.css';
import './components/landingPage/LandingPage.css';
import './components/footer/Footer.css';
import { Footer } from './components/footer/Footer';
import { NavBar } from './components/navbar/NavBar';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
    return (
        <div className="App">
            {['/', '/about-us'].includes(window.location.pathname) ? (
                <NavBar />
            ) : (
                <></>
            )}
            <main
                style={{
                    minHeight: '100vh',
                }}
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
            {['/', '/about-us'].includes(window.location.pathname) ? (
                <Footer />
            ) : (
                <></>
            )}
        </div>
    );
}

export default App;
