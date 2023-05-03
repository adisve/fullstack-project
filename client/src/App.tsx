import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { Footer } from './components/footer/Footer';
import { LandingPage } from './components/landingPage/LandingPage';
import { Login } from './components/login/Login';
import { NavBar } from './components/navbar/NavBar';
import './components/footer/Footer.css';
import './components/landingPage/LandingPage.css';
import { RootState } from './store/store';

function App() {
    const isHomePage = ['/', '/about-us'].includes(window.location.pathname);
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <div className="App">
            {isHomePage && <NavBar />}
            <main style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    {token ? (
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    ) : (
                        <Route
                            path="/dashboard/*"
                            element={<Navigate to="/login" />}
                        />
                    )}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            {isHomePage && <Footer />}
        </div>
    );
}

export default App;
