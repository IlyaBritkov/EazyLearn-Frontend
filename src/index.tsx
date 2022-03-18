import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import theme from './theme';
import store from './app/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import isMobile from './utils/isMobile';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <App />
                    {/* toast container is here to override page switching */}
                    <ToastContainer
                        position={isMobile ? 'top-center' : 'bottom-right'}
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                    />
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
