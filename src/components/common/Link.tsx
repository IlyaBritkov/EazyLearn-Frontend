import React from 'react';
import { Link as L } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import theme from '../../theme';

const Link = styled(L)({
    color: theme.palette.primary.dark,
    letterSpacing: '0.05em' as const,
    fontSize: '17px',
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
    },
});

export default Link;