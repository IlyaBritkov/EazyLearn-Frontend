import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { idText } from 'typescript';
import { dropdownCaret } from '../../assets';
import Button from '../common/Button';
import isMobile from '../../utils/isMobile';
import Card from '../common/Card';

import { getCardsByGroupId } from '../../app/actions';

const styles = {
    Stack: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    cardWrapper: {
        position: 'relative' as const,
        width: isMobile ? 'calc(100% + 16px)' : '100%',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap' as const,
        gap: isMobile ? 20 : '25px 60px',
    },
    CreateButton: {
        maxWidth: isMobile ? 180 : 230,
        padding: isMobile ? '18px 20px' : '20px 24px',
        justifyContent: 'flex-start',
    },
    SaveButton: {
        height: 40,
    },
    flex: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    GroupName: {
        fontWeight: 500,
        fontSize: isMobile ? 12 : 17,
        textAlign: 'center' as const,
        marginLeft: isMobile ? 25 : 250,
    },
    BackButton: {
        height: 40,
        maxWidth: isMobile ? 130 : 260,
        textAlign: 'start' as const,
    },
};

const GroupView: React.FC<any> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const group = useSelector((state: any) => state.user.groups.find((g: any) => g.id === id));
    const [cardsInGroup, setCardsInGroup] = useState([]);
    useEffect(() => {
        dispatch(getCardsByGroupId(id)).then(({ payload }: any) => {
            setCardsInGroup(payload);
        });
    }, [group, dispatch]);
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
                        variant="text"
                        onClick={() => navigate(-1)}
                        style={styles.BackButton}
                    >
                        <img src={dropdownCaret} style={{ transform: 'rotate(180deg)', marginRight: isMobile ? 12 : 25, height: isMobile ? 15 : 20 }} alt="back-icon" />
                        <Typography
                            style={{
                                fontSize: isMobile ? 10 : 16,
                            }}
                        >Предыдущий раздел
                        </Typography>
                    </Button>
                    <Typography style={styles.GroupName}>{group.name}</Typography>
                </Stack>
                <Stack
                    style={{ ...styles.cardWrapper, width: '100%', marginTop: isMobile ? 10 : 80 }}
                >
                    {cardsInGroup.length > 0 ? cardsInGroup.map((card: any) => (
                        <Card
                            key={card.id}
                            item={card}
                            cardArray={cardsInGroup}
                        />
                    )) : 'Пусто'}
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default GroupView;