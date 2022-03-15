import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIcon, searchIcon } from '../../assets';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import CategoriesGroups from './CategoriesGroups';

const styles = {
    Stack: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    CreateButton: {
        maxWidth: isMobile ? 180 : 230,
        padding: isMobile ? '18px 20px' : '20px 24px',
        justifyContent: 'flex-start',
    },
    TextField: {
        maxWidth: isMobile ? 215 : 270,
        marginRight: '-40px',
        marginTop: isMobile ? 15 : 12,
    },
};

const Categories = () => {
    const navigate = useNavigate();
    const groups = useSelector((state: any) => state.user.groups);
    const [initialGroupArray, setInitialGroupArray] = useState(groups);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInitialGroupArray(groups);
    }, [groups]);
    const handleSearchActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsSearchActive(!isSearchActive);
    };
    const handleSearchChange = (e: React.ChangeEvent<any>) => {
        setInputValue(e.currentTarget.value);
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
                    <Dropdown
                        Icon={createIcon}
                        IconStyles={{ width: 30 }}
                    >
                        <div>
                            <Button onClick={() => navigate('/create-card')} style={styles.CreateButton} variant="text">
                                <Typography>Создать карточку</Typography>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => navigate('/create-group')} style={styles.CreateButton} variant="text">
                                <Typography>Создать группу</Typography>
                            </Button>
                        </div>
                    </Dropdown>
                    <div>
                        {isSearchActive && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <TextInput onChange={handleSearchChange} style={styles.TextField} variant="filled" />
                            </motion.span>
                        )}
                        <Button
                            sx={{
                                zIndex: 999, background: '#fff', borderRadius: 0,
                            }}
                            onClick={handleSearchActive}
                            Icon={searchIcon} IconStyles={{ width: 25 }}
                        />
                    </div>
                </Stack>
                <Stack>
                    <Stack direction="row" justifyContent="center">
                        <CategoriesGroups
                            initialGroupArray={initialGroupArray}
                            searchTerm={inputValue}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default Categories;