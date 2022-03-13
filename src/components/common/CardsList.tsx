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

type Props = {
    showFavourite?: boolean;
    cardArray: Array<any>;
}

const CardsList: React.FC<Props> = React.memo((
    { showFavourite, cardArray, ...props }
) => {
    const [favouriteArray, setFavouriteArray] = useState<any[]>(
        cardArray.filter((item) => item.isFavourite)
    );
    const [desktopSlidesPerView, setDesktopSlidesPerView] = useState(5);
    const [mobileSlidesPerView, setMobileSlidesPerView] = useState(2);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    const handleSwiperLoad = (e: any) => {
        if (showFavourite) {
            if (favouriteArray.length < 3) {
                setDesktopSlidesPerView(favouriteArray.length + 3);
                if (favouriteArray.length < 2) {
                    setMobileSlidesPerView(favouriteArray.length);
                }
            }
        } else if (cardArray.length < 3) {
            setDesktopSlidesPerView(cardArray.length + 3);
            if (cardArray.length < 2) {
                setMobileSlidesPerView(cardArray.length);
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
        if (!showFavourite && cardArray.length === 0) {
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
                >{cardArray.map((item: any) => {
                        if (item.isFavourite) {
                            return (
                                <SwiperSlide>
                                    <Card
                                        item={item}
                                        cardArray={cardArray}
                                        key={item.id}
                                    />
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
            >
                {
                    cardArray.map((item: any) => (
                        <SwiperSlide>
                            <Card
                                item={item}
                                cardArray={cardArray}
                                key={item.id}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        );
    };
    return (
        <div {...props} style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
            {
                (!showFavourite && cardArray.length > 0) || favouriteArray.length > 0 ? (
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