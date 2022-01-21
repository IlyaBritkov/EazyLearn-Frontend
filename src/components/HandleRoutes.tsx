import React from 'react';
import { Link } from 'react-router-dom';

const HandleRoutes = () => {
    const v1 = 1;
    return (
        <div>
            <h1>Хендлер юзера, зареган или нет</h1>
            <Link to="/home">На главную</Link><br />
            <Link to="/login">На страницу регистрации</Link>
        </div>
    );
};

export default HandleRoutes;