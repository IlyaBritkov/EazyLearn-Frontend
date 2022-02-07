import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { arrowBackIcon, searchCardCreator } from '../../assets';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import CardLevelDropdown from './LevelDropdown';
import ExistingGroups from './ExistingGroups';
import GroupToAdd from './GroupToAdd';

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

type Props = {
    cardPage: (state: boolean) => void;
}

const CardCreator: React.FC<Props> = ({ cardPage }) => {
    const [cardLevel, setCardLevel] = useState<0 | 0.5 | 1 | null>(null);
    const [existingGroups, setExistingGroups] = useState([]);
    const [availableGroups, setAvailableGroups] = useState([
        {
            id: 1,
            name: 'Group 1',
        },
        {
            id: 2,
            name: 'Group 2',
        },
        {
            id: 3,
            name: 'Group 3',
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
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
                        onClick={() => cardPage(false)}
                    />
                    <Button style={styles.SaveButton} variant="text"><Typography>Сохранить</Typography></Button>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ width: '100%', marginTop: isMobile ? 10 : 30 }}
                >
                    <div className="input-group" style={styles.flex}>
                        <TextInput helperText="Термин" variant="filled" />
                        <TextInput helperText="Определение" variant="filled" style={{ marginTop: '30px' }} />
                    </div>
                    <div className="known-level">
                        <CardLevelDropdown level={cardLevel} setLevel={setCardLevel} />
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

export default CardCreator;