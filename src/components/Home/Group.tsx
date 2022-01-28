import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography as Typo } from '@mui/material';
import {
    favouritesActiveIcon, favouritesInactiveIcon, tripleDots, dropdownCaret
} from '../../assets';
import Button from '../common/Button';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import getNoun from '../../utils/getNoun';
import Dropdown from '../common/Dropdown';

type GroupProps = {
    index: number;
}

const styles = {
    ButtonOpen: {
        position: 'absolute' as const,
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 5,
        width: 'calc(100% - 10px)',
        maxWidth: 190,
        background: 'radial-gradient(90% 90% at 53.15% 0%, #BC000C 0%, #8C0004 100%)',
        borderRadius: '4px',
    },
    MenuItemButton: {
        padding: '9px 14px',
        maxWidth: 175,
        justifyContent: 'flex-start',
        textAlign: 'start' as const,
    },
    Typo: {
        fontSize: isMobile ? 10 : 12,
    },
    DropdownCaret: {
        width: 30,
        height: 10,
        transition: '0.2s',
        marginBottom: '-2px',
    },
};

const Group = ({ index }: GroupProps) => {
    const [isFavourite, setFavourite] = useState(false);
    const caretRef = useRef(null);
    const menuItem1 = useRef(null);
    const menuItem2 = useRef(null);

    const OuterDiv = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isMobile ? 160 : 190,
        height: isMobile ? 160 : 190,
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
        padding: 20,
    });

    const InnerDiv = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textDecoration: 'ellipsis',
        position: 'relative',
    });

    const AbsoluteItem = styled('div')({
        position: 'absolute',
        top: '-5px',
    });

    const Typography = styled(Typo)({
        color: theme.palette.secondary.main,
        fontWeight: 500,
        fontSize: isMobile ? 10 : 12,
        lineHeight: isMobile ? '12px' : '15px',
        margin: '4px 0',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    });

    const handleActive = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setFavourite(!isFavourite);
    };

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        const caret = (caretRef!.current as any);
        if (!caret.classList.contains('active')) {
            caret.style.transform = 'rotate(90deg)';
            caret.classList.add('active');
            (menuItem1.current as any).style.display = 'block';
            (menuItem2.current as any).style.display = 'block';
        } else {
            caret.style.transform = 'rotate(0)';
            caret.classList.remove('active');
            (menuItem1.current as any).style.display = 'none';
            (menuItem2.current as any).style.display = 'none';
        }
    };
    return (
        <OuterDiv key={index} role="button" tabIndex={0} onClick={() => console.log(`clicked on ${index}`)} onKeyDown={() => {}}>
            <InnerDiv>
                <AbsoluteItem style={{ left: '-5px' }}>
                    <Button
                        sx={{
                            width: '32px',
                        }}
                        Icon={isFavourite ? favouritesActiveIcon : favouritesInactiveIcon}
                        IconStyles={{ width: 18, height: 18 }}
                        onClick={handleActive}
                    />
                </AbsoluteItem>
                <AbsoluteItem style={{ right: '-5px' }}>
                    <Dropdown
                        Icon={tripleDots}
                        IconStyles={{ width: 16 }}
                        IconWrapperStyles={{
                            width: '32px',
                            height: '32px',
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
                            <Button onClick={handleMenuOpen} style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Удалить</Typo>
                                <img ref={caretRef} style={styles.DropdownCaret} src={dropdownCaret} alt="caret" />
                            </Button>
                        </div>
                        <div className="caret-menu caret-menu-no-line" ref={menuItem1} style={{ display: 'none' }}>
                            <Button style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Только группу</Typo>
                            </Button>
                        </div>
                        <div className="caret-menu" ref={menuItem2} style={{ display: 'none' }}>
                            <Button style={styles.MenuItemButton} variant="text">
                                <Typo style={styles.Typo}>Группу и карточки в ней</Typo>
                            </Button>
                        </div>
                    </Dropdown>
                </AbsoluteItem>
                <div
                    style={{
                        userSelect: 'none', marginTop: '-30px', maxHeight: 30,
                    }}
                >
                    <Typography className="group-name">
                        Название группы
                    </Typography>
                    <Typography className="card-number" style={{ fontSize: isMobile ? 8 : 10, fontWeight: 400 }}>
                        {index + getNoun(index, ' карточка', ' карточки', ' карточек')}
                    </Typography>
                </div>
                <Button style={styles.ButtonOpen}>
                    <Typography
                        style={{
                            fontSize: isMobile ? 8 : 10, fontWeight: 400,
                        }}
                    >открыть
                    </Typography>
                </Button>
            </InnerDiv>
        </OuterDiv>
    );
};

export default Group;