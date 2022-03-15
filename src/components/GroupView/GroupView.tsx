import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
        justifyContent: 'space-between',
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
        fontSize: isMobile ? 15 : 17,
        textAlign: 'center' as const,
    },
    BackButton: {
        height: 40,
        maxWidth: isMobile ? 100 : 120,
        textAlign: 'start' as const,
    },
    LearnLink: {
        width: 95,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // border: '1px solid #6D0000',
        color: '#6D0000',
        padding: '15px 25px',
        fontSize: 13,
        fontWeight: 400,
        textDecoration: 'none',
        transition: '0.1s',
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
                                fontSize: isMobile ? 13 : 16,
                            }}
                        >Назад
                        </Typography>
                    </Button>
                    <Typography style={styles.GroupName}>{group.name}</Typography>
                    <Button
                        variant="text" onClick={() => navigate('/game', {
                            state: {
                                name: 'picked-groups',
                                groups: [group.id],
                            },
                        })} className="learn-link" style={styles.LearnLink}
                    >Изучать
                    </Button>
                </Stack>
                <Stack
                    style={{ ...styles.cardWrapper, width: '100%', marginTop: isMobile ? 10 : 80 }}
                >
                    {cardsInGroup.length > 0 ? cardsInGroup.map((card: any) => (
                        <Card
                            key={card.id}
                            item={card}
                        />
                    )) : 'Пусто'}
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default GroupView;