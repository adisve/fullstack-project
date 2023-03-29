import { LandingPage } from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
