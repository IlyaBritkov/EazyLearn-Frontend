import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import theme from '../../theme';

const styles = {
    input: {
        '& .MuiOutlinedInput-input': {
            padding: '10px 22px',
            [theme.breakpoints.down('sm')]: {
                width: 270,
                fontSize: '10px',
            },
            [theme.breakpoints.up('sm')]: {
                width: 430,
                fontSize: '13px',
            },
            '&::placeholder': {
                color: theme.palette.secondary.main,
            },
        },
        '& .MuiFormHelperText-root': {
            color: theme.palette.primary.dark,
            margin: '5px 0 0',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.dark,
                borderRadius: 10,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark,
            },
        },
        '& .MuiFilledInput-input': {
            background: 'white',
            padding: '10px 5px 2px',

            [theme.breakpoints.down('sm')]: {
                width: 270,
                fontSize: '10px',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
                width: 380,
                fontSize: '13px',
            },
            [theme.breakpoints.up('lg')]: {
                width: 420,
                fontSize: '13px',
            },
            '&::placeholder': {
                color: theme.palette.secondary.main,
            },
        },
        '& .MuiFilledInput-root': {
            '&:before': {
                borderColor: theme.palette.primary.dark,
                borderWidth: '2px',
            },
            '&:hover:not($disabled):not($cssFocused):not($error):before': {
                borderColor: theme.palette.primary.main,
                borderWidth: '2px',
            },
            '&:after': {
                borderColor: theme.palette.primary.dark,
            },
        },
    },
};

const TextInput = ({
    classes,
    type,
    color,
    size,
    variant,
    ...extra
}: WithStyles<typeof styles> & TextFieldProps) => (
    <TextField
        size={size ?? 'small'}
        variant={variant ?? 'outlined'}
        color={color ?? 'primary'}
        className={classes.input}
        type={type ?? 'text'}
        {...extra}
    />
);
export default withStyles(styles)(TextInput);
