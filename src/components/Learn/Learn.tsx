import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import isMobile from '../../utils/isMobile';
import Button from '../common/Button';
import ListInfo from './ListInfo';
import GroupsList from '../common/GroupsList';

const styles = {
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
        maxWidth: 120,
        height: 40,
    },
    flex: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
};

const Learn: React.FC = () => {
    const [pickedGroups, setPickedGroups] = useState([]);

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPickedGroups([]);
    };
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
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: '100%', margin: isMobile ? '85px 0 50px' : '100px 0 40px' }}
                >
                    <ListInfo pickedGroups={pickedGroups} />
                </Stack>
                <Stack
                    direction="column"
                    alignItems="flex-end"
                    justifyContent="center"
                    style={{ width: '100%', margin: isMobile ? '0 0 20px' : '0 0 30px' }}
                >
                    <Button
                        onClick={handleReset} variant="text"
                        style={{ maxWidth: 120, height: 40 }}
                    >
                        <Typography>
                            Сбросить
                        </Typography>
                    </Button>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ width: '100%', marginTop: isMobile ? 10 : 30 }}
                >
                    <GroupsList
                        Learn
                        pickedGroups={pickedGroups}
                        setPickedGroups={setPickedGroups}
                    />
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default Learn;