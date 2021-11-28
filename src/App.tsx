import React from 'react';
import TextInput from './components/common/TextInput';

const App: React.FC = () => (
    <div className="App">
        <TextInput placeholder="Логин" helperText="foo bar" variant="filled" />
        <TextInput placeholder="Пароль" type="password" />
    </div>
);

export default App;
