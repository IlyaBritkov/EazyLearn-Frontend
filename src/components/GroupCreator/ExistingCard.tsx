import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography as Typo } from '@mui/material';
import Button from '../common/Button';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';

type CardProps = {
    index: number;
}

const ExistingCard: React.FC<CardProps> = ({ index }) => {
    const OuterDiv = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isMobile ? 160 : 190,
        height: isMobile ? 80 : 100,
        background: theme.palette.primary.main,
        color: '#fff',
        borderRadius: 12,
        boxShadow: 'inset 6px 6px 36px rgba(94, 0, 0, 0.5)',
        cursor: 'pointer',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        WebkitTapHighlightColor: 'transparent',
        position: 'relative',
        padding: 20,
    });

    const Typography = styled(Typo)({
        color: theme.palette.secondary.main,
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        lineHeight: isMobile ? '12px' : '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    return (
        <OuterDiv key={index} role="button" tabIndex={0} onClick={() => console.log(`clicked on ${index}`)} onKeyDown={() => {}}>
            <div style={{ userSelect: 'none', width: '100%' }}><Typography>Карточка №{index}</Typography></div>
        </OuterDiv>
    );
};

export default ExistingCard;