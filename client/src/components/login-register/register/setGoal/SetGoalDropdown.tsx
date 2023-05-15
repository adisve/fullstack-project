import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Container,
} from '@mui/material';
import workoutGoals from '../../../../assets/resources/workoutGoals.json';
import { AppDispatch, RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../../../../store/features/login-register-modal/modalSlice';

export function SetGoalDropdown() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);
    return (
        <Container className="form-multiple">
            <FormControl fullWidth>
                <InputLabel>Goal</InputLabel>
                <Select
                    value={
                        modal.user?.settings?.goal
                            ? modal.user?.settings.goal
                            : ''
                    }
                    onChange={(event) => {
                        const goal = event.target.value;
                        dispatch(updateUserSettings({ goal: goal }));
                    }}
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
        </Container>
    );
}
