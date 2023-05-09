import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container } from '@mui/material';
import { AppDispatch, RootState } from '../../../store/store';
import { CreateAccount } from './createAccount/CreateAccount';
import {
    decrementStep,
    incrementStep,
    registerUser,
} from '../../../store/features/login-register-modal/modalSlice';
import { ChooseWorkoutToggle } from './chooseWorkout/ChooseWorkoutToggle';
import { SetGoalDropdown } from './setGoal/SetGoalDropdown';
import { SetFitnessProfile } from './setProfile/SetFitnessProfile';

export function RegisterForm() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    const page = () => {
        switch (modal.currentStep) {
            case 1:
                return <ChooseWorkoutToggle />;
            case 2:
                return <SetGoalDropdown />;
            case 3:
                return <SetFitnessProfile />;
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

    const buttonDisabled = (): boolean => {
        const { user } = modal;
        switch (modal.currentStep) {
            case 1:
                return (
                    modal.user?.settings?.exercises?.length === 0 ||
                    modal.user?.settings?.exercises === undefined
                );
            case 2:
                return modal.user?.settings?.goal === undefined;
            case 3:
                return (
                    !user?.settings ||
                    !user?.settings.goal ||
                    !user?.settings.exercises ||
                    user?.settings.exercises.length === 0 ||
                    !user?.settings.fitnessLevel ||
                    !user?.settings.dob ||
                    !user?.settings.gender ||
                    !user?.settings.height ||
                    !user?.settings.weight
                );
            case 4:
                return !user?.name || !user?.email || !user?.password;
            default:
                return true;
        }
    };

    const showPreviousButton = (): boolean => {
        return modal.currentStep > 1;
    };

    return (
        <Container className="register-form-container">
            <h2>{title()}</h2>
            <div>{page()}</div>
            <div
                style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    margin: '1rem',
                }}
            >
                <Button
                    className="modal-button"
                    disabled={buttonDisabled()}
                    variant="contained"
                    onClick={() => {
                        switch (modal.currentStep) {
                            case 4:
                                dispatch(registerUser());
                                break;
                            default:
                                dispatch(incrementStep());
                        }
                    }}
                >
                    Continue
                </Button>
            </div>
            {showPreviousButton() && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        margin: '1rem',
                    }}
                >
                    <Button
                        className="modal-button"
                        variant="outlined"
                        onClick={() => dispatch(decrementStep())}
                    >
                        Previous
                    </Button>
                </div>
            )}
        </Container>
    );
}
