/* eslint-disable react/no-unstable-nested-components */
import React, {
    useEffect, useState
} from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @ts-ignore
import Swipeable from 'react-swipy';
import { arrowBackIcon } from '../../assets';
import Button from '../common/Button';
import isMobile from '../../utils/isMobile';
import Card from '../common/Card';
import { usePrompt } from '../../hooks/usePrompt.js';
import { getCardsByGroupIds, getAllUniqueCards, getAllCards } from '../../app/actions';

const styles = {
    Stack: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    cardWrapper: {
        position: 'relative' as const,
        width: isMobile ? 'calc(100% + 16px)' : '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: isMobile ? 20 : '25px 60px',
    },
    flex: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    Buttons: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '-webkit-fill-available',
        margin: isMobile ? '50px 0' : '70px 200px',
        gap: '15px',
    },
    Button: {
        maxWidth: 210,
        height: 45,
        textAlign: 'center' as const,
        background: 'rgba(252, 202, 194, 0.2)',
        '&:active': {
            background: 'rgba(252, 202, 194, 1)',
        },
    },
    resultPage: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        width: '100%',
        padding: isMobile ? '50px 0' : '50px 100px',
        textAlign: 'center' as const,
        gap: 15,
    },
};
let leftArr: any = [];
let rightArr: any = [];
const Game: React.FC<any> = () => {
    const navigate = useNavigate();
    const location: any = useLocation();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [cards, setCards] = useState([] as any);
    // usePrompt('Вы уверены, что хотите выйти?', true);
    useEffect(() => {
        if (cards.length === 0) {
            console.log(leftArr, rightArr);
            leftArr = [];
            rightArr = [];
        }
    }, [cards]);
    useEffect(() => {
        console.log('current state', location.state);
        switch (location.state.name) {
        case 'all-cards':
            getAll();
            break;
        case 'unique-cards':
            getUniqueCards();
            break;
        case 'picked-groups':
            getCards(location.state.groups);
            break;
        default: break;
        }
    }, []);

    const getAll = () => {
        dispatch(getAllCards()).then((res: any) => {
            setCards([...cards, ...res.payload]);
            setLoaded(true);
        });
    };

    const getUniqueCards = () => {
        dispatch(getAllUniqueCards()).then((res: any) => {
            setCards([...cards, ...res.payload]);
            setLoaded(true);
        });
    };

    const getCards = (groups: Array<string>) => {
        dispatch(getCardsByGroupIds(groups)).then(({ payload }: any) => setCards(payload));
        setLoaded(true);
    };

    const handleSwipe = (dir: any) => {
        if (dir === 'left') {
            leftArr.push({
                id: cards[0].id,
                proficiencyLevel: cards[0].proficiencyLevel - 0.1,
            });
        } else {
            rightArr.push({
                id: cards[0].id,
                proficiencyLevel: cards[0].proficiencyLevel + 0.1,
            });
        }
    };

    const handleRemove = () => setCards(cards.slice(1, cards.length));
    return (
        <motion.div
            initial={{ y: '110vh' }}
            animate={{ y: 0, transition: { delay: 0.2 } }}
            exit={{ y: '110vh' }}
        >
            <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Stack style={{ ...styles.Stack, margin: isMobile ? '24px 0' : '35px 0' }}>
                    <Button
                        Icon={arrowBackIcon}
                        IconStyles={{ width: 40 }}
                        onClick={() => navigate(-1)}
                    />
                </Stack>
                <Stack
                    className="game-card-wrapper"
                    style={{ ...styles.cardWrapper, width: '100%', marginTop: isMobile ? 10 : 80 }}
                >
                    {(cards.length > 0 && loaded)
                        ? (
                            <Swipeable
                                limit={isMobile ? 120 : 500} // <- вот это должно быть больше
                                min={isMobile ? 100 : 250} // <- вот этого вот :]
                                buttons={({ right, left }: any) => (
                                    <Stack
                                        style={{
                                            ...styles.flex,
                                            ...styles.Buttons,
                                            marginTop: isMobile ? 10 : 80,
                                        }}
                                    >
                                        <Button
                                            onClick={left}
                                            variant="text"
                                            style={styles.Button}
                                        >
                                            <Typography>Не помню</Typography>
                                        </Button>
                                        <Button
                                            onClick={right}
                                            variant="text"
                                            style={styles.Button}
                                        >
                                            <Typography>Помню</Typography>
                                        </Button>
                                    </Stack>
                                )}
                                onSwipe={handleSwipe}
                                onAfterSwipe={handleRemove}
                            >
                                <Card
                                    isGame
                                    item={cards[0]}
                                />
                            </Swipeable>
                        )
                        : (
                            <div style={styles.resultPage}>
                                <Typography
                                    variant="h1" style={{
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        padding: '10px 20px',
                                        borderRadius: 10,
                                        color: '#fff',
                                        fontSize: 20,
                                    }}
                                >Карточек больше нет
                                </Typography>
                                <div>
                                    <Typography style={{ fontSize: 16 }}>
                                        Количество неизученных карточек:&nbsp;
                                        <strong>
                                            {leftArr.length}
                                        </strong>
                                    </Typography>
                                    <Typography style={{ fontSize: 16 }}>
                                        Количество изученных карточек:&nbsp;
                                        <strong>
                                            {rightArr.length}
                                        </strong>
                                    </Typography>
                                </div>
                            </div>
                        )}
                </Stack>

            </Stack>
        </motion.div>
    );
};

export default Game;