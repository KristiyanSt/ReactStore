import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../request.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    async function onLogin(values) {
        const result = await request('/users/login', values, 'post');
        setUser(result);
        navigate('/');
    }

    async function onRegister(values) {
        const result = await request('/users/register', values, 'post');
        setUser(result);
        navigate('/');
    }
    const authContext = {
        user,
        isAuthenticated: user.accessToken ? true : false,
        onLogin,
        onRegister
    }

    return (<AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>)
}