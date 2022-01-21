import React from 'react';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';

const styles = {
    TextInput: {
        maxWidth: 430,
        marginBottom: isMobile ? 28 : 35,
        height: isMobile ? 35 : 40,
    },
    Button: {
        height: isMobile ? 35 : 40,
        width: '100%',
    },
};

const SignUp = () => (
    <>
        <TextInput placeholder="Имя пользователя" style={styles.TextInput} />
        <TextInput placeholder="Эл. почта" type="email" style={styles.TextInput} />
        <TextInput placeholder="Пароль" type="password" style={styles.TextInput} />
        <TextInput placeholder="Подтвердить пароль" type="password" style={{ ...styles.TextInput, marginBottom: 40 }} />
        <Button variant="contained" style={styles.Button}>Зарегистрироваться</Button>
    </>
);

export default SignUp;