import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputAdornment } from '@mui/material';
import { registerUser } from '../../app/actions';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';
import { eye, eyeClosed } from '../../assets';

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { user, error, loading } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (user && !loading && !error) navigator('/home');
    }, [user, error, loading]);

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) {
            toast.error('Проверьте адрес эл. почты');
            return;
        }
        if (password.length < 7) {
            toast.error('Ваш пароль должен содержать больше 8 символов');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Вы не подтвердили пароль');
            return;
        }
        if (username.length < 3) {
            toast.error('Имя пользователя должно содержать больше 3 символов');
            return;
        }
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
                placeholder="Пароль"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                Icon={showPassword ? eye : eyeClosed}
                                IconStyles={{ opacity: 0.5 }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </InputAdornment>
                    ),
                }}
                style={styles.TextInput}
            />

            <TextInput
                placeholder="Подтвердить пароль"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                Icon={showConfirmPassword ? eye : eyeClosed}
                                IconStyles={{ opacity: 0.5 }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ ...styles.TextInput, marginBottom: 40 }}
            />
            <Button variant="contained" style={styles.Button} onClick={handleRegister} disabled={loading}>Зарегистрироваться</Button>
        </>
    );
};

export default SignUp;