import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import {
    createIcon, filterIcon, arrowfilterIcon, checkbox, checkboxChecked
} from '../../assets';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import theme from '../../theme';
import CardsList from './CardsList';
import isMobile from '../../utils/isMobile';

const styles = {
    DropdownDiv: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'center',
    },
    DropdownArrow: {
        width: 20,
        maxHeight: 20,
    },
    DropdownArrowButton: {
        padding: '15px',
        borderRadius: '0 !important',
        marginRight: '20px',
    },
    DropdownButton: {
        width: '100% !important',
        justifyContent: 'flex-start',
        padding: '15px 50px',
        color: theme.palette.primary.dark,
        letterSpacing: 0,
        fontSize: 15,
        fontWeight: 'normal',
        gap: '15px',
    },
    StackMobile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '32px 0',
        width: '100%',
    },
    StackDesktop: {
        margin: '55px 0',
    },
};
type filter = {
    time: {
        isSortByTime: boolean,
        SortByTimeAsc: boolean,
    },
    level: {
        isSortByLevel: boolean,
        SortByLevelAsc: boolean,
    },
}
type FilterProps = {
    handleFilterChange: (sortings: filter) => void,
}

const Filter = React.memo(({
    handleFilterChange,
} : FilterProps) => {
    const [isSortByTime, setSortByTime] = useState(false);
    const [SortByTimeAsc, setSortByTimeAsc] = useState(true);

    const [isSortByLevel, setSortByLevel] = useState(false);
    const [SortByLevelAsc, setSortByLevelAsc] = useState(true);

    const sortings = {
        time: {
            isSortByTime,
            SortByTimeAsc,
        },
        level: {
            isSortByLevel,
            SortByLevelAsc,
        },
    };

    const handleTimeSorting = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSortByTime(!isSortByTime);
    };
    const handleLevelSorting = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSortByLevel(!isSortByLevel);
    };
    const handleChangeTimeType = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSortByTimeAsc(!SortByTimeAsc);
    };
    const handleChangeLevelType = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSortByLevelAsc(!SortByLevelAsc);
    };

    const handleUnMount = () => {
        console.log('unmounted');
        handleFilterChange(sortings);
    };
    return (
        <Dropdown
            Icon={filterIcon}
            IconStyles={{ width: isMobile ? 20 : 30 }}
            onUnMount={handleUnMount}
        >
            <div style={styles.DropdownDiv}>
                <Button onClick={handleTimeSorting} sx={{ ...styles.DropdownButton }} startIcon={isSortByTime ? checkboxChecked : checkbox} variant="text">Сортировать по недавности</Button>
                {
                    isSortByTime && (
                        <Button
                            Icon={arrowfilterIcon}
                            IconStyles={styles.DropdownArrow}
                            sx={{ ...styles.DropdownArrowButton, transform: !SortByTimeAsc ? 'rotate(180deg)' : '' }}
                            onClick={handleChangeTimeType}
                        />
                    )
                }
            </div>
            <div style={styles.DropdownDiv}>
                <Button onClick={handleLevelSorting} sx={{ ...styles.DropdownButton }} startIcon={isSortByLevel ? checkboxChecked : checkbox} variant="text">Сортировать по уровню владения</Button>
                {
                    isSortByLevel && (
                        <Button
                            Icon={arrowfilterIcon}
                            IconStyles={styles.DropdownArrow}
                            sx={{ ...styles.DropdownArrowButton, transform: !SortByLevelAsc ? 'rotate(180deg)' : '' }}
                            onClick={handleChangeLevelType}
                        />
                    )
                }
            </div>
        </Dropdown>
    );
});

const Home = () => {
    const handleFilterChange = (sortings: filter) => {
        console.log(sortings);
    };

    return (
        <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Stack style={isMobile ? styles.StackMobile : styles.StackDesktop}>
                <Button Icon={createIcon} IconStyles={{ width: 30 }} />
                {isMobile && (
                    <Filter
                        handleFilterChange={handleFilterChange}
                    />
                )}
            </Stack>
            <Stack
                style={{ width: '100%', gap: '40px' }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Группы</Typography>
                    {!isMobile && (
                        <Filter
                            handleFilterChange={handleFilterChange}
                        />
                    )}
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    style={{ position: 'relative', width: isMobile ? 'calc(100% + 16px)' : '100%' }}
                >

                    <CardsList />
                </Stack>
            </Stack>
            <Stack style={{ marginTop: 105 }} />
        </Stack>
    );
};

export default Home;