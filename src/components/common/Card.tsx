import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography as Typo } from '@mui/material';
import { useDispatch } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import {
    favouritesActiveIcon, favouritesInactiveIcon, tripleDots
} from '../../assets';
import Button from './Button';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import Dropdown from './Dropdown';
import { addCard, removeCard } from '../../app/userSlice.js';

type CardProps = {
    item: any;
    initialCardArray: any;
    setInitialCardArray: any;
}

const styles = {
    MenuItemButton: {
        padding: '9px 14px',
        maxWidth: 175,
        justifyContent: 'flex-start',
        textAlign: 'start' as const,
    },
    Typo: {
        fontSize: isMobile ? 10 : 12,
    },
};

const Card: React.FC<CardProps> = ({ item, initialCardArray, setInitialCardArray }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFavourite, setFavourite] = useState(item.isFavourite);
    const dispatch = useDispatch();
    const OuterDiv = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isMobile ? 160 : 190,
        minHeight: isMobile ? 80 : 100,
        maxHeight: isFlipped ? '100%' : 100,
        border: `1px solid ${theme.palette.primary.dark}`,
        color: '#fff',
        borderRadius: 12,
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
        overflow: 'hidden',
    });

    const AbsoluteIcon = styled('div')({
        position: 'absolute',
        top: isMobile ? 7 : 12,
    });

    const Typography = styled(Typo)({
        color: theme.palette.primary.dark,
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        lineHeight: isMobile ? '12px' : '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    const handleActive = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(removeCard(item.id));
        dispatch(addCard({
            id: item.id,
            title: item.title,
            description: item.description,
            level: item.level,
            isFavourite: !isFavourite,
        }));
        setFavourite(!isFavourite);
    };

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(removeCard(item.id));
        setInitialCardArray(initialCardArray.filter((card: any) => card.id !== item.id));
    };
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedFrontToBack={0.45} flipSpeedBackToFront={0.45}>
            <OuterDiv key={item.id} role="button" tabIndex={0} onClick={() => setIsFlipped(!isFlipped)} onKeyDown={() => {}}>
                <AbsoluteIcon style={{ left: isMobile ? 5 : 12 }}>
                    <Button
                        sx={{
                            width: '30px',
                        }}
                        Icon={isFavourite ? favouritesActiveIcon : favouritesInactiveIcon}
                        IconStyles={{ width: 12 }}
                        onClick={handleActive}
                    />
                </AbsoluteIcon>
                <AbsoluteIcon style={{ right: isMobile ? 5 : 12 }}>
                    <Dropdown
                        Icon={tripleDots}
                        IconStyles={{ width: 12 }}
                        IconWrapperStyles={{
                            width: '30px',
                            height: '30px',
                        }}
                    >
                        <div>
                            <Button style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Редактировать</Typo>
                            </Button>
                        </div>
                        <div>
                            <Button style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Добавить карточки</Typo>
                            </Button>
                        </div>
                        <div>
                            <Button style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Изменить уровень владения</Typo>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={handleRemove} style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Удалить</Typo>
                            </Button>
                        </div>
                    </Dropdown>
                </AbsoluteIcon>
                <div style={{ userSelect: 'none', width: '100%' }}><Typography>{item.title}</Typography></div>
            </OuterDiv>
            <OuterDiv key={item.id} role="button" tabIndex={0} onClick={() => setIsFlipped(!isFlipped)} onKeyDown={() => {}}>
                <div
                    style={{
                        userSelect: 'none', width: '100%', height: '100%',
                    }}
                ><Typography style={{ textOverflow: 'initial', wordBreak: 'break-word' }}>{item.description}</Typography>
                </div>
            </OuterDiv>
        </ReactCardFlip>
    );
};

export default Card;