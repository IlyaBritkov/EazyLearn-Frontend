import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card from './Card';
import isMobile from '../../utils/isMobile';

type Props = {
    searchTerm: string;
}

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

const CategoriesCards = (props : Props) => {
    const [array, setArray] = useState(['heylo', 'woah', 'noob', 'react', 'js', 'alloe', 'zen', 'css']);
    const [filteredArray, setFilteredArray] = useState<string[]>([]);
    console.log(props.searchTerm);
    useEffect(() => {
        setFilteredArray(array.filter(
            (item: any) => item.toLowerCase().includes(props.searchTerm.toLowerCase())
        ));
    }, [props.searchTerm]);
    return (
        <AnimatePresence>
            <motion.div {...props} style={styles.Wrapper}>
                {
                    filteredArray.length > 0 ? filteredArray.map((item: any, index: number) => (
                        <Card index={index} key={item} />
                    )) : (<div>Пусто</div>)
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default CategoriesCards;