import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrowBackIcon } from '../../assets';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import LevelDropdown from '../CardCreator/LevelDropdown';
import CardsInGroup from './CardsInGroup';

import { addNewGroup } from '../../app/actions';

const styles = {
    Stack: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    cardWrapper: {
        position: 'relative' as const,
        width: isMobile ? 'calc(100% + 16px)' : '100%',
    },
    CreateButton: {
        maxWidth: isMobile ? 180 : 230,
        padding: isMobile ? '18px 20px' : '20px 24px',
        justifyContent: 'flex-start',
    },
    SaveButton: {
        maxWidth: 120,
        height: 40,
    },
    flex: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    GroupCardWrapper: {
        position: 'relative' as const,
        width: isMobile ? 'calc(100% + 16px)' : '100%',
    },
};

const GroupCreator: React.FC = () => {
    const cardArray = useSelector((state: any) => state.user.cards);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [pickedCards, setPickedCards] = useState([]);
    const [title, setTitle] = useState('');
    const [groupLevel, setGroupLevel] = useState<'LOW' | 'AVERAGE' | 'HIGH' | null>('AVERAGE');

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!title) return;
        dispatch(addNewGroup({
            isFavourite: location.state === 'createFavourite',
            linkedCardsIds: pickedCards,
            linkedNewCards: [],
            name: title,
            proficiencyLevel: groupLevel,
        }));
        navigate(-1);
    };
    return (
        <motion.div
            initial={{ y: '110vh' }}
            animate={{ y: 0, transition: { delay: 0.2 } }}
            exit={{ y: '110vh' }}
        >
            <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Stack style={{ ...styles.Stack, margin: isMobile ? '24px 0' : '35px 0' }}>
                    <Button
                        Icon={arrowBackIcon}
                        IconStyles={{ width: 40 }}
                        onClick={() => navigate(-1)}
                    />
                    <Button style={styles.SaveButton} onClick={handleSave} variant="text"><Typography>Сохранить</Typography></Button>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ position: 'relative', width: '100%', marginTop: isMobile ? 10 : 30 }}
                >
                    <div className="input-group" style={{ ...styles.flex, marginBottom: 30 }}>
                        <TextInput helperText="Название" variant="filled" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="create-group-card" style={styles.GroupCardWrapper}>
                        <CardsInGroup
                            cardArray={cardArray}
                            pickedCards={pickedCards}
                            setPickedCards={setPickedCards}
                        />
                    </div>
                    <div className="known-level" style={{ margin: '30px 0 80px 0' }}>
                        <LevelDropdown row level={groupLevel} setLevel={setGroupLevel} />
                    </div>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default GroupCreator;