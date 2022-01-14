import React from 'react';
import { styled } from '@mui/material/styles';
import { favouritesInactiveIcon, tripleDots } from '../../assets';
import Button from '../common/Button';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';

type CardProps = {
    index: number;
}

const Card = ({ index }: CardProps) => {
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
        textDecoration: 'ellipsis',
        '-webkit-tap-highlight-color': 'transparent',
        position: 'relative',
        padding: 20,
    });

    const AbsoluteIcon = styled('div')({
        position: 'absolute',
        top: isMobile ? 7 : 12,
    });
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        console.dir(e.currentTarget);
    };
    return (
        <OuterDiv key={index} role="button" tabIndex={0} onClick={() => console.log(`clicked on ${index}`)} onKeyDown={() => {}}>
            <AbsoluteIcon style={{ left: isMobile ? 5 : 12 }}>
                <Button
                    sx={{
                        width: '30px',
                    }}
                    Icon={favouritesInactiveIcon}
                    IconStyles={{ width: 12 }}
                    onClick={handleClick}
                />
            </AbsoluteIcon>
            <AbsoluteIcon style={{ right: isMobile ? 5 : 12 }}>
                <Button
                    sx={{
                        width: '30px',
                        height: '30px',
                    }}
                    Icon={tripleDots}
                    IconStyles={{ width: 12 }}
                />
            </AbsoluteIcon>
            <div style={{ userSelect: 'none' }}>Карточка №{index}</div>
        </OuterDiv>
    );
};

export default Card;