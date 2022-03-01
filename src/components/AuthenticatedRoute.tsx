import React, { useEffect } from 'react';
import {
    useNavigate, Navigate, Outlet
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../app/userSlice.js';
import { RootState } from '../app/store';

const AuthenticatedRoute = ({ children }: any) => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(setUser(JSON.parse(user)));
            navigator('/home');
        }
        navigator('/login');
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthenticatedRoute;