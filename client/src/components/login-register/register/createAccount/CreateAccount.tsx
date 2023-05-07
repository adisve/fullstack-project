import { Button, Container, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import {
    decrementStep,
    registerUser,
    updateUser,
} from '../../../../store/features/login-register-modal/modalSlice';
import { PageStatus } from '../../../../enums/pageStatus';

export function CreateAccount() {
    const { modal } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            <Container className="login-form">
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={modal.user?.name ? modal.user.name : ''}
                        onChange={(event) => {
                            const name = event.target.value;
                            dispatch(updateUser({ name: name }));
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={modal.user?.email ? modal.user.email : ''}
                        onChange={(event) => {
                            const email = event.target.value;
                            dispatch(updateUser({ email: email }));
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        value={modal.user?.password ? modal.user.password : ''}
                        onChange={(event) => {
                            const password = event.target.value;
                            dispatch(updateUser({ password: password }));
                        }}
                    />
                </div>
                {modal.registerStatus === PageStatus.error && (
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
