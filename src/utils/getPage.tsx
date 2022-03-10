import React from 'react';
import { Typography } from '@mui/material';
import Link from '../components/common/Link';
import theme from '../theme';

const styles = {
    Typography: {
        color: theme.palette.primary.dark,
        letterSpacing: '0.05em' as const,
        fontWeight: 500,
        textDecoration: 'none',
        fontSize: 15,
    },
};

export function getJSXPage(page: string) {
    switch (page) {
    default:
        return (
            <>
                <Link to="/home" style={{ lineHeight: '70px', opacity: page === 'home' ? 1 : 0.5 }}>Главная</Link>
                <Link to="/sets" style={{ lineHeight: '70px', opacity: page === 'categories' ? 1 : 0.5 }}>Группы</Link>
                <Link to="/favourite" style={{ lineHeight: '70px', opacity: page === 'favourite' ? 1 : 0.5 }}>Избранное</Link>
                <Link to="/learn" style={{ lineHeight: '70px', opacity: page === 'learn' ? 1 : 0.5 }}>Изучать</Link>
            </>
        );
    }
}

export function getPage(page: string) {
    switch (page) {
    case 'home':
        return <Typography style={styles.Typography}>Главная</Typography>;
    case 'categories':
        return <Typography style={styles.Typography}>Группы</Typography>;
    case 'favourite':
        return <Typography style={styles.Typography}>Избранное</Typography>;
    case 'profile':
        return <Typography style={styles.Typography}>Профиль</Typography>;
    case 'learn':
        return <Typography style={styles.Typography}>Изучать</Typography>;
    default:
        return <Typography style={styles.Typography}>Главная</Typography>;
    }
}