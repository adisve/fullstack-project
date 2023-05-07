import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store/store';
import { updateUserSettings } from '../../../../../store/features/user/modalSlice';
import {
    genders,
    fitnessLevels,
} from '../../constants/login-register-constants';

export function SetFitnessProfile() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    const value = (property: string | number | undefined): string => {
        if (property) {
            return property as string;
        }
        return '';
    };

    return (
        <Box
            className="modalContentCenter fitnessForm"
            component="form"
            noValidate
            autoComplete="off"
        >
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
                <TextField
                    label="Date of Birth"
                    type="date"
                    value={
                        modal.user?.settings?.dob
                            ? modal.user?.settings?.dob
                                  .toISOString()
                                  .split('T')[0]
                            : ''
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        const dateOfBirth = new Date(event.target.value);
                        dispatch(updateUserSettings({ dob: dateOfBirth }));
                    }}
                />
            </FormControl>

            <FormControl fullWidth style={{ marginTop: '1rem' }}>
                <InputLabel>Gender</InputLabel>
                <Select
                    className="setFitnessInput"
                    value={value(modal.user?.settings?.gender)}
                    label="Gender"
                    onChange={(event) => {
                        const gender = event.target.value;
                        dispatch(updateUserSettings({ gender: gender }));
                    }}
                >
                    {Object.keys(genders).map((key) => {
                        return (
                            <MenuItem value={key} key={key}>
                                {genders[key]}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <TextField
                style={{ marginTop: '1rem' }}
                className="setFitnessInput"
                label="Weight"
                onChange={(event) => {
                    const weightString = event.target.value;
                    if (weightString.length > 0) {
                        const weight = parseInt(weightString);
                        dispatch(updateUserSettings({ weight: weight }));
                    }
                }}
                value={value(modal.user?.settings?.weight)}
                type="number"
                id="outlined-start-adornment"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                    ),
                    inputProps: {
                        type: 'number',
                        min: 0,
                    },
                }}
            />

            <TextField
                style={{ marginTop: '1rem' }}
                className="setFitnessInput"
                label="Height"
                value={value(modal.user?.settings?.height)}
                onChange={(event) => {
                    const heightString = event.target.value;
                    if (heightString.length > 0) {
                        const height = parseInt(heightString);
                        dispatch(updateUserSettings({ height: height }));
                    }
                }}
                type="number"
                id="outlined-start-adornment"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                    ),
                    inputProps: {
                        type: 'number',
                        min: 0,
                    },
                }}
            />

            <FormControl fullWidth style={{ marginTop: '1rem' }}>
                <InputLabel>Current fitness level</InputLabel>
                <Select
                    className="setFitnessInput"
                    value={value(modal.user?.settings?.fitnessLevel)}
                    label="Current fitness level"
                    onChange={(event) => {
                        const fitnessLevel = event.target.value;
                        dispatch(
                            updateUserSettings({ fitnessLevel: fitnessLevel })
                        );
                    }}
                >
                    {Object.keys(fitnessLevels).map((key) => {
                        return (
                            <MenuItem value={key} key={key}>
                                {fitnessLevels[key]}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
