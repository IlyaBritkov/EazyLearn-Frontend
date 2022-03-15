import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createIcon } from '../../assets';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import isMobile from '../../utils/isMobile';
import Filter from './Filter';
import CardsList from '../common/CardsList';
import GroupsList from '../common/GroupsList';
import GroupCreator from '../GroupCreator/GroupCreator';
import CardCreator from '../CardCreator/CardCreator';
import theme from '../../theme';
import { setCards, setGroups } from '../../app/userSlice';

const styles = {
    StackMobile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '24px 0',
        width: '100%',
    },
    StackDesktop: {
        margin: '35px 0',
    },
    cardWrapper: {
        position: 'relative' as const,
        width: isMobile ? 'calc(100% + 16px)' : '100%',
    },
    CreateButton: {
        maxWidth: isMobile ? 180 : 230,
        padding: isMobile ? '18px 20px' : '20px 24px',
        justifyContent: 'flex-start',
    },
    LearnLink: {
        width: 95,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        border: '1px solid #6D0000',
        color: '#6D0000',
        padding: '15px 25px',
        fontSize: 11,
        fontWeight: 400,
        textDecoration: 'none',
        transition: '0.1s',
    },
};

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cards, groups } = useSelector((state: any) => state.user);
    const [groupArray, setGroupArray] = useState(groups);
    const [cardArray, setCardArray] = useState(cards);
    const [groupSortings, setGroupSortings] = useState({
        time: {
            isSortByTime: false,
            SortByTimeAsc: true,
        },
        level: {
            isSortByLevel: false,
            SortByLevelAsc: true,
        },
    });

    const [cardsSortings, setCardsSortings] = useState({
        time: {
            isSortByTime: false,
            SortByTimeAsc: true,
        },
        level: {
            isSortByLevel: false,
            SortByLevelAsc: true,
        },
    });

    useEffect(() => {
        cards.map((card: any, index: number, array: any[]) => {
            if (cardsSortings.time.isSortByTime) {
                const newArr = [...array].sort((a: any, b: any) => {
                    const first = new Date(a.createdDateTime.slice(0, -2));
                    const last = new Date(b.createdDateTime.slice(0, -2));
                    if (cardsSortings.time.SortByTimeAsc) {
                        // @ts-ignore
                        return first - last;
                    }
                    // @ts-ignore
                    return last - first;
                });
                dispatch(setCards(newArr));
            }
            if (cardsSortings.level.isSortByLevel) {
                const newArr = [...array].sort((a: any, b: any) => {
                    if (cardsSortings.level.SortByLevelAsc) {
                        return a.proficiencyLevel - b.proficiencyLevel;
                    }
                    return b.proficiencyLevel - a.proficiencyLevel;
                });
                dispatch(setCards(newArr));
            }
            return card;
        });
    }, [cardsSortings]);

    useEffect(() => {
        groups.map((group: any, index: number, array: any[]) => {
            if (groupSortings.time.isSortByTime) {
                const newArr = [...array].sort((a: any, b: any) => {
                    const first = new Date(a.createdDateTime.slice(0, -2));
                    const last = new Date(b.createdDateTime.slice(0, -2));
                    if (groupSortings.time.SortByTimeAsc) {
                        // @ts-ignore
                        return first - last;
                    }
                    // @ts-ignore
                    return last - first;
                });
                dispatch(setGroups(newArr));
            }
            if (groupSortings.level.isSortByLevel) {
                const newArr = [...array].sort((a: any, b: any) => {
                    if (groupSortings.level.SortByLevelAsc) {
                        return a.proficiencyLevel - b.proficiencyLevel;
                    }
                    return b.proficiencyLevel - a.proficiencyLevel;
                });
                dispatch(setGroups(newArr));
            }
            return group;
        });
    }, [groupSortings]);

    useEffect(() => {
        setCardArray(cards);
    }, [cards]);

    useEffect(() => {
        setGroupArray(groups);
    }, [groups]);

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
                <Stack
                    style={isMobile ? styles.StackMobile : styles.StackDesktop}
                >
                    <Dropdown Icon={createIcon} IconStyles={{ width: 30 }}>
                        <div>
                            <Button
                                onClick={() => navigate('/create-card')}
                                style={styles.CreateButton}
                                variant="text"
                            >
                                <Typography>Создать карточку</Typography>
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => navigate('/create-group')}
                                style={styles.CreateButton}
                                variant="text"
                            >
                                <Typography>Создать группу</Typography>
                            </Button>
                        </div>
                    </Dropdown>
                    {isMobile && (
                        <Filter
                            sortings={groupSortings}
                            setSortings={setGroupSortings}
                        />
                    )}
                </Stack>
                <Stack style={{ width: '100%', gap: '35px' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography>Группы</Typography>
                        {!isMobile && (
                            <Filter
                                sortings={groupSortings}
                                setSortings={setGroupSortings}
                            />
                        )}
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        style={styles.cardWrapper}
                    >
                        <GroupsList groupArray={groupArray} />
                    </Stack>
                </Stack>
                <Stack style={{ marginTop: 80, width: '100%', gap: '35px' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography>Карточки</Typography>
                        <Filter
                            sortings={cardsSortings}
                            setSortings={setCardsSortings}
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        style={styles.cardWrapper}
                    >
                        <CardsList cardArray={cardArray} />
                    </Stack>
                </Stack>
                {isMobile && (
                    <Stack style={{ marginTop: 40 }}>
                        <Link to="/learn" className="learn-link" style={styles.LearnLink}>Изучать</Link>
                    </Stack>
                )}
            </Stack>
        </motion.div>
    );
};

export default Home;
