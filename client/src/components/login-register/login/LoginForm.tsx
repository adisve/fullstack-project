import { Container, TextField, Button } from '@mui/material';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStatus, loginUser } from '../../../store/features/auth/authSlice';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

export function LoginForm({
    email,
    password,
    setEmail,
    setPassword,
}: LoginFormProps) {
    const dispatch: AppDispatch = useDispatch();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    return (
        <div className="login-container">
            <Container>
                <h2>Log in to your account</h2>
            </Container>
            <Container className="login-form">
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        label="Email"
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
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        dispatch(loginUser(email, password));
                    }}
                >
                    Log in
                </Button>
                {authStatus == AuthStatus.error && (
                    <h4 style={{ color: 'red' }}>
                        This account does not exist
                    </h4>
                )}
            </Container>
        </div>
    );
}