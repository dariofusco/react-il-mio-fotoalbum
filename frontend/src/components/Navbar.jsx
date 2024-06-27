import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export default function () {

    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <nav className="navbar">
                <menu>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/photos">Photos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/photos/create">Create</NavLink>
                    </li>
                    {!isLoggedIn &&
                        <li>
                            <NavLink to="/login">LogIn</NavLink>
                        </li>
                    }
                    {isLoggedIn &&
                        <li><a href="#" onClick={logout}>LogOut</a></li>
                    }
                </menu>
            </nav>
        </header>
    )
}