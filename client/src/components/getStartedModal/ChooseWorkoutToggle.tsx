import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import workoutRoutines from '../../assets/resources/workouts.json';

export function ChooseWorkoutToggle() {
    const [exercise, setExercise] = useState<string[]>();

    function handleExercise(
        event: React.MouseEvent<HTMLElement>,
        newExercise: string[]
    ) {
        setExercise(newExercise);
    }

    return (
        <>
            <p>What are you interested in?</p>
            <div className="modalContentFlexCenter">
                <ToggleButtonGroup
                    className="chooseWorkoutButtonGroup"
                    value={exercise}
                    onChange={handleExercise}
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
