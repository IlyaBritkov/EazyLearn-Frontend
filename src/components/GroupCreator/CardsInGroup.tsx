import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Typography } from '@mui/material';
import ExistingCard from './ExistingCard';
import { sliderArrow } from '../../assets';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';

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

const CreateNewCard = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: isMobile ? 160 : 190,
    height: isMobile ? 80 : 100,
    color: theme.palette.primary.main,
    background: '#fff',
    borderRadius: 10,
    border: '1px solid #970004',
    transition: '0.2s',
    '&:hover': {
        cursor: 'pointer',
        background: 'rgba(252, 202, 194, 0.2)',
    },
});

const styles = {
    Slide: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 35,
    },

};

const CardsInGroup: React.FC = React.memo((props) => {
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [testArray, setTestArray] = useState([
        { type: 'create' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' },
        { type: 'card' }]);
    const handleCreateNewCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('create new card', e);
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
        <div {...props} style={{ overflow: 'hidden' }}>

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
                {testArray.map((item, index) => {
                    if (testArray.length < 6) {
                        return (
                            <SwiperSlide key={index}>
                                <ExistingCard index={index} />
                            </SwiperSlide>
                        );
                    }
                    if (index % 2 === 1) return null;
                    if (item?.type === 'create') {
                        return (
                            <SwiperSlide onClick={handleCreateNewCard} style={styles.Slide} key={index} role="button" tabIndex={0} onKeyDown={() => {}}>
                                <CreateNewCard className="create-new-card">
                                    <Typography
                                        style={{
                                            fontSize: isMobile ? 10 : 12,
                                        }}
                                    >
                                        Создать карточку в категории
                                    </Typography>
                                </CreateNewCard>
                                <ExistingCard index={index} />
                            </SwiperSlide>
                        );
                    }
                    return (
                        <SwiperSlide style={styles.Slide} key={index}>
                            <ExistingCard index={index} />
                            <ExistingCard index={index + 1} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

        </div>
    );
});

export default CardsInGroup;