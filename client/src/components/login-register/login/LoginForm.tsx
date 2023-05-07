import { Container, TextField, Button } from '@mui/material';
import { loginUser } from '../../../store/features/login-register-modal/modalSlice';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';

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

    return (
        <>
            <Container>
                <h2>Log in to your account</h2>
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
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        dispatch(loginUser(email, password));
                    }}
                >
                    Log in
                </Button>
            </Container>
        </>
    );
}
