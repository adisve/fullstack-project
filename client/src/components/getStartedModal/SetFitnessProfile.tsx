import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

export function SetFitnessProfile() {
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [fitnessLevel, setfitnessLevel] = useState<string>('');

    const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setAge(event.target.value);
    };
    const handleGender = (event: SelectChangeEvent) => {
        setGender(event.target.value);
        console.log(gender);
    };
    const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
        console.log(weight);
    };
    const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
        console.log(height);
    };
    const handleFitnessLevel = (event: SelectChangeEvent) => {
        setfitnessLevel(event.target.value);
        console.log(fitnessLevel);
    };

    return (
        <>
            <p>Tell us more about yourself:</p>
            <Box
                className="modalContentCenter"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    className="setFitnessInput"
                    label="Age"
                    value={age}
                    type="number"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    onChange={handleAge}
                />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Gender
                    </InputLabel>
                    <Select
                        className="setFitnessInput"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleGender}
                    >
                        <MenuItem value="">Select Gender</MenuItem>
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
                    onChange={handleWeight}
                    value={weight}
                    type="number"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">kg</InputAdornment>
                        ),
                    }}
                />

                <TextField
                    className="setFitnessInput"
                    label="Height"
                    value={height}
                    onChange={handleHeight}
                    type="number"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">cm</InputAdornment>
                        ),
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
                        value={fitnessLevel}
                        label="Current fitness level"
                        onChange={handleFitnessLevel}
                    >
                        <MenuItem value="">Select Level</MenuItem>
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
            </Box>
        </>
    );
}
