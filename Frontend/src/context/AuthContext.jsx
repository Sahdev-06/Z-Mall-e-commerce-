import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { logoutUser } from "../services/authService.js";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const result = await getCurrentUser();
                setUser(result.data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser();
    }, [])

    const handleLogoutUser = async () => {
        try {
            const result = await logoutUser()
            return result
        } catch (error) {
            throw error
        } 
    }

    function clearUser() {
        setUser(null)
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                handleLogoutUser,
                clearUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}