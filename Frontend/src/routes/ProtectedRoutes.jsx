import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Loading from "../components/Common/Loading";

function ProtectedRoutes() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await getCurrentUser()

                setUser(response)
                setLoading(false)

            } catch (_) {

                setUser(null)
                setLoading(false)

            }
        }

        fetchCurrentUser()
    }, [])

    if(loading) {
        return <Loading />
    }

    if(!user) {
        return <Navigate to="/admin/login" replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}


export default ProtectedRoutes