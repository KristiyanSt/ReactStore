import { createContext, useState } from "react";

export const AlertContext = createContext();

export default function AlertProvider({ children }) {
    const [showAlert, setShowAlert] = useState(false);
    const [messageInfo, setMessageInfo] = useState({});
    const [isLoading, setLoading] = useState(false);

    function showMessage(message, type = 'success') {
        setMessageInfo({ message, type });
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
        //maybe clear messageInfo afterall
    }
    const value = {
        showAlert,
        // setShowAlert,
        messageInfo,
        showMessage,
        isLoading,
        setLoading
    }
    return <AlertContext.Provider value={value}>
        {children}
    </AlertContext.Provider>
}
