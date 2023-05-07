import { ChooseWorkoutToggle } from './ChooseWorkoutToggle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { incrementStep } from '../../../../store/features/login-register-modal/modalSlice';

function ChooseWorkout() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    const buttonDisabled = () => {
        if (
            modal.user?.settings?.exercises?.length === 0 ||
            modal.user?.settings?.exercises === undefined
        ) {
            return true;
        }
        return false;
    };

    return (
        <div>
            <ChooseWorkoutToggle />
            <div className="buttonGroup">
                <Button
                    disabled={buttonDisabled()}
                    className="nextButton"
                    variant="contained"
                    onClick={() => dispatch(incrementStep())}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default ChooseWorkout;
