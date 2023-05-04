import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import workoutGoals from '../../../assets/resources/workoutGoals.json';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setGoal } from '../../../store/features/user/modalSlice';

export function SetGoalDropdown() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);
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
                        value={modal.userSettings.goal}
                        onChange={(event) => {
                            dispatch(setGoal(event.target.value));
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
