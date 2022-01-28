import React from 'react';
import {
    Container as c, Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../theme';
import Navigation from '../Navigation';
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Favourite from '../Favourite/Favourite';
import Profile from '../Profile/Profile';
import CardCreator from '../CardCreator/CardCreator';
import GroupCreator from '../GroupCreator/GroupCreator';

type MainProps = {
    page: string;
}

const styles = {
    Stack: {
        width: '100%',
        borderRadius: '40px 40px 0 0',
        background: '#fff',
        minHeight: 'calc(100vh - 110px)',
        boxShadow: '0px -14px 24px 0 rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
    },
};

const Container = styled(c)({
    [theme.breakpoints.up('lg')]: {
        maxWidth: 1238,
    },
});

const Main = ({ page }: MainProps) => {
    const v1 = 1;
    return (
        <Stack
            direction="column"
            style={{ width: '100%', background: 'rgba(252, 202, 194, 0.3)', minHeight: '100vh' }}
        >
            <Container maxWidth="lg">
                <Navigation page={page} />
            </Container>
            <Stack
                style={styles.Stack}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction="column"
                    >
                        {page === 'home' && <Home />}
                        {page === 'categories' && <Categories />}
                        {page === 'favourite' && <Favourite />}
                        {page === 'profile' && <Profile />}
                        {page === 'create-card' && <CardCreator />}
                        {page === 'create-group' && <GroupCreator />}
                    </Stack>
                </Container>
            </Stack>
        </Stack>
    );
};

export default Main;