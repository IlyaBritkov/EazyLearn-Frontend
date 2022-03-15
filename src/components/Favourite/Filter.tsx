import React from 'react';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import {
    filterIcon, arrowFilterIconUp, checkbox, checkboxChecked
} from '../../assets';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';

type FilterProps = {
    sortings: {
        time: {
            isSortByTime: boolean,
            SortByTimeAsc: boolean,
        },
        level: {
            isSortByLevel: boolean,
            SortByLevelAsc: boolean,
        },
    },
    setSortings: any
}

const styles = {
    DropdownDiv: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: isMobile ? 295 : 500,
    },
    DropdownArrow: {
        width: isMobile ? 14 : 20,
        maxHeight: isMobile ? 14 : 20,
    },
    DropdownArrowButton: {
        padding: '15px',
        borderRadius: '0 !important',
        marginRight: isMobile ? '5px' : '20px',
    },
    DropdownButton: {
        width: '100% !important',
        justifyContent: 'flex-start',
        padding: isMobile ? '15px 20px' : '15px 50px',
        color: theme.palette.primary.dark,
        letterSpacing: 0,
        fontSize: isMobile ? 10 : 15,
        fontWeight: 'normal',
        gap: isMobile ? 0 : '15px',
    },
};

const Filter = ({
    sortings, setSortings,
}: FilterProps) => {
    const handleTimeSorting = (e: any) => {
        e.nativeEvent.stopImmediatePropagation();
        setSortings((prevState: any) => ({
            ...prevState,
            time: {
                ...prevState.time,
                isSortByTime: !prevState.time.isSortByTime,
            },
        }));
    };
    const handleLevelSorting = (e: any) => {
        e.stopPropagation();
        setSortings((prevState: any) => ({
            ...prevState,
            level: {
                ...prevState.level,
                isSortByLevel: !prevState.level.isSortByLevel,
            },
        }));
    };
    const handleChangeTimeType = (e: any) => {
        e.stopPropagation();
        setSortings((prevState: any) => ({
            ...prevState,
            time: {
                ...prevState.time,
                SortByTimeAsc: !prevState.time.SortByTimeAsc,
            },
        }));
    };
    const handleChangeLevelType = (e: any) => {
        e.stopPropagation();
        setSortings((prevState: any) => ({
            ...prevState,
            level: {
                ...prevState.level,
                SortByLevelAsc: !prevState.level.SortByLevelAsc,
            },
        }));
    };
    return (
        <Dropdown
            Icon={filterIcon}
            IconStyles={{ width: isMobile ? 25 : 30 }}
        >
            <div style={styles.DropdownDiv}>
                <Button
                    onClick={handleTimeSorting} sx={{ ...styles.DropdownButton }}
                    startIcon={sortings.time.isSortByTime ? checkboxChecked : checkbox}
                    IconStartStyles={{ width: isMobile ? 12 : 15 }}
                    variant="text"
                >Сортировать по недавности
                </Button>
                {
                    sortings.time.isSortByTime && (
                        <Button
                            Icon={arrowFilterIconUp}
                            IconStyles={styles.DropdownArrow}
                            className={!sortings.time.SortByTimeAsc ? 'filter-arrow-down' : 'filter-arrow-up'}
                            sx={styles.DropdownArrowButton}
                            onClick={handleChangeTimeType}
                        />
                    )
                }
            </div>
            <div style={styles.DropdownDiv}>
                <Button
                    onClick={handleLevelSorting} sx={{ ...styles.DropdownButton }}
                    startIcon={sortings.level.isSortByLevel ? checkboxChecked : checkbox}
                    IconStartStyles={{ width: isMobile ? 12 : 15 }}
                    variant="text"
                >Сортировать по уровню владения
                </Button>
                {
                    sortings.level.isSortByLevel && (
                        <Button
                            Icon={arrowFilterIconUp}
                            IconStyles={styles.DropdownArrow}
                            className={!sortings.level.SortByLevelAsc ? 'filter-arrow-down' : 'filter-arrow-up'}
                            sx={styles.DropdownArrowButton}
                            onClick={handleChangeLevelType}
                        />
                    )
                }
            </div>
        </Dropdown>
    );
};

export default Filter;