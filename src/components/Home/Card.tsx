import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography as Typo } from '@mui/material';
import {
    favouritesActiveIcon, favouritesInactiveIcon, tripleDots, dropdownCaret
} from '../../assets';
import Button from '../common/Button';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import Dropdown from '../common/Dropdown';

type CardProps = {
    index: number;
}

const styles = {
    MenuItemButton: {
        padding: '7px 14px',
        maxWidth: 175,
        justifyContent: 'flex-start',
        textAlign: 'start' as const,
    },
    Typo: {
        fontSize: isMobile ? 10 : 12,
    },
};

const Card = ({ index }: CardProps) => {
    const [isFavourite, setFavourite] = useState(false);

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

    const AbsoluteIcon = styled('div')({
        position: 'absolute',
        top: isMobile ? 7 : 12,
    });

    const Typography = styled(Typo)({
        color: theme.palette.secondary.main,
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        lineHeight: isMobile ? '12px' : '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    const handleActive = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setFavourite(!isFavourite);
    };

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    };
    return (
        <OuterDiv key={index} role="button" tabIndex={0} onClick={() => console.log(`clicked on ${index}`)} onKeyDown={() => {}}>
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
            <div style={{ userSelect: 'none', width: '100%' }}><Typography>Карточка №{index}</Typography></div>
        </OuterDiv>
    );
};

export default Card;