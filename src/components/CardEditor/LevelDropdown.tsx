import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { styled } from '@mui/styles';
import isMobile from '../../utils/isMobile';
import { dropdownProfileCaret } from '../../assets';
import theme from '../../theme';

const styles = {
    flex: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ProfileDetailsDiv: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '12px 20px' : '12px 40px',
        background: 'rgba(252, 202, 194, 0.2)',
        borderRadius: 10,
        width: isMobile ? 315 : 470,
        fontSize: 14,
        cursor: 'pointer',
    },
    DetailsInfo: {
        color: theme.palette.primary.main,
        fontSize: 12,
        marginRight: 35,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: isMobile ? 100 : 170,
    },
    LevelsWrapper: {
        padding: '15px 0',
        background: 'rgba(252, 202, 194, 0.2)',
        width: isMobile ? 315 : 470,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column' as const,
        borderRadius: 10,
    },
    RowLevelsWrapper: {
        display: 'flex',
        flexDirecton: 'row' as const,
        justifyContent: 'space-between',
        maxWidth: isMobile ? 315 : 470,
        background: 'rgba(252, 202, 194, 0.2)',
        fontSize: 14,
        borderRadius: 10,
        position: 'relative' as const,
    },
    LevelsButtons: {
        padding: '20px 30px',
        justifyContent: 'flex-start',
        width: '100%',
        textTransform: 'none' as const,
    },
    RowLevelsButtons: {
        padding: '40px 20px',
        justifyContent: 'center',
        width: '100%',
        textTransform: 'none' as const,
    },
    RowRelativeWrappers: {
        position: 'relative' as const,
    },
};

const Horizontal = styled('hr')({
    width: 'calc(100% - 50px)',
    border: 'none',
    borderBottom: '1px solid rgba(151, 0, 4, 0.25)',
});

const Vertical = styled('div')({
    position: 'absolute' as const,
    width: 1,
    height: 'calc(100% - 30px)',
    background: 'rgba(151, 0, 4, 0.25)',
    transform: 'translateY(-50%)',
    top: '50%',
    right: 0,
});

const getLevel = (level: 'LOW' | 'AVERAGE' | 'HIGH') => {
    switch (level) {
        case 'LOW':
            return 'Плохо знаю';
        case 'AVERAGE':
            return 'Не очень хорошо знаю';
        case 'HIGH':
            return 'Хорошо знаю';
        default:
            return 'Уровень владения';
    }
};

const LevelDropdown = ({
                           level, setLevel, row, ...props
                       }: any) => {
    const [open, setOpen] = useState(false);
    const handleLevelChange = (lvl: 'LOW' | 'AVERAGE' | 'HIGH') => {
        setLevel(lvl);
        setOpen(false);
    };
    if (row) {
        return (
            <AnimatePresence>
                <motion.div
                    style={{ ...styles.ProfileDetailsDiv, margin: '50px 0 18px 0' }}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpen(!open)}
                >
                    <Typography>{getLevel(level)}</Typography>
                    <img style={{ transition: '0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0)' }} src={dropdownProfileCaret} alt="dropdown-caret" />
                </motion.div>
                {
                    open && (
                        <motion.div
                            key="somekey"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            style={styles.RowLevelsWrapper}
                        >
                            <div style={styles.RowRelativeWrappers}>
                                <Button onClick={() => handleLevelChange('HIGH')} style={styles.RowLevelsButtons} variant="text"><Typography>Хорошо знаю</Typography></Button>
                                <Vertical />
                            </div>
                            <div style={styles.RowRelativeWrappers}>
                                <Button onClick={() => handleLevelChange('AVERAGE')} style={styles.RowLevelsButtons} variant="text"><Typography>Не очень хорошо знаю</Typography></Button>
                                <Vertical />
                            </div>
                            <div style={styles.RowRelativeWrappers}>
                                <Button onClick={() => handleLevelChange('LOW')} style={styles.RowLevelsButtons} variant="text"><Typography>Плохо знаю</Typography></Button>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        );
    }
    return (
        <AnimatePresence>
            <motion.div
                style={{ ...styles.ProfileDetailsDiv, margin: '50px 0 18px 0' }}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                onClick={() => setOpen(!open)}
            >
                <Typography>{getLevel(level)}</Typography>
                <img style={{ transition: '0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0)' }} src={dropdownProfileCaret} alt="dropdown-caret" />
            </motion.div>
            {
                open && (
                    <motion.div
                        key="somekey"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={styles.LevelsWrapper}
                    >
                        <Button onClick={() => handleLevelChange('HIGH')} style={styles.LevelsButtons} variant="text"><Typography>Хорошо знаю</Typography></Button>
                        <Horizontal />
                        <Button onClick={() => handleLevelChange('AVERAGE')} style={styles.LevelsButtons} variant="text"><Typography>Не очень хорошо знаю</Typography></Button>
                        <Horizontal />
                        <Button onClick={() => handleLevelChange('LOW')} style={styles.LevelsButtons} variant="text"><Typography>Плохо знаю</Typography></Button>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
};

export default LevelDropdown;