import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography as Typo } from '@mui/material';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';

const ExistingCard: React.FC<any> = ({ item, pickedCards, setPickedCards }) => {
    const [isPicked, setIsPicked] = useState(pickedCards.includes(item.id));
    useEffect(() => {
        setIsPicked(pickedCards.includes(item.id));
    }, [pickedCards]);
    const OuterDiv = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isMobile ? 160 : 190,
        height: isMobile ? 80 : 100,
        border: `1px solid ${theme.palette.primary.dark}`,
        color: '#fff',
        borderRadius: 12,
        background: isPicked ? theme.palette.primary.dark : '#fff',
        opacity: isPicked ? 0.8 : 1,
        // boxShadow: 'inset 6px 6px 36px rgba(94, 0, 0, 0.5)',
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
        color: isPicked ? '#fff' : theme.palette.primary.dark,
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        lineHeight: isMobile ? '12px' : '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });
    const handlePick = (e: any) => {
        if (pickedCards.includes(item.id)) {
            setIsPicked(false);
            setPickedCards(pickedCards.filter((g: any) => g !== item.id));
        } else {
            setIsPicked(true);
            setPickedCards([...pickedCards, item.id]);
        }
    };
    return (
        <OuterDiv key={item.id} role="button" tabIndex={0} onClick={handlePick} onKeyDown={() => {}}>
            <div style={{ userSelect: 'none', width: '100%' }}><Typography>{item.term}</Typography></div>
        </OuterDiv>
    );
};

export default ExistingCard;