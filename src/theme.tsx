import React from 'react';
import { createTheme } from '@mui/material/styles';
import isMobile from './utils/isMobile';

enum ThemeColors {
    primary = '#F50010',
    secondary = '#FCCAC2',
    white = '#FFFFFF',
    primaryDarken = '#6D0000',
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
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: ThemeColors.primaryDarken,
                    letterSpacing: '0.05em' as const,
                    fontWeight: 400,
                    fontSize: isMobile ? 12 : 15,
                },
            },
        },
        // input
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-input': {
                        padding: '10px 22px',
                        '&::placeholder': {
                            color: ThemeColors.primary,
                        },
                    },
                    '& .MuiFormHelperText-root': {
                        color: ThemeColors.primaryDarken,
                        margin: '5px 0 0',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: ThemeColors.primaryDarken,
                            borderRadius: 10,
                        },
                        '&:hover fieldset': {
                            borderColor: ThemeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: ThemeColors.primaryDarken,
                        },
                    },
                    '& .MuiFilledInput-input': {
                        background: ThemeColors.white,
                        padding: '10px 5px 2px',
                        '&::placeholder': {
                            color: ThemeColors.primary,
                        },
                    },
                    '& .MuiFilledInput-root': {
                        backgroundColor: ThemeColors.white,
                        '&:hover': {
                            backgroundColor: ThemeColors.white,
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderColor: ThemeColors.primaryDarken,
                        },
                        '&.Mui-focused': {
                            backgroundColor: ThemeColors.white,
                        },
                        '&:before': {
                            borderColor: ThemeColors.primary,
                            borderWidth: '2px',
                        },
                        '&:hover:not($disabled):not($cssFocused):not($error):before': {
                            borderColor: ThemeColors.primaryDarken,
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
