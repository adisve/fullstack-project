import React, { useState } from 'react';
import './LoginModal.css';
import {
    Modal,
    Box,
    Button,
    Container,
    TextField,
    Tab,
    Tabs,
} from '@mui/material';

interface LoginModalProps {
    open: boolean;
}

export function LoginModal({ open }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="login-modal">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* Switcher between register and login */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Log in" />
                        <Tab label="Register" />
                    </Tabs>
                </Box>
                <Container className="form-container">
                    {value === 0 ? (
                        <>
                            <Container className="login-header">
                                <h2>Log in to your account</h2>
                            </Container>
                            <Container className="login-form">
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        label="Email/Username"
                                        fullWidth
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <TextField
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    fullWidth
                                    className="login-btn"
                                    onClick={() => console.log('Login')}
                                >
                                    Log in
                                </Button>
                            </Container>
                        </>
                    ) : (
                        <>
                            <Container className="login-header">
                                <h2>Register your account</h2>
                            </Container>
                        </>
                    )}
                </Container>
            </Box>
        </Modal>
    );
}
