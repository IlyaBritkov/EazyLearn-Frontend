import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stack, Typography } from '@mui/material';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import { dropdownProfileCaret, profileIcon } from '../../assets';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';

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
        overflow: 'hidden',
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
    // "https://images.wallpaperscraft.ru/image/single/devushka_ushki_plashch_237177_1920x1080.jpg"
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
                    <Dropdown
                        Icon={profileImage || profileIcon}
                        IconStyles={profileImage ? styles.ProfileImage : styles.ProfileImagePlug}
                        IconWrapperStyles={styles.ProfileImageWrapper}
                    >
                        <div>
                            <Button
                                onClick={() => console.log('image add pressed')}
                                style={styles.DropdownButton} variant="text"
                            >
                                {profileImage
                                    ? <Typography>Изменить</Typography>
                                    : <Typography>Добавить</Typography>}
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => console.log('image remove pressed')}
                                style={styles.DropdownButton} variant="text"
                            >
                                <Typography>Удалить</Typography>
                            </Button>
                        </div>
                    </Dropdown>
                    <Typography
                        style={{
                            marginTop: 50,
                            maxWidth: 225,
                            textAlign: 'center',
                            wordBreak: 'break-all',
                        }}
                    >Username
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
                                LooooooooooongUsernameeeeee
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
                                ivanovin123loooong1111111111111an@gmail.com
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
                            <Typography style={styles.DetailsInfo}>*******</Typography>
                            <img src={dropdownProfileCaret} alt="dropdown-caret" />
                        </div>
                    </div>
                    <div
                        style={styles.ProfileDetailsDiv}
                        onClick={() => console.log('pressed 4 button')}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                    >
                        <Typography>Уведомления</Typography>
                        <div style={styles.flex} />
                    </div>
                    <div
                        style={styles.ProfileDetailsDiv}
                        onClick={() => console.log('pressed 5 button')}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                    >
                        <Typography>Статистика</Typography>
                        <div style={styles.flex}>
                            <Typography style={styles.DetailsInfo} />
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
                        onClick={() => console.log('logout pressed')} variant="text"
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