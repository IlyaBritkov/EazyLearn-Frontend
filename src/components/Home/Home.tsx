import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createIcon } from '../../assets';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import isMobile from '../../utils/isMobile';
import Filter from './Filter';
import CardsList from './CardsList';
import GroupsList from './GroupsList';
import GroupCreator from '../GroupCreator/GroupCreator';
import CardCreator from '../CardCreator/CardCreator';

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
};

const Home = () => {
    const [groupCreate, setCreateGroup] = useState(false);
    const [cardCreate, setCreateCard] = useState(false);
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

    if (groupCreate) return <GroupCreator groupPage={setCreateGroup} />;
    if (cardCreate) return <CardCreator cardPage={setCreateCard} />;

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
                                onClick={() => setCreateCard(true)}
                                style={styles.CreateButton}
                                variant="text"
                            >
                                <Typography>Создать карточку</Typography>
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => setCreateGroup(true)}
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
                        <GroupsList />
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
                        <CardsList />
                    </Stack>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default Home;
