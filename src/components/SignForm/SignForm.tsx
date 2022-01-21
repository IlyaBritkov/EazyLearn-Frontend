import React, { useState } from 'react';
import {
    Container, Stack, Tabs, Link
} from '@mui/material';
import { motion } from 'framer-motion';
import theme from '../../theme';
import { logoRed } from '../../assets';
import Tab from '../common/Tab';
import SignIn from './SignIn';
import SignUp from './SignUp';
import isMobile from '../../utils/isMobile';
import TabPanel from '../common/TabPanel';

const styles = {
    Stack: {
        minHeight: '100vh',
        marginTop: isMobile ? '110px' : '0',
    },
    TabPanel: {
        marginBottom: 72,
    },
    TabPanelChildrenStyle: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Tabs: {
        minHeight: 28,
        gap: 80,
        marginBottom: 56,
    },
    Link: {
        textAlign: 'center' as const,
    },
    Img: {
        display: 'flex',
        justifyContent: 'center',
    },
};

const SignForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (e: React.SyntheticEvent, tab: number) => {
        setCurrentTab(tab);
    };
    return (
        <Container maxWidth="md">
            <Stack
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent={!isMobile ? 'center' : 'flex-start'}
                style={styles.Stack}
            >
                <div style={{ ...styles.Img, marginBottom: currentTab === 0 ? 120 : 55 }}>
                    <img src={logoRed} alt="logo" />
                </div>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Tabs
                        onChange={handleTabChange}
                        value={currentTab}
                        selectionFollowsFocus
                        style={styles.Tabs}
                    >
                        <Tab label="Sign in" />
                        <Tab label="Sign up" />
                    </Tabs>
                    <TabPanel
                        value={currentTab} index={0}
                        style={styles.TabPanel}
                        childrenStyle={styles.TabPanelChildrenStyle}
                    >
                        <SignIn />
                    </TabPanel>
                    <TabPanel
                        value={currentTab} index={1}
                        style={styles.TabPanel}
                        childrenStyle={styles.TabPanelChildrenStyle}
                    >
                        <SignUp />
                    </TabPanel>
                    <Link
                        href="/"
                        underline="always"
                        style={styles.Link}
                    >Забыли пароль?
                    </Link>
                </Stack>
            </Stack>
        </Container>
    );
};

export default SignForm;