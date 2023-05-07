import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { Footer } from './components/footer/Footer';
import { LandingPage } from './components/landingPage/LandingPage';
import { NavBar } from './components/navbar/NavBar';
import './components/footer/Footer.css';
import './components/landingPage/LandingPage.css';
import { ThemeProvider } from '@emotion/react';
import theme from './config/theme';

function App() {
    const isHomePage = ['/', '/about-us'].includes(window.location.pathname);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {isHomePage && <NavBar />}
                <main style={{ minHeight: '100vh' }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about-us" element={<AboutUsPage />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
                </main>
                {isHomePage && <Footer />}
            </div>
        </ThemeProvider>
    );
}

export default App;
