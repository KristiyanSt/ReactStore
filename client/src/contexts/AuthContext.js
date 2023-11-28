import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AlertContext } from './AlertContext.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import authService from '../services/authService.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const { showMessage, setLoading } = useContext(AlertContext);
    const [user, setUser] = useLocalStorage('auth');

    async function onLogin(values) {
        try {
            setLoading(true);
            const result = await authService.login(values);
            setUser({
                _id: result._id,
                accessToken: result.accessToken,
                email: result.email,
                username: result.username,
                roles: result.roles || []
            });
            showMessage('Successful login!');
            navigate('/');
        } catch (err) {
            if (err.status === 403) {
                return showMessage('Invalid email or password !', 'danger');
            }
            showMessage(err.message, 'danger');
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
            navigate('/');
        } catch (err) {
            showMessage(err.message, 'danger')
        } finally {
            setLoading(false);
        }
    }
    async function onLogout() {
        try {
            setLoading(true);
            await authService.logout(user.accessToken);
            clearAuthFromLocalStorage();
            showMessage('Successful logout!');
        } catch (err) {
            clearAuthFromLocalStorage();
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