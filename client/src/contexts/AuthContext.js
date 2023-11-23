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
        setLoading(true);
        try {
            const result = await authService.login(values);

            if (result.status === 403) {
                throw new Error('Invalid email or password !');
            }

            showMessage('Successful login!');
            setUser({
                _id: result._id,
                accessToken: result.accessToken,
                email: result.email,
                username: result.username
            });
            navigate('/');
        } catch (err) {
            if (err.status === 403) {
                // throw new Error('Invalid email or password !');
                showMessage('Invalid email or password !', 'danger');
            }
        } finally {
            setLoading(false);
        }

    }
    async function onRegister(values) {
        setLoading(true);
        try {
            const result = await authService.register(values);
            showMessage('Successful registration!');
            setUser({
                _id: result._id,
                accessToken: result.accessToken,
                email: result.email,
                username: result.username
            });
            navigate('/');
        } catch (err) {
            showMessage(err.message, 'danger')
        } finally {
            setLoading(false);
        }
    }

    async function onLogout() {
        setLoading(true);
        try {
            await authService.logout(user.accessToken);
            showMessage('Successful logout!');
        } catch (err) {
            showMessage(err.message, 'danger')
        } finally {
            setLoading(false);
        }

        clearAuthFromLocalStorage();
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