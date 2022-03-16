import React, { useEffect } from 'react';
import {
    Routes,
    Route,
    useLocation,
    Navigate
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader';
import SignForm from './components/SignForm/SignForm';
import Main from './components/Main/Main';

import { loadGroups, loadCards } from './app/actions';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state: { [key: string]: any }) => state.user.user);
    useEffect(() => {
        if (user) {
            dispatch(loadGroups());
            dispatch(loadCards());
        }
    }, [user]);
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Loader />} />
                <Route path="/login" element={<SignForm />} />
                <Route path="/game" element={user ? <Main page="game" /> : <Navigate to="/" />} />
                <Route path="/home" element={user ? <Main page="home" /> : <Navigate to="/" />} />
                <Route path="/sets" element={user ? <Main page="categories" /> : <Navigate to="/" />} />
                <Route path="/favourite" element={user ? <Main page="favourite" /> : <Navigate to="/" />} />
                <Route path="/profile" element={user ? <Main page="profile" /> : <Navigate to="/" />} />
                <Route path="/learn" element={user ? <Main page="learn" /> : <Navigate to="/" />} />
                <Route path="/create-card" element={user ? <Main page="create-card" /> : <Navigate to="/" />} />
                <Route path="/edit-card/:id" element={user ? <Main page="edit-card" /> : <Navigate to="/" />} />
                <Route path="/create-group" element={user ? <Main page="create-group" /> : <Navigate to="/" />} />
                <Route path="/group/:id" element={user ? <Main page="group-view" /> : <Navigate to="/" />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
