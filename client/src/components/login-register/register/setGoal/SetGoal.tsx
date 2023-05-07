import { SetGoalDropdown } from './SetGoalDropdown';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import {
    incrementStep,
    decrementStep,
} from '../../../../store/features/user/modalSlice';

function SetGoal() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <div>
            <SetGoalDropdown />
            <div className="buttonGroup">
                <Button
                    variant="outlined"
                    onClick={() => dispatch(decrementStep())}
                >
                    Previous
                </Button>
                <Button
                    disabled={modal.user?.settings?.goal === undefined}
                    variant="contained"
                    onClick={() => dispatch(incrementStep())}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default SetGoal;
