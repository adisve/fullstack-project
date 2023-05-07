import { SetFitnessProfile } from './SetFitnessProfile';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store/store';
import {
    decrementStep,
    incrementStep,
} from '../../../../../store/features/user/modalSlice';

function UserProfile() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    const notAvailable = () => {
        const { user } = modal;
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
    };

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
                    disabled={notAvailable()}
                    variant="contained"
                    onClick={() => {
                        dispatch(incrementStep());
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default UserProfile;
