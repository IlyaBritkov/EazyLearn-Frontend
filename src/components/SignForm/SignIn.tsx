import React from 'react';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';

const styles = {
    TextInput: {
        maxWidth: 430,
        marginBottom: isMobile ? 14 : 35,
        height: isMobile ? 35 : 40,
    },
    Button: {
        height: isMobile ? 35 : 40,
        width: '100%',
        maxWidth: 120,
        background: '#FEEFED',
        color: theme.palette.primary.dark,
    },
};

const SignIn = () => (
    <>
        <TextInput placeholder="Логин" style={styles.TextInput} />
        <TextInput placeholder="Пароль" type="password" style={{ ...styles.TextInput, marginBottom: 40 }} />
        <Button variant="contained" style={styles.Button}>Войти</Button>
    </>
);

export default SignIn;