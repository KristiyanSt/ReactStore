import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage.js';
import authService from '../services/authService.js';
import { AlertContext } from './AlertContext.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const { showMessage } = useContext(AlertContext);
    const { isLoading, setLoading } = useContext(AlertContext);

    const [user, setUser] = useLocalStorage('auth');

    async function onLogin(values) {
        try {
            setLoading(true);
            const result = await authService.login(values);
            setUser({
                _id: result._id,
                accessToken: result.accessToken,
                email: result.email,
                username: result.username
            });
            showMessage('Successful login!');
            return navigate('/');
        } catch (err) {
            if (err.status === 403) {
                return showMessage('Invalid email or password !', 'danger');
            }
            return showMessage(err.message);
        } finally {
            setLoading(false);
        }

    }
    async function onRegister(values) {
        try {
            setLoading(true);
            const result = await authService.register(values);
            showMessage('Successful registration!');
            setUser({
                _id: result._id,
                accessToken: result.accessToken,
                email: result.email,
                username: result.username
            });
            showMessage('Successful registration!');
            return navigate('/');
        } catch (err) {
            return showMessage(err.message, 'danger')
        } finally {
            setLoading(false);
        }
    }

    async function onLogout() {
        setLoading(true);
        try {
            await authService.logout(user.accessToken);
            clearAuthFromLocalStorage();
            return showMessage('Successful logout!');
        } catch (err) {
            clearAuthFromLocalStorage();
            return showMessage(err.message, 'danger')
        } finally {
            setLoading(false);
        }
    }

    function clearAuthFromLocalStorage() {
        setUser(undefined);
    }
    const authContext = {
        user,
        onLogin,
        onRegister,
        onLogout,
        clearAuthFromLocalStorage
    }

    return (<AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>)
}