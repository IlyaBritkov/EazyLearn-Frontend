import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Link from './common/Link';
import {
    notificationIcon, profileIcon, favouritesMenu, homeIcon, groupsIcon
} from '../assets';
import Button from './common/Button';
import theme from '../theme';
import isMobile from '../utils/isMobile';
import { getJSXPage, getPage } from '../utils/getPage';

type NavigationProps = {
    page: string;
}

const styles = {
    BottomNavigation: {
        position: 'fixed' as const,
        bottom: 0,
        left: 0,
        width: '100%',
        height: 60,
        background: theme.palette.secondary.main,
        zIndex: 999,
        padding: 18,
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Link: {
        padding: '17px 35px',
    },
    Img: {
        color: theme.palette.primary.dark,
        width: 18,
        height: 24,
    },
};

const Navigation = ({ page }: NavigationProps) => {
    const location = useLocation();
    console.log(location);

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ width: '100%', minHeight: isMobile ? 80 : 110 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={isMobile ? 'space-between !important' : 'flex-start'}
                    spacing={12}
                >
                    <Button Icon={notificationIcon} IconStyles={{ width: 25 }} />
                    {!isMobile && getJSXPage(page)}
                </Stack>
                {isMobile && getPage(page)}
                <Link to="/profile"><Button Icon={profileIcon} IconStyles={{ width: 25 }} /></Link>
            </Stack>
            {
                isMobile && (
                    <Stack style={styles.BottomNavigation}>
                        <Link to="/home" style={{ ...styles.Link, opacity: page === 'home' ? 1 : 0.5 }}>
                            <img style={styles.Img} src={homeIcon} alt="Главная" />
                        </Link>
                        <Link to="/categories" style={{ ...styles.Link, opacity: page === 'categories' ? 1 : 0.5 }}>
                            <img style={styles.Img} src={groupsIcon} alt="Категории" />
                        </Link>
                        <Link to="/favourite" style={{ ...styles.Link, opacity: page === 'favourite' ? 1 : 0.5 }}>
                            <img style={styles.Img} src={favouritesMenu} alt="Избранное" />
                        </Link>
                    </Stack>
                )
            }
        </>
    );
};

export default Navigation;