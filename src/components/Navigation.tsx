import React from 'react';
import { Stack } from '@mui/material';
import { useLocation, Link as L } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { notificationIcon, profileIcon } from '../assets';
import Button from './common/Button';
import theme from '../theme';

type NavigationProps = {
    page: string;
}

const Navigation = ({ page }: NavigationProps) => {
    const location = useLocation();
    console.log(location);

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

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: '100%', minHeight: 110 }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={12}
            >
                <Button Icon={notificationIcon} IconStyles={{ width: 25 }} />
                <Link to="/home" style={{ opacity: page === 'home' ? 1 : 0.5 }}>Главная</Link>
                <Link to="/categories" style={{ opacity: page === 'categories' ? 1 : 0.5 }}>Категории</Link>
                <Link to="/favourite" style={{ opacity: page === 'favourite' ? 1 : 0.5 }}>Избранное</Link>
            </Stack>
            <Link to="/profile"><Button Icon={profileIcon} IconStyles={{ width: 25 }} /></Link>
        </Stack>
    );
};

export default Navigation;