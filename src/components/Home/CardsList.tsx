import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Card from './Card';
import { sliderArrow } from '../../assets';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import isMobile from '../../utils/isMobile';

const PrevButton = styled('div')({
    position: 'absolute',
    height: '100%',
    width: '100px',
    left: '-100px',
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
});

const NextButton = styled('div')({
    position: 'absolute',
    height: '100%',
    width: '100px',
    right: '-100px',
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
});

const CardsList: React.FC = React.memo((props) => {
    const [initialCardArray, setInitialCardArray] = useState([
        {
            id: 1,
            name: 'Кислород',
        }, {
            id: 2,
            name: 'Углерод',
        }, {
            id: 3,
            name: 'Почка',
        }, {
            id: 4,
            name: 'ООП',
        }, {
            id: 5,
            name: 'Таблица Мендлеева',
        }, {
            id: 6,
            name: 'Spring',
        }, {
            id: 7,
            name: 'Favourite',
        }, {
            id: 8,
            name: 'le fait',
        }, {
            id: 9,
            name: 'English',
        }, {
            id: 10,
            name: 'Силизёнка',
        }, {
            id: 11,
            name: 'Цинк',
        }, {
            id: 12,
            name: 'Инфузория',
        }, {
            id: 13,
            name: 'Сталь',
        }, {
            id: 14,
            name: 'Карбонат',
        }, {
            id: 15,
            name: 'Натрий',
        }, {
            id: 16,
            name: 'Большая медведица',
        },
        {
            id: 17,
            name: 'JavaScript',
        },
        {
            id: 18,
            name: 'Python',
        },
        {
            id: 19,
            name: 'React Props',
        },
        {
            id: 20,
            name: 'Семья',
        },
        {
            id: 21,
            name: 'Погода',
        }
    ]);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const handleSlideChange = (e: any) => {
        // if (e.realIndex > 0) setPrev(true);
        // else setPrev(false);
        // if (!e.isEnd) setNext(true);
        // else setNext(false);
    };

    const handleSwiperLoad = (e: any) => {
        setTimeout(() => {
            e.slideNext();
            e.slidePrev();
            setPrev(true);
            setNext(true);
        }, 0);
    };
    return (
        <div {...props} style={{ display: 'flex', overflow: 'hidden' }}>

            <PrevButton id="prev-button" ref={prevRef} role="button">
                <img src={sliderArrow} style={{ transform: 'rotate(180deg)' }} alt="previous" />
            </PrevButton>
            <NextButton id="next-button" ref={nextRef} role="button">
                <img src={sliderArrow} alt="next" />
            </NextButton>

            <Swiper
                modules={[Navigation]}
                spaceBetween={isMobile ? 45 : 60}
                slidesPerView={isMobile ? 2 : 5}
                navigation={{
                    prevEl: prev ? prevRef.current : null,
                    nextEl: next ? nextRef.current : null,
                }}
                watchOverflow
                onSwiper={handleSwiperLoad}
            >
                {initialCardArray.map((item: any, index: number) => (
                    <SwiperSlide><Card item={item} index={index} key={item.id} /></SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
});

export default CardsList;