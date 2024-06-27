import { NavLink } from "react-router-dom";

export default function () {

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
                </menu>
            </nav>
        </header>
    )
}