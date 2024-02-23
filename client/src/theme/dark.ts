import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#66bb6a',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff4081',
            main: '#f50057',
            dark: '#c51162',
            contrastText: '#fff',

        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        h1: {
            fontSize: '3rem',
        },
        h2: {
            fontSize: '2.5rem',
        },
        h3: {
            fontSize: '2rem',
        },
        h4: {
            fontSize: '1.5rem',
        },
        h5: {
            fontSize: '1.25rem',
        },
        h6: {
            fontSize: '1rem',
        },
    }
});