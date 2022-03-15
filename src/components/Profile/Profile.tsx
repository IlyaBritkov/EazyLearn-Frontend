import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../common/Button';
import { dropdownProfileCaret, profileIcon } from '../../assets';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import { logout, setUser } from '../../app/userSlice';
import { updateUserById } from '../../app/actions';

const styles = {
    DropdownButton: {
        maxWidth: isMobile ? 110 : 160,
        padding: isMobile ? '8px 14px' : '15px 20px',
        justifyContent: 'flex-start',
    },
    ProfileImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(252,202,194,0.3)',
        overflow: 'hidden' as const,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileImage: {
        width: 100,
        height: 100,
        objectFit: 'cover' as const,
        borderRadius: '50%',
    },
    ProfileImagePlug: {
        width: 27,
        height: 27,
        objectfit: 'cover' as const,
    },

    flex: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ProfileDetailsDiv: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '12px 20px' : '12px 40px',
        background: 'rgba(252, 202, 194, 0.2)',
        borderRadius: 10,
        width: isMobile ? 315 : 470,
        fontSize: 14,
        cursor: 'pointer',
    },
    DetailsInfo: {
        color: theme.palette.primary.main,
        fontSize: 12,
        marginRight: 35,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: isMobile ? 100 : 170,
    },
};

const Profile = () => {
    const user = useSelector((state: any) => state.user.user);
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isError, setIsError] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload();
    };

    const handleChange = (event: { target: { name?: any; value?: any; }; }) => {
        const { name } = event.target;
        const { value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email);
        if (!validEmail || inputs.password.length < 9 || inputs.username.length < 4) {
            setIsError(true);
            return;
        }
        dispatch(updateUserById({
            userId: user.id,
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
        }));
        handleClose();
    };
    return (
        <motion.div
            initial={{ y: '110vh' }}
            animate={{ y: 0, transition: { delay: 0.2 } }}
            exit={{ y: '110vh' }}
        >
            <Stack
                direction="column"
                alignItems="center"
            >
                <Stack
                    className="profile-header"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ marginTop: isMobile ? 45 : 100 }}
                >
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 500,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Typography
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    marginBottom: 30,
                                }}
                                id="modal-modal-title" variant="h6" component="h2"
                            >
                                Редактировать профиль
                            </Typography>
                            <TextField
                                variant="standard"
                                error={isError}
                                label="Имя пользователя"
                                defaultValue={user.username || ''}
                                inputProps={{ style: { fontSize: 20 } }}
                                InputLabelProps={{ style: { fontSize: 25 } }}
                                style={{
                                    marginBottom: 20,
                                }}
                                name="username"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="standard"
                                error={isError}
                                label="Эл. почта"
                                defaultValue={user.email || ''}
                                inputProps={{ style: { fontSize: 20 } }}
                                InputLabelProps={{ style: { fontSize: 25 } }}
                                style={{
                                    marginBottom: 20,
                                }}
                                name="email"
                                onChange={handleChange}
                            />
                            <TextField
                                type="password"
                                error={isError}
                                variant="standard"
                                label="Пароль"
                                defaultValue={user.password || ''}
                                inputProps={{ style: { fontSize: 20 } }}
                                InputLabelProps={{ style: { fontSize: 25 } }}
                                style={{
                                    marginBottom: 50,
                                }}
                                name="password"
                                onChange={handleChange}
                            />
                            <Typography align="right">
                                <Button
                                    onClick={handleClose}
                                    variant="text"
                                    style={{
                                        maxWidth: 110,
                                        marginRight: 30,
                                        fontSize: '1.2rem',
                                    }}
                                >Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="text"
                                    style={{
                                        maxWidth: 150,
                                        fontSize: '1.2rem',
                                    }}
                                >Сохранить
                                </Button>
                            </Typography>
                        </Box>
                    </Modal>
                    <div style={styles.ProfileImageWrapper}><img src={profileIcon} style={styles.ProfileImagePlug} alt="profile" /></div>
                    <Typography
                        style={{
                            marginTop: 50,
                            maxWidth: 225,
                            textAlign: 'center',
                            wordBreak: 'break-all',
                        }}
                    >{user.username}
                    </Typography>
                </Stack>
                <Stack
                    className="profile-details"
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ margin: '35px 0', gap: 30 }}
                >
                    <div
                        style={styles.ProfileDetailsDiv}
                        onClick={handleOpen}
                        onKeyDown={handleOpen}
                        role="button"
                        tabIndex={0}
                    >
                        <Typography>Имя пользователя</Typography>
                        <div style={styles.flex}>
                            <Typography style={styles.DetailsInfo}>
                                {user.username}
                            </Typography>
                            <img src={dropdownProfileCaret} alt="dropdown-caret" />
                        </div>
                    </div>
                    <div
                        style={styles.ProfileDetailsDiv}
                        onClick={handleOpen}
                        onKeyDown={handleOpen}
                        role="button"
                        tabIndex={0}
                    >
                        <Typography>Эл. почта</Typography>
                        <div style={styles.flex}>
                            <Typography style={styles.DetailsInfo}>
                                {user.email}
                            </Typography>
                            <img src={dropdownProfileCaret} alt="dropdown-caret" />
                        </div>
                    </div>
                    <div
                        style={styles.ProfileDetailsDiv}
                        onClick={handleOpen}
                        onKeyDown={handleOpen}
                        role="button"
                        tabIndex={0}
                    >
                        <Typography>Пароль</Typography>
                        <div style={styles.flex}>
                            <Typography style={styles.DetailsInfo}>********</Typography>
                            <img src={dropdownProfileCaret} alt="dropdown-caret" />
                        </div>
                    </div>
                </Stack>
                <Stack
                    className="profile-logout"
                    direction="column"
                    alignItems="center"
                >
                    <Button
                        onClick={handleLogout} variant="text"
                        style={{ maxWidth: 120, height: 40 }}
                    >
                        <Typography
                            style={{
                                fontWeight: 500,
                                fontSize: 16,
                                lineHeight: '20px',
                            }}
                        >Выйти
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default Profile;