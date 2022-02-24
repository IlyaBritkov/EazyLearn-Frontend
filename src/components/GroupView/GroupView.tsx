import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { dropdownCaret } from '../../assets';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';

const styles = {
    Stack: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
    SaveButton: {
        height: 40,
    },
    flex: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    GroupName: {
        fontWeight: 500,
        fontSize: isMobile ? 13 : 17,
        textAlign: 'center' as const,
        width: '100%',
    },
    BackButton: {
        height: 40,
        maxWidth: 260,
    },
};

type Props = {

}

const GroupView: React.FC<Props> = () => {
    const navigate = useNavigate();
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
                        variant="text"
                        onClick={() => navigate(-1)}
                        style={styles.BackButton}
                    >
                        <img src={dropdownCaret} style={{ transform: 'rotate(180deg)', marginRight: 25, height: 20 }} alt="back-icon" />
                        <Typography>Предыдущий раздел</Typography>
                    </Button>
                    <Typography style={styles.GroupName}>Название группы</Typography>
                    <Button style={styles.SaveButton} variant="text"><Typography>Сохранить</Typography></Button>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ width: '100%', marginTop: isMobile ? 10 : 80 }}
                >
                    123
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ width: '100%', marginTop: isMobile ? 10 : 40 }}
                >
                    123
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default GroupView;