import React, { useEffect, useState } from 'react';
import './AuthenticationModal.css';
import { Modal, Box, Container, Tab, Tabs } from '@mui/material';
import { LoginForm } from './login/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../store/features/user/modalSlice';
import { RootState } from '../../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { RegisterForm } from './register/RegisterForm';

type AppDispatch = ThunkDispatch<RootState, undefined, any>;

export function AuthenticationModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = React.useState(0);

    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(isUserLoggedIn());
    }, []);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Modal style={{ height: '100vh' }} open={modal.showModal}>
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
