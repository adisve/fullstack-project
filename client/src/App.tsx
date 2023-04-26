import { LandingPage } from './components/landingPage/LandingPage';
import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';

import { Routes, Route, Outlet } from 'react-router-dom';

import './App.css';
import './components/landingPage/LandingPage.css';
import './components/footer/Footer.css';
import { Footer } from './components/footer/Footer';
import { NavBar } from './components/navbar/NavBar';
import { Dashboard } from './components/dashboard/Dashboard';
import { Suggestions } from './components/dashboard/suggestions/Suggestions';

function App() {
    return (
        <div className="App">
            <NavBar />
            <main
                style={{
                    minHeight: '100vh',
                }}
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/dashboard/*" element={<Dashboard />}>
                        <Route path="suggestions" element={<Suggestions />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
