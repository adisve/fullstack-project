import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

type Props = {
    age?: string;
    setAge?: (newType: string) => void;
    gender?: string;
    setGender?: (newType: string) => void;
    weight?: string;
    setWeight?: (newType: string) => void;
    height?: string;
    setHeight?: (newType: string) => void;
    fitnessLevel?: string;
    setFitnessLevel?: (newType: string) => void;
};

export function SetFitnessProfile({
    age,
    setAge,
    gender,
    setGender,
    weight,
    setWeight,
    height,
    setHeight,
    fitnessLevel,
    setFitnessLevel,
}: Props) {
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
                    onChange={(event) => setAge?.(event.target.value)}
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
                        onChange={(event) => setGender?.(event.target.value)}
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
                    onChange={(event) => setWeight?.(event.target.value)}
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
                    onChange={(event) => setHeight?.(event.target.value)}
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
                        onChange={(event) =>
                            setFitnessLevel?.(event.target.value)
                        }
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
