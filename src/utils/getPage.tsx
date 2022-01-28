import React from 'react';
import { Typography } from '@mui/material';
import Link from '../components/common/Link';
import theme from '../theme';

const styles = {
    Typography: {
        color: theme.palette.primary.dark,
        letterSpacing: '0.05em' as const,
        fontSize: '17px',
        fontWeight: 500,
        textDecoration: 'none',
    },
};

export function getJSXPage(page: string) {
    switch (page) {
    case 'create-card':
        return (
            <Typography style={{ ...styles.Typography, fontSize: 15 }}>
                Создать карточку
            </Typography>
        );
    default:
        return (
            <>
                <Link to="/home" style={{ lineHeight: '70px', opacity: page === 'home' ? 1 : 0.5 }}>Главная</Link>
                <Link to="/categories" style={{ lineHeight: '70px', opacity: page === 'categories' ? 1 : 0.5 }}>Категории</Link>
                <Link to="/favourite" style={{ lineHeight: '70px', opacity: page === 'favourite' ? 1 : 0.5 }}>Избранное</Link>
            </>
        );
    }
}

export function getPage(page: string) {
    switch (page) {
    case 'home':
        return <Typography style={{ ...styles.Typography, fontSize: 15 }}>Главная</Typography>;
    case 'categories':
        return <Typography style={{ ...styles.Typography, fontSize: 15 }}>Категории</Typography>;
    case 'favourite':
        return <Typography style={{ ...styles.Typography, fontSize: 15 }}>Избранное</Typography>;
    case 'profile':
        return <Typography style={{ ...styles.Typography, fontSize: 15 }}>Профиль</Typography>;
    case 'create-card':
        return (
            <Typography style={{ ...styles.Typography, fontSize: 15 }}>
                Создать карточку
            </Typography>
        );
    default:
        return <Typography style={{ ...styles.Typography, fontSize: 15 }}>Главная</Typography>;
    }
}