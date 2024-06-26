import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export default function () {

    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <nav className="navbar">
                <ul>

                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/photos">Photos</NavLink>
                    </li>

                    {!isLoggedIn &&
                        <>
                            <li>
                                <NavLink to="/contacts">Contacts</NavLink>
                            </li>

                            <li>
                                <NavLink to="/login">LogIn</NavLink>
                            </li>
                        </>
                    }

                    {isLoggedIn &&
                        <>
                            <li>
                                <NavLink to="/photos/create">Create</NavLink>
                            </li>

                            <li>
                                <NavLink to="/categories">Categories</NavLink>
                            </li>

                            <li>
                                <NavLink to="/messages">Messages</NavLink>
                            </li>

                            <li><a href="#" onClick={logout}>LogOut</a></li>
                        </>
                    }

                </ul>
            </nav>
        </header>
    )
}