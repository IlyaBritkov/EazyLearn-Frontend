import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './theme';
import store from './app/store';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
