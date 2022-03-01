import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Group from './Group';
import { favouritesActiveIcon, sliderArrow } from '../../assets';
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

type GroupsProps = {
    groupArray: Array<any>;
    showFavourite?: boolean;
    pickedGroups?: any[],
    setPickedGroups?: any,
    Learn?: boolean
}

const GroupsList: React.FC<GroupsProps> = React.memo((
    {
        groupArray,
        showFavourite,
        pickedGroups,
        setPickedGroups,
        Learn, ...props
    }
) => {
    const [initialGroupArray, setInitialGroupArray] = useState(groupArray);
    const [favouriteArray, setFavouriteArray] = useState<any[]>(
        groupArray.filter((item: any) => item.isFavourite)
    );
    const [desktopSlidesPerView, setDesktopSlidesPerView] = useState(5);
    const [mobileSlidesPerView, setMobileSlidesPerView] = useState(2);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const handleSwiperLoad = (e: any) => {
        if (showFavourite) {
            if (favouriteArray.length < 5) {
                setDesktopSlidesPerView(favouriteArray.length);
                if (favouriteArray.length < 2) {
                    setMobileSlidesPerView(favouriteArray.length);
                }
            }
        } else if (initialGroupArray.length < 5) {
            setDesktopSlidesPerView(initialGroupArray.length);
            if (initialGroupArray.length < 2) {
                setMobileSlidesPerView(initialGroupArray.length);
            }
        }
        setTimeout(() => {
            e.slideNext();
            e.slidePrev();
            setPrev(true);
            setNext(true);
        }, 0);
    };

    const loadGroups = () => {
        if (showFavourite && favouriteArray.length === 0) {
            return <div>Пусто</div>;
        }
        if (!showFavourite && initialGroupArray.length === 0) {
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
                >{initialGroupArray.map((item: any) => {
                        if (item.isFavourite) {
                            return (
                                <SwiperSlide>
                                    <Group
                                        page="Home"
                                        group={item}
                                        initialGroupArray={initialGroupArray}
                                        setInitialGroupArray={setInitialGroupArray}
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
                    initialGroupArray.map((item: any) => (
                        <SwiperSlide>
                            <Group
                                page="Home"
                                initialGroupArray={initialGroupArray}
                                setInitialGroupArray={setInitialGroupArray}
                                group={item} key={item.id}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        );
    };

    if (Learn) {
        return (
            <div style={{ display: 'flex', width: '100%' }}>
                <Swiper
                    spaceBetween={isMobile ? 45 : 60}
                    slidesPerView={isMobile ? 2 : 5}
                    watchOverflow
                >
                    {initialGroupArray.map((item) => (
                        <SwiperSlide>
                            <Group
                                page="Learn"
                                group={item}
                                initialGroupArray={initialGroupArray}
                                setInitialGroupArray={setInitialGroupArray}
                                pickedGroups={pickedGroups}
                                setPickedGroups={setPickedGroups}
                                key={item.id}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }

    return (
        <div {...props} style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>

            {
                (!showFavourite && initialGroupArray.length > 0) || favouriteArray.length > 0 ? (
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

            {loadGroups()}
        </div>
    );
});

export default GroupsList;