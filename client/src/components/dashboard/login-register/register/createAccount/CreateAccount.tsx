import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../../../store/store';
import {
    decrementStep,
    registerUser,
} from '../../../../../store/features/user/modalSlice';
import { PageStatus } from '../../../../../enums/pageStatus';
type AppDispatch = ThunkDispatch<RootState, undefined, any>;

export function CreateAccount() {
    const { modal } = useSelector((state: RootState) => state);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            <Container className="login-form">
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
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
                {modal.status === PageStatus.error && (
                    <h4 style={{ color: 'red' }}>
                        Something went wrong when registering your account.
                        Please try again later.
                    </h4>
                )}
                <div className="buttonGroup">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            dispatch(decrementStep());
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            dispatch(registerUser());
                        }}
                    >
                        Register
                    </Button>
                </div>
            </Container>
        </>
    );
}
