import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext.js"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => { 
        onLogout(); 
    }, []);

    return <Navigate to="/" />
}