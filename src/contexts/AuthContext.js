import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { requestFactory } from '../request.js';
import useLocalStorage from '../hooks/useLocalStorage.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const request = requestFactory();

    const { userState,
        removeLocalStorageAuth,
        setLocalStorageAuth } = useLocalStorage();

    async function onLogin(values) {
        const result = await request.post('/users/login', values, null, 'post');
        console.log(result);
        setLocalStorageAuth(result);
        navigate('/');
    }

    async function onRegister(values) {
        const result = await request.post('/users/register', values, null, 'post');
        setLocalStorageAuth(result);
        navigate('/');
    }
    async function onLogout() {
        await request.get('/users/logout', null, userState.accessToken);
        removeLocalStorageAuth();
    }
    const authContext = {
        userState,
        onLogin,
        onRegister,
        onLogout
    }

    return (<AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>)
}