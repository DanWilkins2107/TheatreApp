import { createContext, useState } from "react";

const initialState = {
    modal: null
};

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(initialState.modal);

    return (
        <ModalContext.Provider value={{ modal, setModal}}>
            {children}
        </ModalContext.Provider>
    );
};
