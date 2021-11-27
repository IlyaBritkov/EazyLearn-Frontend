import React from 'react';
import StyledTextInput from './UI/StyledTextInput';

const App: React.FC = () => (
    <div className="App">
        <StyledTextInput
            placeholder="Логин"
            type="text"
            color="primary"
            helperText="foo bar"
            variant="filled"
        />
        <StyledTextInput placeholder="Пароль" type="password" color="primary" />
    </div>
);

export default App;
