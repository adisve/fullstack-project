import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import workoutGoals from '../../assets/resources/workoutGoals.json';

type Props = {
    goal?: string;
    setGoal?: (newType: string) => void;
};

export function SetGoalDropdown({ goal, setGoal }: Props) {
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
                        onChange={(event) => {
                            setGoal?.(event.target.value);
                        }}
                        autoWidth
                        label="Goal"
                    >
                        <MenuItem value="">
                            <em>Select goal</em>
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
