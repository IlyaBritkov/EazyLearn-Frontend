import React from 'react';
import { Tab as t, TabProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../theme';

const StyledTab = styled(t)({
    '&.MuiTab-root': {
        padding: 0,
        textTransform: 'none',
        color: theme.palette.primary.dark,
        minHeight: 28,
    },
    '&.Mui-selected': {
        color: `${theme.palette.primary.main} !important`,
    },
});

const Tab = (props: TabProps) => (
    <StyledTab {...props} />
);

export default Tab;