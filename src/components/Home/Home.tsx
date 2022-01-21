import React, { useState, Suspense, lazy } from 'react';
import { Stack, Typography } from '@mui/material';
import { createIcon } from '../../assets';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import Filter from './Filter';

const CardsList = lazy(() => import('./CardsList'));
const GroupsList = lazy(() => import('./GroupsList'));

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

    return (
        <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Stack style={isMobile ? styles.StackMobile : styles.StackDesktop}>
                <Dropdown
                    Icon={createIcon}
                    IconStyles={{ width: 30 }}
                >
                    <div><Button onClick={() => console.log('card creation pressed')} style={styles.CreateButton} variant="text"><Typography>Создать карточку</Typography></Button></div>
                    <div><Button onClick={() => console.log('group creation pressed')} style={styles.CreateButton} variant="text"><Typography>Создать группу</Typography></Button></div>
                </Dropdown>
                {isMobile && (
                    <Filter
                        sortings={groupSortings}
                        setSortings={setGroupSortings}
                    />
                )}
            </Stack>
            <Stack
                style={{ width: '100%', gap: '35px' }}
            >
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

                    <Suspense fallback={<div>Loading...</div>}>
                        <GroupsList />
                    </Suspense>
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <CardsList />
                    </Suspense>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Home;