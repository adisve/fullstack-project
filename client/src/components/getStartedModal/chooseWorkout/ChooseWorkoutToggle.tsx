import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import workoutRoutines from '../../../assets/resources/workouts.json';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setExercise } from '../../../store/features/user/modalSlice';

export function ChooseWorkoutToggle() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <>
            <p>What are you interested in? Choose at least 1</p>
            <div className="modalContentFlexCenter">
                <ToggleButtonGroup
                    className="chooseWorkoutButtonGroup"
                    value={modal.userSettings.exercise}
                    onChange={(event, value) => {
                        dispatch(setExercise(value));
                    }}
                    aria-label="text formatting"
                >
                    {workoutRoutines.map(({ workoutCategory }) => (
                        <ToggleButton
                            key={workoutCategory}
                            className="chooseWorkoutButton"
                            value={workoutCategory}
                            aria-label="bold"
                            sx={{
                                '&.MuiToggleButtonGroup-grouped': {
                                    borderRadius: '10px !important',
                                    m: 0.5,
                                },
                            }}
                        >
                            <span className="workouts">{workoutCategory}</span>
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    );
}
