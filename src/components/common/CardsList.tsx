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

const CardsList: React.FC<{ showFavourite?: boolean }> = React.memo((
    { showFavourite, ...props }
) => {
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
    const [favouriteArray, setFavouriteArray] = useState<any[]>([1, 2, 3, 4, 5, 6, 7]);
    const [desktopSlidesPerView, setDesktopSlidesPerView] = useState(5);
    const [mobileSlidesPerView, setMobileSlidesPerView] = useState(2);
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
        if (showFavourite) {
            if (favouriteArray.length < 5) {
                setDesktopSlidesPerView(favouriteArray.length);
                if (favouriteArray.length < 2) {
                    setMobileSlidesPerView(favouriteArray.length);
                }
            }
        } else if (initialCardArray.length < 5) {
            setDesktopSlidesPerView(initialCardArray.length);
            if (initialCardArray.length < 2) {
                setMobileSlidesPerView(initialCardArray.length);
            }
        }
        setTimeout(() => {
            e.slideNext();
            e.slidePrev();
            setPrev(true);
            setNext(true);
        }, 0);
    };
    const loadCards = () => {
        if (showFavourite && favouriteArray.length === 0) {
            return <div>Пусто</div>;
        }
        if (!showFavourite && initialCardArray.length === 0) {
            return <div>Пусто</div>;
        }
        if (showFavourite) {
            return (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={isMobile ? 45 : 60}
                    slidesPerView={isMobile ? mobileSlidesPerView : desktopSlidesPerView}
                    navigation={{
                        prevEl: prev ? prevRef.current : null,
                        nextEl: next ? nextRef.current : null,
                    }}
                    watchOverflow
                    onSwiper={handleSwiperLoad}
                    onSlideChange={handleSlideChange}
                >{initialCardArray.map((item: any, index: number) => {
                        if (favouriteArray.includes(item.id)) {
                            return (
                                <SwiperSlide>
                                    <Card item={item} index={index} key={item.id} />
                                </SwiperSlide>
                            );
                        } return null;
                    })}
                </Swiper>
            );
        }
        return (
            <Swiper
                modules={[Navigation]}
                spaceBetween={isMobile ? 45 : 60}
                slidesPerView={isMobile ? mobileSlidesPerView : desktopSlidesPerView}
                navigation={{
                    prevEl: prev ? prevRef.current : null,
                    nextEl: next ? nextRef.current : null,
                }}
                watchOverflow
                onSwiper={handleSwiperLoad}
                onSlideChange={handleSlideChange}
            >
                {
                    initialCardArray.map((item: any, index: number) => (
                        <SwiperSlide>
                            <Card item={item} index={index} key={item.id} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        );
    };
    return (
        <div {...props} style={{ display: 'flex', overflow: 'hidden' }}>
            {
                (!showFavourite && initialCardArray.length > 0) || favouriteArray.length > 0 ? (
                    <>
                        <PrevButton id="prev-button" ref={prevRef} role="button">
                            <img src={sliderArrow} style={{ transform: 'rotate(180deg)' }} alt="previous" />
                        </PrevButton>
                        <NextButton id="next-button" ref={nextRef} role="button">
                            <img src={sliderArrow} alt="next" />
                        </NextButton>
                    </>
                ) : null
            }
            {loadCards()}
        </div>
    );
});

export default CardsList;