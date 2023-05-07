import React, { useState } from 'react';
import './AuthenticationModal.css';
import { Modal, Box, Container, Tab, Tabs } from '@mui/material';
import { LoginForm } from './login/LoginForm';
import { RegisterForm } from './register/RegisterForm';

interface AuthenticationModalProps {
    open: boolean;
}

export function AuthenticationModal({ open }: AuthenticationModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Modal style={{ height: '100vh' }} open={open}>
            <Box className="login-modal">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* Switcher between register and login */}
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Log in" />
                        <Tab label="Register" />
                    </Tabs>
                </Box>
                <Container className="form-container">
                    {value === 0 ? (
                        <LoginForm
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    ) : (
                        <>
                            <RegisterForm />
                        </>
                    )}
                </Container>
            </Box>
        </Modal>
    );
}
