import React from 'react';
import { Stack } from '@mui/material';
import TextInput from './components/common/TextInput';
import Button from './components/common/Button';
import notificationIcon from './assets/icons/notification.svg';
import filterIcon from './assets/icons/filter.svg';
import arrowBackIcon from './assets/icons/arrow_back.svg';
import createIcon from './assets/icons/create.svg';
import deleteIcon from './assets/icons/delete.svg';
import favouritesActiveIcon from './assets/icons/favourites_active.svg';
import favouritesInactiveIcon from './assets/icons/favourites_inactive.svg';
import arrowDropdownIcon from './assets/icons/arrow_dropdown.svg';
import homeActiveIcon from './assets/icons/home_active.svg';
import homeInactiveIcon from './assets/icons/home_inactive.svg';
import groupsInactiveIcon from './assets/icons/groups_inactive.svg';
import groupsActiveIcon from './assets/icons/groups_active.svg';
import profileIcon from './assets/icons/profile.svg';
import searchIcon from './assets/icons/search.svg';

const App: React.FC = () => (
    <div className="App">
        <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
        >
            <TextInput placeholder="Логин" helperText="foo bar" variant="filled" />
            <TextInput placeholder="Пароль" type="password" />
            <Stack direction="row">
                <Button Icon={notificationIcon} onClick={() => console.log('only image button')} />
                <Button Icon={createIcon} onClick={() => console.log('only image button')} />
                <Button Icon={deleteIcon} onClick={() => console.log('only image button')} />
                <Button Icon={favouritesActiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={favouritesInactiveIcon} onClick={() => console.log('only image button')} />
                <Button
                    Icon={arrowDropdownIcon} IconStyles={
                        { width: 5, height: 5 }
                    } onClick={() => console.log('only image button')}
                />
                <Button Icon={homeActiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={homeInactiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={groupsInactiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={groupsActiveIcon} onClick={() => console.log('only image button')} />
                <Button
                    Icon={searchIcon} onClick={() => console.log('only image button')}
                />
                <Button Icon={arrowBackIcon} onClick={() => console.log('only image button')} />
            </Stack>
            <Button onClick={() => console.log('only text button')}>no icon</Button>
            <Button startIcon={filterIcon} IconStartStyles={{ width: 15, height: 15 }} variant="outlined" onClick={() => console.log('button left icon')}>icon start</Button>
            <Button endIcon={profileIcon} IconEndStyles={{ border: '1px solid black', padding: 1 }} variant="outlined" onClick={() => console.log('button right icon')}>icon end</Button>
        </Stack>
    </div>
);

export default App;
