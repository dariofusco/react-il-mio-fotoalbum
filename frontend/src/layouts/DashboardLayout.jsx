import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function () {

    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to="/login" />

    return (<>
        <Navbar />
        <Outlet />
    </>)
}