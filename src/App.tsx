import React from 'react';
import {
    Routes,
    Route,
    useLocation
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import SignForm from './components/SignForm/SignForm';
import Main from './components/Main/Main';
import HandleRoutes from './components/HandleRoutes';
import * as Assets from './assets';

const App: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HandleRoutes />} />
                <Route path="/login" element={<SignForm />} />
                <Route path="/home" element={<Main page="home" />} />
                <Route path="/categories" element={<Main page="categories" />} />
                <Route path="/favourite" element={<Main page="favourite" />} />
                <Route path="/profile" element={<Main page="profile" />} />
                <Route path="/learn" element={<Main page="learn" />} />
                <Route path="/group/:id" element={<Main page="group-view" />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
