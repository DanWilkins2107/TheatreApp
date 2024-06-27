import { createContext, useState, useRef, useEffect } from "react";

const initialState = {
    text: "",
    color: "",
    name: "",
    totalAlerts: 0,
};

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [text, setText] = useState(initialState.text);
    const [color, setColor] = useState(initialState.color);
    const [name, setName] = useState(initialState.name);
    const [alertNo, setAlertNo] = useState(initialState.totalAlerts);
    const alertRef = useRef(alertNo);

    useEffect(() => {
        alertRef.current = alertNo;
    }, [alertNo]);

    const setAlert = (text, color, name) => {
        setText(text);
        setColor(color);
        setName(name);
        setAlertNo((alertNo) => alertNo + 1);

        setTimeout(() => {
            if (alertRef.current - 1 === alertNo) {
                setText(initialState.text);
                setColor(initialState.color);
                setName(initialState.name);
            }
        }, 3000);
    };

    const resetAlert = () => {
        setText(initialState.text);
        setColor(initialState.color);
        setName(initialState.name);
    }

    return (
        <AlertContext.Provider value={{ text, color, name, setAlert, resetAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
