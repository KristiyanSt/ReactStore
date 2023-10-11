import { useState } from "react";

export default function useLocalStorage() {
    const [userState, setLocalStorageState] = useState({});

    function setLocalStorageAuth(user) {
        setLocalStorageState(user);
        localStorage.setItem('auth', JSON.stringify(user));
    }
    function getLocalStorageAuth() {
        return userState;
    }
    function removeLocalStorageAuth() {
        setLocalStorageState({});
        localStorage.removeItem('auth');
    }

    return {
        userState,
        setLocalStorageAuth,
        removeLocalStorageAuth
    }
}