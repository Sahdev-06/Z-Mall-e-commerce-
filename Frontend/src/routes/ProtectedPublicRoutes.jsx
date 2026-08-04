import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getCurrentUser } from "../services/authService";
import Loading from "../components/Common/Loading";

function ProtectedPublicRoutes() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await getCurrentUser()
                setUser(response)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser();
    }, [])

    if(loading) {
        return <Loading />
    }

    if(!user) {
        return <Navigate to="/login" replace/>
    }

    return (
        <>
            <Outlet />
        </>
    )
}


export default ProtectedPublicRoutes