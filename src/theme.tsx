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
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: ThemeColors.primaryDarken,
                    letterSpacing: '0.05em' as const,
                    fontWeight: 400,
                },
            },
        },
        // dropdown
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    '& > *': {
                        position: 'relative',
                        padding: '15px',
                        width: '100%',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '5%',
                            width: '90%',
                            height: 1,
                            backgroundColor: ThemeColors.primaryDarken,
                            opacity: '0.25',
                        },
                    },
                    '& > *:first-child': {
                        '&:before': {
                            display: 'none',
                        },
                    },
                },
                root: {
                    borderRadius: 10,
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
                            color: ThemeColors.secondary,
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
                            color: ThemeColors.secondary,
                        },
                    },
                    '& .MuiFilledInput-root': {
                        '&:before': {
                            borderColor: ThemeColors.primaryDarken,
                            borderWidth: '2px',
                        },
                        '&:hover:not($disabled):not($cssFocused):not($error):before': {
                            borderColor: ThemeColors.primary,
                            borderWidth: '2px',
                        },
                        '&:after': {
                            borderColor: ThemeColors.primaryDarken,
                        },
                    },
                },
            },
        },
    },
});

export default theme;
