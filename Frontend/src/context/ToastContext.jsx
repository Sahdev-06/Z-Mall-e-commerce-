import { createContext, useContext, useState, useEffect } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {

    const [toast, setToast] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        if (!toast.message) return;

        const timer = setTimeout(() => {
            hideToast();
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast.message]);

    const showToast = (message, type) => {
        setToast({
            message,
            type
        });
    };

    const hideToast = () => {
        setToast({
            message: "",
            type: ""
        });
    };

    return (
        <ToastContext.Provider
            value={{
                toast,
                showToast,
                hideToast
            }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}