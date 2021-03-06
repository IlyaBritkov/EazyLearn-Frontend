import React from 'react';
import { TextField as tinput, TextFieldProps } from '@mui/material';
import { styled } from '@mui/styles';
import theme from '../../theme';

const TextField = styled(tinput)({
    '& .MuiOutlinedInput-input': {
        [theme.breakpoints.down('sm')]: {
            width: 270,
            fontSize: '12px',
        },
        [theme.breakpoints.up('sm')]: {
            width: 430,
            fontSize: '14px',
        },
    },
    '& .MuiFilledInput-input': {
        [theme.breakpoints.down('sm')]: {
            width: 270,
            fontSize: '12px',
        },
        [theme.breakpoints.between('sm', 'lg')]: {
            width: 380,
            fontSize: '14px',
        },
        [theme.breakpoints.up('lg')]: {
            width: 420,
            fontSize: '14px',
        },
    },
});

const TextInput = ({
    classes,
    type,
    color,
    size,
    variant,
    ...extra
}: TextFieldProps) => (
    <TextField
        size={size ?? 'small'}
        variant={variant ?? 'outlined'}
        color={color ?? 'primary'}
        type={type ?? 'text'}
        {...extra}
    />
);
export default TextInput;
