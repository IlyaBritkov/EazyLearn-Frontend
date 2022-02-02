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
        width: isMobile ? 315 : 470,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column' as const,
        borderRadius: 10,
    },
    LevelsButtons: {
        padding: '20px 30px',
        width: '100%',
        textTransform: 'none' as const,
    },
};

const Horizontal = styled('hr')({
    width: '60px',
    border: 'none',
    borderBottom: '1px solid rgba(151, 0, 4, 0.25)',
});

const ListInfo = ({ pickedGroups }: any) => {
    const v1 = 1;
    return (
        <AnimatePresence>
            <motion.div
                transition={{ duration: 0.2 }}
                style={styles.LevelsWrapper}
            >
                <Button onClick={() => { }} style={styles.LevelsButtons} variant="text">
                    <Typography>Все карточки, не входящие ни в одну группу</Typography>
                </Button>
                <Horizontal />
                <Button onClick={() => { }} style={styles.LevelsButtons} variant="text">
                    <Typography>Все карточки</Typography>
                </Button>
                <Horizontal />
                <Button disabled={pickedGroups.length === 0} onClick={() => { }} style={styles.LevelsButtons} variant="text">
                    <Typography style={{ opacity: pickedGroups.length > 0 ? 1 : 0.5 }}>
                        Выбранные группы
                    </Typography>
                </Button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ListInfo;