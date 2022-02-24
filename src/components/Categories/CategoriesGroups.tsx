import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Group from '../common/Group';
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
    const [array, setArray] = useState([
        {
            id: 1,
            name: 'Анатомия',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        },
        {
            id: 2,
            name: 'Программирование',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }],
        },
        {
            id: 3,
            name: 'Физика',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        },
        {
            id: 4,
            name: 'Химия',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        },
        {
            id: 5,
            name: 'Астрономия',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        },
        {
            id: 6,
            name: 'Биология',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        }, {
            id: 7,
            name: 'Английский',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }],
        }, {
            id: 8,
            name: 'Французский',
            cards: [{
                id: 1,
                name: 'Первая карточка',
            }, {
                id: 2,
                name: 'Вторая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }, {
                id: 4,
                name: 'Четвертая карточка',
            }, {
                id: 3,
                name: 'Третья карточка',
            }],
        }
    ]);
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    console.log(props.searchTerm);
    useEffect(() => {
        setFilteredArray(array.filter(
            (item: any) => item.name.toLowerCase().includes(props.searchTerm.toLowerCase())
        ));
    }, [props.searchTerm]);
    return (
        <AnimatePresence>
            <motion.div {...props} style={styles.Wrapper}>
                {
                    filteredArray.length > 0 ? filteredArray.map((item: any, index: number) => (
                        <Group page="Home" group={item} index={index} key={item.id} />
                    )) : (<div>Пусто</div>)
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default CategoriesCards;