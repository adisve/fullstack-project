import { Dispatch, SetStateAction } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import workoutRoutines from '../../assets/resources/workouts.json';

type Props = {
    exercise?: string[];
    setExercise?: Dispatch<SetStateAction<string[]>>;
};

export function ChooseWorkoutToggle({ exercise, setExercise }: Props) {
    return (
        <>
            <p>What are you interested in? Choose at least 1</p>
            <div className="modalContentFlexCenter">
                <ToggleButtonGroup
                    className="chooseWorkoutButtonGroup"
                    value={exercise}
                    onChange={(event, value) => {
                        setExercise?.(value);
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
