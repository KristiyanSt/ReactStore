import { createContext, useState } from "react"

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
            setMessageInfo({});
        }, 3000);
    }
    const value = {
        showAlert,
        messageInfo,
        showMessage,
        isLoading,
        setLoading
    }
    return <AlertContext.Provider value={value}>
        {children}
    </AlertContext.Provider>
}
