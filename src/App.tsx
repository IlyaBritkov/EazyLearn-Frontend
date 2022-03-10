import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    Navigate
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import SignForm from './components/SignForm/SignForm';
import Main from './components/Main/Main';

const App: React.FC = () => {
    const location = useLocation();
    const user = useSelector((state: {[key: string]: any}) => state.user.user);

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Loader />} />
                <Route path="/login" element={<SignForm />} />
                <Route path="/home" element={user ? <Main page="home" /> : <Navigate to="/login" />} />
                <Route path="/sets" element={user ? <Main page="categories" /> : <Navigate to="/login" />} />
                <Route path="/favourite" element={user ? <Main page="favourite" /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <Main page="profile" /> : <Navigate to="/login" />} />
                <Route path="/learn" element={user ? <Main page="learn" /> : <Navigate to="/login" />} />
                <Route path="/create-card" element={user ? <Main page="create-card" /> : <Navigate to="/login" />} />
                <Route path="/create-group" element={user ? <Main page="create-group" /> : <Navigate to="/login" />} />
                <Route path="/group/:id" element={user ? <Main page="group-view" /> : <Navigate to="/login" />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
