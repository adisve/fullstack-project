import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from '../../../../store/store';
import ChooseWorkout from './chooseWorkout/ChooseWorkout';
import SetGoal from './setGoal/SetGoal';
import UserProfile from './setProfile/UserProfile';

import './RegisterForm.css';
import { CreateAccount } from './createAccount/CreateAccount';

export function RegisterForm() {
    const { modal } = useSelector((state: RootState) => state);

    const page = () => {
        switch (modal.currentStep) {
            case 1:
                return <ChooseWorkout />;
            case 2:
                return <SetGoal />;
            case 3:
                return <UserProfile />;
            case 4:
                return <CreateAccount />;
        }
    };

    const title = () => {
        switch (modal.currentStep) {
            case 1:
                return 'Choose interests';
            case 2:
                return 'Set your goal';
            case 3:
                return 'Set up your profile';
            case 4:
                return 'Create an account';
        }
    };

    return (
        <Box className="register-form-container">
            <h2>{title()}</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh',
                }}
            >
                {page()}
            </div>
        </Box>
    );
}
