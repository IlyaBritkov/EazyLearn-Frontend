import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../app/actions';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';

const styles = {
    TextInput: {
        maxWidth: 430,
        marginBottom: isMobile ? 28 : 35,
        height: isMobile ? 35 : 40,
    },
    Button: {
        height: isMobile ? 35 : 40,
        width: '100%',
        maxWidth: 245,
        background: '#FEEFED',
        color: theme.palette.primary.dark,
    },
};

const SignUp = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { user, error, loading } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (user && !loading && !error) navigator('/home');
    }, [user, error, loading]);

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) return;
        if (password !== confirmPassword) return;

        console.log('registered', username, email, password);
        dispatch(registerUser({
            username,
            email,
            password,
        }));
    };

    return (
        <>
            <TextInput
                placeholder="Имя пользователя" style={styles.TextInput}
                value={username} onChange={(e) => setUsername(e.target.value)}
            />

            <TextInput
                placeholder="Эл. почта" type="email" style={styles.TextInput}
                value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
                placeholder="Пароль" type="password" style={styles.TextInput}
                value={password} onChange={(e) => setPassword(e.target.value)}
            />

            <TextInput
                placeholder="Подтвердить пароль" type="password" style={{ ...styles.TextInput, marginBottom: 40 }}
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" style={styles.Button} onClick={handleRegister} disabled={loading}>Зарегистрироваться</Button>
        </>
    );
};

export default SignUp;