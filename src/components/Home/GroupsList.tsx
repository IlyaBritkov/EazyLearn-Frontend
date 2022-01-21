import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Group from './Group';
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

const GroupsList: React.FC = React.memo((props) => {
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const testArray = new Array(10).fill(Math.random());
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
                onSlideChange={handleSlideChange}
            >
                {testArray.map((item, index) => (
                    <SwiperSlide><Group index={index} key={item} /></SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
});

export default GroupsList;