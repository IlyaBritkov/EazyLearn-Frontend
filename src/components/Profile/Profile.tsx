import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import { dropdownProfileCaret, profileIcon } from '../../assets';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';
import { logout } from '../../app/userSlice';

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
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState(useSelector((state: any) => state.user.user));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload();
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
                        onClick={() => console.log('pressed 1 button')}
                        onKeyDown={() => {}}
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
                        onClick={() => console.log('pressed 2 button')}
                        onKeyDown={() => {}}
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
                        onClick={() => console.log('pressed 3 button')}
                        onKeyDown={() => {}}
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