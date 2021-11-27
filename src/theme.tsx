import React from 'react';
import { createTheme } from '@mui/material/styles';

enum ThemeColors {
    main = '#F50010',
    secondary = '#FCCAC2',
    white = '#FFFFFF',
    bloodyRed = '#AB0013',
}

const theme = createTheme({
    palette: {
        primary: {
            main: ThemeColors.main,
            dark: ThemeColors.bloodyRed,
        },
        secondary: {
            main: ThemeColors.secondary,
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

export default theme;
