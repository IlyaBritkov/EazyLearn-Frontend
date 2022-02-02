import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Group from './Group';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import isMobile from '../../utils/isMobile';

const GroupsList: React.FC<any> = ({ pickedGroups, setPickedGroups }) => {
    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [pickedArray, setPickedArray] = useState([...pickedGroups]);

    const handleSlideChange = (e: any) => {
        // if (e.realIndex > 0) setPrev(true);
        // else setPrev(false);
        // if (!e.isEnd) setNext(true);
        // else setNext(false);
    };

    const handleSwiperLoad = (e: any) => {

    };
    return (
        <div style={{ display: 'flex' }}>
            <Swiper
                spaceBetween={isMobile ? 45 : 60}
                slidesPerView={isMobile ? 2 : 5}
                watchOverflow
                onSwiper={handleSwiperLoad}
                onSlideChange={handleSlideChange}
            >
                {array.map((item, index) => (
                    <SwiperSlide>
                        <Group
                            picked={!!pickedGroups[index]}
                            setPickedGroups={setPickedGroups}
                            index={index}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default GroupsList;