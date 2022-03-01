import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Group from '../common/Group';
import isMobile from '../../utils/isMobile';

const styles = {
    Wrapper: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: isMobile ? '18px' : '70px 140px',
        flexWrap: 'wrap' as const,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        marginBottom: 70,
    },
};

const CategoriesCards: React.FC<any> = ({
    initialGroupArray, setInitialGroupArray, searchTerm, ...props
}) => {
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    useEffect(() => {
        setFilteredArray(initialGroupArray.filter(
            (item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm]);
    return (
        <AnimatePresence>
            <motion.div {...props} style={styles.Wrapper}>
                {
                    filteredArray.length > 0 ? filteredArray.map((item: any) => (
                        <Group
                            page="Home"
                            group={item}
                            initialGroupArray={initialGroupArray}
                            setInitialGroupArray={setInitialGroupArray}
                            filteredArray={filteredArray}
                            setFilteredArray={setFilteredArray}
                            key={item.id}
                        />
                    )) : (<div>Пусто</div>)
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default CategoriesCards;