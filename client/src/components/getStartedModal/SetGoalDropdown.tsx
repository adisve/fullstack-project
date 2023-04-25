import { useState } from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    Select,
} from '@mui/material';
import workoutGoals from '../../assets/resources/workoutGoals.json';

export function SetGoalDropdown() {
    const [goal, setGoal] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setGoal(event.target.value);
    };
    return (
        <>
            <p>What is your goal?</p>
            <div className="modalContentCenter">
                <FormControl className="goalForm">
                    <InputLabel id="demo-simple-select-autowidth-label">
                        Goal
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={goal}
                        onChange={handleChange}
                        autoWidth
                        label="Goal"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {workoutGoals.goals.map((goal) => (
                            <MenuItem key={goal} value={goal}>
                                {goal}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    );
}
