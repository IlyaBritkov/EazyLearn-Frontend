import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from './Card';
import isMobile from '../../utils/isMobile';

type Props = {
    searchTerm: string;
}

const styles = {
    Wrapper: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: isMobile ? '20px' : '70px 140px',
        flexWrap: 'wrap' as const,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        marginBottom: 50,
    },
};

const CategoriesCards = React.memo((props : Props) => {
    const [testArray, setTestArray] = useState(['name', 'another', 'name', 'dog', 'cat', 'GRAU']);
    const [filteredArray, setFilteredArray] = useState<string[]>([]);
    console.log(filteredArray, props.searchTerm);
    useEffect(() => {
        setFilteredArray(testArray.filter(
            (item) => item.toLowerCase().includes(props.searchTerm.toLowerCase())
        ));
    }, [props.searchTerm]);
    return (
        <div {...props} style={styles.Wrapper}>
            {filteredArray.length > 0 ? filteredArray.map((item, index) => (
                <Card index={index} key={item} />
            )) : (<div>Пусто</div>)}
        </div>
    );
});

export default CategoriesCards;