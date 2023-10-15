import { useState } from "react";

export default function useLocalStorage() {
    const [user, setUserState] = useState(() => {
        return JSON.parse(localStorage.getItem('auth')) || {};
    });

    function setUser(user) {
        setUserState(user);
        localStorage.setItem('auth', JSON.stringify(user));
    }

    function removeUser() {
        setUserState({});
        localStorage.removeItem('auth');
    }

    user.addToCart = (productId) => {
        if(!user.cart) {
            user.cart = [];
        }
        user.cart.push(productId);
        setUser(user);
    }
    
    return {
        user,
        setUser,
        removeUser
    }
}