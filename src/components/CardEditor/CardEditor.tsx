import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrowBackIcon, searchCardCreator } from '../../assets';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import LevelDropdown from './LevelDropdown';
import ExistingGroups from './ExistingGroups';
import GroupToAdd from './GroupToAdd';
import { updateCardById } from '../../app/actions';
import { removeCard } from '../../app/userSlice';

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
};

const CardEditor: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const id = String(params.id);
    const cardArray = useSelector((state: any) => state.user.cards);
    const [card, setCard] = useState(cardArray.find((c: any) => c.id === id));
    const [title, setTitle] = useState(card.term);
    const [description, setDescription] = useState(card.definition);
    const [cardLevel, setCardLevel] = useState<'LOW' | 'AVERAGE' | 'HIGH' | number>(card.proficiencyLevel);
    const [existingGroups, setExistingGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [availableGroups, setAvailableGroups] = useState(
        useSelector((state: any) => state.user.groups)
    );

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(
            updateCardById({
                cardId: id,
                definition: description,
                isFavourite: location.state === 'createFavourite',
                linkedCardSetsIds: existingGroups.map((group: any) => group.id),
                proficiencyLevel: cardLevel,
                term: title,
            })
        ).then(() => navigate(-1));
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
                    <Button onClick={handleSave} style={styles.SaveButton} variant="text"><Typography>Сохранить</Typography></Button>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ width: '100%', marginTop: isMobile ? 10 : 30 }}
                >
                    <div className="input-group" style={styles.flex}>
                        <TextInput defaultValue={card.term} helperText="Термин" variant="filled" onChange={(e) => setTitle(e.target.value)} />
                        <TextInput defaultValue={card.definition} helperText="Определение" variant="filled" onChange={(e) => setDescription(e.target.value)} style={{ marginTop: '30px' }} />
                    </div>
                    <div className="known-level">
                        <LevelDropdown level={cardLevel} setLevel={setCardLevel} />
                    </div>
                    <div className="existing-groups" style={{ marginTop: isMobile ? 20 : 50 }}>
                        <ExistingGroups
                            existingGroups={existingGroups}
                            setExistingGroups={setExistingGroups}
                        />
                    </div>
                    <div className="search-groups" style={{ ...styles.flex, marginTop: isMobile ? 50 : 80 }}>
                        <TextInput
                            value={searchTerm}
                            onChange={(e: any) => setSearchTerm(e.currentTarget.value)}
                            placeholder="Поиск" variant="filled"
                            InputProps={{
                                startAdornment: (<img src={searchCardCreator} style={{ marginBottom: '-6px' }} alt="search" />),
                            }}
                        />
                        <GroupToAdd
                            searchTerm={searchTerm}
                            existingGroups={existingGroups}
                            setExistingGroups={setExistingGroups}
                            availableGroups={availableGroups}
                            setAvailableGroups={setAvailableGroups}
                        />
                    </div>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default CardEditor;