import { createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage.js';
import authService from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    
    const localStorageRef = useLocalStorage();

    async function onLogin(values) {
        const result = await authService.login(values);
        localStorageRef.setUser(result);
        navigate('/');
    }

    async function onRegister(values) {
        const result = await authService.register(values);
        localStorageRef.setUser(result);
        navigate('/');
    }

    async function onLogout() {
        await authService.logout(localStorageRef.user.accessToken);
        localStorageRef.removeUser();
    }
    const authContext = {
        user : localStorageRef.user,
        onLogin,
        onRegister,
        onLogout
    }

    return (<AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>)
}