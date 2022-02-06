import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Group from './Group';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import isMobile from '../../utils/isMobile';

const GroupsList: React.FC<any> = ({ pickedGroups, setPickedGroups }) => {
    const [groupsInitialArray, setGroupsInitialArray] = useState(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    );
    console.log('picked groups', pickedGroups);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Swiper
                spaceBetween={isMobile ? 45 : 60}
                slidesPerView={isMobile ? 2 : 5}
                watchOverflow
            >
                {groupsInitialArray.map((item, index) => (
                    <SwiperSlide>
                        <Group
                            group={item}
                            pickedGroups={pickedGroups}
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