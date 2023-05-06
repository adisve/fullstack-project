import { AboutUsPage } from './components/aboutUsPage/AboutUsPage';
import { LandingPage } from './components/landingPage/LandingPage';

import { Route, Routes } from 'react-router-dom';

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
                    <Route path="/homepage/*" element={<HomePage />}>
                        <Route path="exercises" element={<Exercises />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="workouts" element={<Workouts />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="" element={<Dashboard />} />
                    </Route>
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
