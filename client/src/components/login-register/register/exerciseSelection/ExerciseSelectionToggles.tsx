import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../../../store/features/login-register-modal/modalSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import workoutRoutines from '../../../../assets/resources/workouts.json';

export function ExerciseSelectionToggles() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    return (
        <>
            <div>
                <ToggleButtonGroup
                    value={modal.user?.settings?.interests}
                    onChange={(_, interests) => {
                        dispatch(updateUserSettings({ interests: interests }));
                    }}
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
                            <span>{workoutCategory}</span>
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    );
}
