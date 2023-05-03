import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, TextField } from '@mui/material';
import './Login.css';
import { AuthStatus, login } from '../../store/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import LoadingSpinner from '../general/LoadingSpinner';

type AppDispatch = ThunkDispatch<RootState, undefined, any>;

export function Login() {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useSelector((state: RootState) => state);

    const handleSubmit = () => {
        console.log(`Username: ${email}, Password: ${password}`);
        if (email && password) {
            dispatch(login(email, password));
        }
    };

    if (auth.status == AuthStatus.loading) {
        return <LoadingSpinner />;
    }

    if (auth.status == AuthStatus.error) {
        return <h1>Error</h1>;
    }

    if (auth.status == AuthStatus.authenticated) {
        <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div className="login-page">
            <Container className="login-header">
                <h1>Log in to your account</h1>
            </Container>
            <Container className="login-form">
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        label="Email/Username"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <Button
                    fullWidth
                    className="login-btn"
                    onClick={() => handleSubmit()}
                >
                    Log in
                </Button>
            </Container>
        </div>
    );
}
