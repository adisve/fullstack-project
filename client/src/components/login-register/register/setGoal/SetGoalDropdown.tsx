import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import workoutGoals from '../../../../assets/resources/workoutGoals.json';
import { AppDispatch, RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../../../store/features/login-register-modal/modalSlice';

export function SetGoalDropdown() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);
    return (
        <div className="form-multiple">
            <FormControl>
                <InputLabel>Goal</InputLabel>
                <Select
                    id="my-simple-select"
                    sx={{
                        '& #my-simple-select': {
                            fontSize: '0.95rem',
                        },
                    }}
                    value={
                        modal.user?.settings?.goal
                            ? modal.user?.settings.goal
                            : ''
                    }
                    onChange={(event) => {
                        const goal = event.target.value;
                        dispatch(updateUserSettings({ goal: goal }));
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
    );
}
