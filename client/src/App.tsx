import { Route, Routes } from 'react-router-dom';

import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';
import { LandingPage } from './components/landingPage/LandingPage';

import './App.css';
import './components/footer/Footer.css';
import './components/landingPage/LandingPage.css';

import { HomePage } from './components/homepage/HomePage';
import { Footer } from './components/footer/Footer';
import { NavBar } from './components/navbar/NavBar';
import { Exercises } from './components/homepage/exercises/Exercises';
import { Dashboard } from './components/homepage/dashboard/Dashboard';
import { Workouts } from './components/homepage/workouts/Workouts';
import { UserProfile } from './components/homepage/userProfile/UserProfile';
import { AdminPage } from './components/adminPage/AdminPage';
import { ThemeProvider } from '@mui/material';
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
                        <Route path="/homepage/*" element={<HomePage />}>
                            <Route path="exercises" element={<Exercises />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="workouts" element={<Workouts />} />
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="" element={<Dashboard />} />
                        </Route>
                        <Route path="admin" element={<AdminPage />} />
                    </Routes>
                </main>
                {isHomePage && <Footer />}
            </div>
        </ThemeProvider>
    );
}

export default App;
