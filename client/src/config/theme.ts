import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6370e4',
            contrastText: '#ffffff',
        },
        background: {
            default: '#ffffff',
        },
    },
    typography: {
        fontFamily: `"Montserrat", sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
});

export default theme;
