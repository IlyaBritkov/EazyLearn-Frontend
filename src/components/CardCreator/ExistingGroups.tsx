import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import isMobile from '../../utils/isMobile';
import { deleteIcon } from '../../assets';
import theme from '../../theme';
import Button from '../common/Button';

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
        padding: isMobile ? '6px 10px 6px 20px' : '6px 30px 6px 40px',
        background: 'rgba(252, 202, 194, 0.2)',
        borderRadius: 10,
        width: isMobile ? 315 : 470,
        fontSize: 14,
        margin: '10px 0',
    },
    DetailsInfo: {
        color: theme.palette.primary.main,
        fontSize: 12,
        marginRight: 35,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: isMobile ? 100 : 170,
    },
};

const ExistingGroups = () => {
    const [testArray, setTestArray] = useState([1, 2, 3, 4, 5, 6]);
    return (
        <AnimatePresence>
            {
                testArray.map((item: any, index: number) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.ProfileDetailsDiv}
                        onKeyDown={() => { }}
                        role="button"
                        tabIndex={0}
                        key={index}
                    >
                        <Typography
                            style={{
                                maxWidth: 260, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                            }}
                        >{item} Название группы123131231212313123123
                        </Typography>
                        <Button
                            onClick={() => setTestArray(
                                testArray.filter((i: any) => i !== item)
                            )}
                            Icon={deleteIcon}
                            IconStyles={{ width: 25 }}
                        />
                    </motion.div>
                ))
            }

        </AnimatePresence>
    );
};

export default ExistingGroups;