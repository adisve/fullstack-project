import { SetFitnessProfile } from './SetFitnessProfile';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
    decrementStep,
    handleSubmitData,
    handleUserOnboarded,
} from '../../../store/features/user/modalSlice';
import { ThunkDispatch } from 'redux-thunk';

type LocalAppDispatch = ThunkDispatch<RootState, undefined, any>;

function UserProfile() {
    const dispatch: LocalAppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <div>
            <SetFitnessProfile />
            <div className="buttonGroup">
                <Button
                    variant="outlined"
                    onClick={() => dispatch(decrementStep())}
                >
                    Previous
                </Button>
                <Button
                    disabled={
                        modal.userSettings.age === '' ||
                        modal.userSettings.gender === '' ||
                        modal.userSettings.weight === '' ||
                        modal.userSettings.height === '' ||
                        modal.userSettings.fitnessLevel === ''
                    }
                    variant="contained"
                    onClick={() => {
                        dispatch(handleSubmitData());
                        dispatch(handleUserOnboarded());
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default UserProfile;
