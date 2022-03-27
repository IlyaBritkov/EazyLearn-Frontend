import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import isMobile from '../../utils/isMobile';
import theme from '../../theme';
import { login } from '../../app/actions';
import { eye, eyeClosed } from '../../assets';

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

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { error, loading, user } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (user && !loading && !error) navigate('/home');
    }, [user, loading, error]);

    const handleSignIn = (e: any) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((res: any) => console.log('login response', res));
    };
    return (
        <>
            <TextInput placeholder="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} style={styles.TextInput} />
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
                style={{ ...styles.TextInput, marginBottom: 40 }}
            />
            <Button variant="contained" style={styles.Button} onClick={handleSignIn} disabled={loading}>Войти</Button>
        </>
    );
};

export default SignIn;