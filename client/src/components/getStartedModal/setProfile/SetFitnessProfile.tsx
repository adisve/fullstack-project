import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Alert,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
    setAge,
    setFitnessLevel,
    setGender,
    setHeight,
    setWeight,
} from '../../../store/features/user/modalSlice';

export function SetFitnessProfile() {
    const dispatch: AppDispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state);

    const [ageErr, setAgeErr] = useState<boolean>(false);
    const [weightErr, setWeightErr] = useState<boolean>(false);
    const [heightErr, setHeightErr] = useState<boolean>(false);

    function errorForAge(age: string) {
        if (age === '') setAgeErr(true);
        else if (isNaN(parseInt(age))) setAgeErr(true);
        else if (parseInt(age) >= 0) setAgeErr(false);
        else setAgeErr(true);
    }

    function errorForWeight(weight: string) {
        if (weight === '') setWeightErr(true);
        else if (isNaN(parseInt(weight))) setWeightErr(true);
        else if (parseInt(weight) >= 0) setWeightErr(false);
        else setWeightErr(true);
    }

    function errorForHeight(height: string) {
        if (height === '') setHeightErr(true);
        else if (isNaN(parseInt(height))) setHeightErr(true);
        else if (parseInt(height) >= 0) setHeightErr(false);
        else setHeightErr(true);
    }
    return (
        <>
            <p>Tell us more about yourself:</p>
            <Box
                className="modalContentCenter fitnessForm"
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField
                    className="setFitnessInput"
                    label="Age"
                    value={modal.userSettings.age}
                    type="number"
                    InputProps={{
                        inputProps: {
                            type: 'number',
                            min: 0,
                            max: 150,
                        },
                    }}
                    id="outlined-start-adornment"
                    onChange={(event) => {
                        if (
                            isNaN(parseInt(event.target.value)) ||
                            parseInt(event.target.value) < 0
                        ) {
                            dispatch(setAge(''));
                        }
                        if (parseInt(event.target.value) >= 0)
                            dispatch(setAge(parseInt(event.target.value)));
                        else dispatch(setAge(''));
                        errorForAge(event.target.value);
                    }}
                />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Gender
                    </InputLabel>
                    <Select
                        className="setFitnessInput"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={modal.userSettings.gender}
                        label="Gender"
                        onChange={(event) => {
                            dispatch(setGender(event.target.value));
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Gender</em>
                        </MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'other-gender'}>Other</MenuItem>
                        <MenuItem value={'no-identify-gender'}>
                            Prefer not to say
                        </MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    className="setFitnessInput"
                    label="Weight"
                    onChange={(event) => {
                        if (
                            isNaN(parseInt(event.target.value)) ||
                            parseInt(event.target.value) < 0
                        ) {
                            dispatch(setWeight(''));
                        }
                        if (parseInt(event.target.value) >= 0)
                            dispatch(setWeight(parseInt(event.target.value)));
                        else dispatch(setWeight(''));
                        errorForWeight(event.target.value);
                    }}
                    value={modal.userSettings.weight}
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
                    className="setFitnessInput"
                    label="Height"
                    value={modal.userSettings.height}
                    onChange={(event) => {
                        if (
                            isNaN(parseInt(event.target.value)) ||
                            parseInt(event.target.value) < 0
                        ) {
                            dispatch(setHeight(''));
                        }
                        if (parseInt(event.target.value) >= 0)
                            dispatch(setHeight(parseInt(event.target.value)));
                        else dispatch(setHeight(''));
                        errorForHeight(event.target.value);
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

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Current fitness level
                    </InputLabel>
                    <Select
                        className="setFitnessInput"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={modal.userSettings.fitnessLevel}
                        label="Current fitness level"
                        onChange={(event) => {
                            dispatch(setFitnessLevel(event.target.value));
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Level</em>
                        </MenuItem>
                        <MenuItem value={'none'}>
                            None - no exercise at all
                        </MenuItem>
                        <MenuItem value={'beginner'}>Beginner</MenuItem>
                        <MenuItem value={'moderate'}>
                            Moderate - 3-4 days a week
                        </MenuItem>
                        <MenuItem value={'somewhat-expert'}>
                            Somewhat expert
                        </MenuItem>
                        <MenuItem value={'expert'}>
                            Expert (working out all the time){' '}
                        </MenuItem>
                    </Select>
                </FormControl>
                {ageErr && (
                    <Stack className="errorMessage">
                        <Alert variant="outlined" severity="info">
                            Make sure your Age is correct
                        </Alert>
                    </Stack>
                )}
                {weightErr && (
                    <Stack className="errorMessage">
                        <Alert variant="outlined" severity="info">
                            Make sure your Weight is correct
                        </Alert>
                    </Stack>
                )}
                {heightErr && (
                    <Stack className="errorMessage">
                        <Alert variant="outlined" severity="info">
                            Make sure your Height is correct{' '}
                        </Alert>
                    </Stack>
                )}
            </Box>
        </>
    );
}
