import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Loader from './components/Loader'; // loader is ready to use
import SignForm from './components/SignForm/SignForm'; // sign form is ready to use
import Main from './components/Main/Main';
import HandleRoutes from './components/HandleRoutes';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => setIsLoading(false), 1200));
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HandleRoutes />} />
                <Route path="/login" element={<SignForm />} />
                <Route path="/home" element={<Main page="home" />} />
                <Route path="/categories" element={<Main page="categories" />} />
                <Route path="/favourite" element={<Main page="favourite" />} />
                <Route path="/profile" element={<Main page="profile" />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </Router>
    );
};

export default App;
