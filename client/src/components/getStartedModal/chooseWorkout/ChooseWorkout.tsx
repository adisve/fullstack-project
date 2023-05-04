import { ChooseWorkoutToggle } from './ChooseWorkoutToggle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
    handleUserOnboarded,
    incrementStep,
} from '../../../store/features/user/modalSlice';
import { ThunkDispatch } from 'redux-thunk';

type LocalAppDispatch = ThunkDispatch<RootState, undefined, any>;

function ChooseWorkout() {
    const dispatch: LocalAppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <div>
            <ChooseWorkoutToggle />
            <div className="buttonGroup">
                <Button
                    className="setUpLater"
                    variant="outlined"
                    onClick={() => {
                        dispatch(handleUserOnboarded());
                    }}
                >
                    Set up later
                </Button>
                <Button
                    disabled={modal.userSettings.exercise.length === 0}
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
