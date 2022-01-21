import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { createIcon, searchIcon } from '../../assets';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import CategoriesCards from './CategoriesCards';

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
        maxWidth: 270,
        marginRight: '-40px',
        marginTop: '12px',
        transition: '0.2s',
    },
};

const Categories = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleSearchActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsSearchActive(!isSearchActive);
    };
    const handleSearchChange = (e: React.ChangeEvent<any>) => {
        console.log(e.currentTarget.value);
        setInputValue(e.currentTarget.value);
    };
    return (
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
                        <Button onClick={() => console.log('card creation pressed')} style={styles.CreateButton} variant="text">
                            <Typography>Создать карточку</Typography>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => console.log('group creation pressed')} style={styles.CreateButton} variant="text">
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
                            <TextInput onChange={handleSearchChange} style={styles.TextField} variant="filled" placeholder="Поиск..." />
                        </motion.span>
                    )}
                    <Button
                        sx={{
                            zIndex: 999, background: '#fff', borderRadius: 0,
                        }}
                        onClick={handleSearchActive} Icon={searchIcon} IconStyles={{ width: 25 }}
                    />
                </div>
            </Stack>
            <Stack
                style={{ width: '100%', gap: '35px' }}
            >
                <Stack
                    direction="row"
                >
                    <CategoriesCards searchTerm={inputValue} />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Categories;