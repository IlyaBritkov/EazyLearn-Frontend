import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import isMobile from '../../utils/isMobile';
import { addIcon } from '../../assets';
import theme from '../../theme';
import Button from '../common/Button';

type Props = {
    searchTerm: string;
}

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

const GroupToAdd = (props: Props) => {
    const [array, setArray] = useState(['heylo', 'woah', 'noob', 'react', 'js', 'alloe', 'zen', 'css']);
    const [filteredArray, setFilteredArray] = useState<string[]>([]);
    useEffect(() => {
        setFilteredArray(array.filter(
            (item: any) => item.toLowerCase().includes(props.searchTerm.toLowerCase())
        ));
        console.log(props.searchTerm, filteredArray);
    }, [props.searchTerm]);
    return (
        <AnimatePresence>
            <motion.div style={{ margin: '15px 0 80px 0' }}>
                {
                    filteredArray.length > 0 ? filteredArray.map((item: any, index: number) => (
                        <motion.div
                            style={styles.ProfileDetailsDiv}
                            key={Math.random()}
                        >
                            <Typography
                                style={{
                                    maxWidth: 260, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                                }}
                            >{item}
                            </Typography>
                            <Button
                                onClick={() => console.log(`add ${index} to existing list`)}
                                Icon={addIcon}
                                IconStyles={{ width: 25 }}
                            />
                        </motion.div>
                    )) : (<div>Совпадений нет</div>)
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default GroupToAdd;