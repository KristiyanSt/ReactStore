import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => { onLogout() }, []);

    return <Navigate to="/" />
}