import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../../../store/features/login-register-modal/modalSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import workoutRoutines from '../../../../assets/resources/workouts.json';

export function ChooseWorkoutToggle() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <>
            <div className="modalContentFlexCenter">
                <ToggleButtonGroup
                    className="choose-workout-button-group"
                    value={modal.user?.settings?.exercises}
                    onChange={(_, exercises) => {
                        dispatch(updateUserSettings({ exercises: exercises }));
                    }}
                    aria-label="text formatting"
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    {workoutRoutines.map(({ workoutCategory }) => (
                        <ToggleButton
                            key={workoutCategory}
                            className="exercise-toggle"
                            value={workoutCategory}
                        >
                            <span className="workouts">{workoutCategory}</span>
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    );
}
