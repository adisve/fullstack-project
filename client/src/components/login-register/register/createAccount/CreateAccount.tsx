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
            <Container className="form-multiple">
                <div>
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
                <div>
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
                <div>
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
            </Container>
        </>
    );
}
