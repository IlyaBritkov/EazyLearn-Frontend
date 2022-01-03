import React from 'react';
import { Stack } from '@mui/material';
import TextInput from './components/common/TextInput';
import Button from './components/common/Button';
import * as Assets from './assets';
import Dropdown from './components/common/Dropdown';

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
                <Button Icon={Assets.notificationIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.createIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.deleteIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.favouritesActiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.favouritesInactiveIcon} onClick={() => console.log('only image button')} />
                <Button
                    Icon={Assets.arrowDropdownIcon} IconStyles={
                        { width: 5, height: 5 }
                    } onClick={() => console.log('only image button')}
                />
                <Button Icon={Assets.homeActiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.homeInactiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.groupsInactiveIcon} onClick={() => console.log('only image button')} />
                <Button Icon={Assets.groupsActiveIcon} onClick={() => console.log('only image button')} />
                <Button
                    Icon={Assets.searchIcon} onClick={() => console.log('only image button')}
                />
                <Button Icon={Assets.arrowBackIcon} onClick={() => console.log('only image button')} />
            </Stack>
            <Button onClick={() => console.log('only text button')}>no icon</Button>
            <Button startIcon={Assets.filterIcon} IconStartStyles={{ width: 15, height: 15 }} variant="outlined" onClick={() => console.log('button left icon')}>icon start</Button>
            <Button endIcon={Assets.profileIcon} IconEndStyles={{ border: '1px solid black', padding: 1 }} variant="outlined" onClick={() => console.log('button right icon')}>icon end</Button>
            <Dropdown Icon={Assets.filterIcon}>
                <Button variant="text">some button here</Button>
                <Button variant="text">another button here</Button>
                <div>plain text</div>
            </Dropdown>
        </Stack>
    </div>
);

export default App;
