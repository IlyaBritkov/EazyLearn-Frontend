import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoWhite } from '../assets';
import theme from '../theme';
import isMobile from '../utils/isMobile';
import { RootState } from '../app/store';
import { setUser } from '../app/userSlice.js';

const Gradient = styled('div')({
    position: !isMobile ? 'absolute' : 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: theme.palette.primary.main,
    zIndex: 10,
    overflow: 'hidden',
    '& > div': { zIndex: 9 },
    '& > .desktop': {
        position: 'absolute',
        bottom: 0,
        width: 220,
        height: '100%',
    },
    [theme.breakpoints.up('lg')]: {
        '& > .desktop': {
            width: 430,
        },
    },
    '& > .desktop:first-child': {
        left: 0,
        backgroundImage: 'linear-gradient(to left, #f50010, #e3000e, #d1000b, #bf0009, #ae0007, #a40006, #9a0005, #900003, #8b0002, #860002, #810001, #7c0000)',
    },
    '& > .desktop:last-child': {
        right: 0,
        backgroundImage: 'linear-gradient(to right, #f50010, #e3000e, #d1000b, #bf0009, #ae0007, #a40006, #9a0005, #900003, #8b0002, #860002, #810001, #7c0000)',
    },
    '& > .mobile': {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 275,
    },
    '& > .mobile:first-child': {
        top: 0,
        backgroundImage: 'linear-gradient(to top, #f50010, #e3000e, #d1000b, #bf0009, #ae0007, #a40006, #9a0005, #900003, #8b0002, #860002, #810001, #7c0000)',
    },
    '& > .mobile:last-child': {
        bottom: 0,
        backgroundImage: 'linear-gradient(to bottom, #f50010, #e3000e, #d1000b, #bf0009, #ae0007, #a40006, #9a0005, #900003, #8b0002, #860002, #810001, #7c0000)',
    },
    '& > div:nth-child(2)': {
        width: '100%',
        height: '100%',
        userSelect: 'none',
        pointerEvents: 'none',
        backgroundImage: `url(${logoWhite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 8,
    },
});

const variants = {
    loading: {},
    loadedMain: {
        opacity: 0,
        display: 'none',
        transition: {
            duration: 0.7,
            display: {
                delay: 0.7,
            },
        },
    },
    loadedFirst: {
        x: !isMobile ? '-100%' : '0',
        y: isMobile ? '-100%' : '0',
    },
    loadedLast: {
        x: !isMobile ? '100%' : '0',
        y: isMobile ? '100%' : '0',
    },
};

const Loader = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            if (user) {
                dispatch(setUser(user));
                setTimeout(() => navigate('/home'), 600);
            } else setTimeout(() => navigate('/login'), 600);
        }, 1000);
    }, []);

    return (
        <motion.div
            animate={!isLoading ? 'loadedMain' : 'loading'}
            variants={variants}
        >
            <Gradient className={isMobile ? 'mobile' : 'desktop'}>
                <motion.div
                    animate={!isLoading ? 'loadedFirst' : 'loading'}
                    variants={variants}
                    className={isMobile ? 'mobile' : 'desktop'}
                />
                <div className={isMobile ? 'mobile' : 'desktop'} />
                <motion.div
                    animate={!isLoading ? 'loadedLast' : 'loading'}
                    variants={variants}
                    className={isMobile ? 'mobile' : 'desktop'}
                />
            </Gradient>
        </motion.div>
    );
};
export default Loader;