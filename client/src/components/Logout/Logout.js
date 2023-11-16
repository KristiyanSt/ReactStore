import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext.js"

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => { onLogout() }, []);

    return <Navigate to="/" />
}