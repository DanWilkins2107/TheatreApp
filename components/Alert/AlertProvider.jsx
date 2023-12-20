import { createContext, useState } from "react";
import { Text } from "react-native";

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

    const setAlert = (text, color, icon) => {
        setText(text);
        setColor(color);
        setIcon(icon);

        setTimeout(() => {
            setText(initialState.text);
            setColor(initialState.color);
            setIcon(initialState.icon);
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ text, color, icon, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
