import React from 'react';
import { createTheme } from '@mui/material/styles';

enum ThemeColors {
    primary = '#F50010',
    secondary = '#FCCAC2',
    white = '#FFFFFF',
    primaryDarken = '#AB0013',
}

const theme = createTheme({
    palette: {
        primary: {
            main: ThemeColors.primary,
            dark: ThemeColors.primaryDarken,
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
