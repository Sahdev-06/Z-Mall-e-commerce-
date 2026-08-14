import { useState, useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Loading from "../components/Common/Loading";
import { useAuth } from "../context/AuthContext";

function ProtectedPublicRoutes() {
    const location = useLocation()

    const { user, loading } = useAuth();

    if(loading) {
        return <Loading />
    }

    if(!user) {
        return <Navigate 
                    to="/login"
                    state={{ from : location }}
                    replace
                />
    }

    return (
        <>
            <Outlet />
        </>
    )
}


export default ProtectedPublicRoutes