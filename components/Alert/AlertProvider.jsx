import { createContext, useState, useRef, useEffect } from "react";

const initialState = {
    text: "",
    color: "",
    icon: "",
    totalAlerts: 0,
};

export const AlertContext = createContext({ ...initialState, setAlert: () => {} });

export const AlertProvider = ({ children }) => {
    const [text, setText] = useState(initialState.text);
    const [color, setColor] = useState(initialState.color);
    const [icon, setIcon] = useState(initialState.icon);
    const [alertNo, setAlertNo] = useState(initialState.totalAlerts);
    const alertRef = useRef(alertNo);

    useEffect(() => {
        alertRef.current = alertNo;
    }, [alertNo]);

    const setAlert = (text, color, icon) => {
        setText(text);
        setColor(color);
        setIcon(icon);
        setAlertNo((alertNo) => alertNo + 1);

        setTimeout(() => {
            console.log(alertRef.current, alertNo);
            if (alertRef.current - 1 === alertNo) {
                setText(initialState.text);
                setColor(initialState.color);
                setIcon(initialState.icon);
            }
        }, 3000);
    };

    const resetAlert = () => {
        setText(initialState.text);
        setColor(initialState.color);
        setIcon(initialState.icon);
    }

    return (
        <AlertContext.Provider value={{ text, color, icon, setAlert, resetAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
