import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'
import { useAuth } from "../context/GlobalAuthContext";
import '../styles/header.css'
import Logout from '../assets/Logout.svg'

export default function Header() {
    const location = useLocation(); //  the current route location
    const { isLoggedIn, logout } = useAuth(); // Use the auth context

    // Determine the css class name based on the current path. important for showing home page differently
    const headerClass = location.pathname === "/" ? 'Home-page-header' : 'header';

    return (
        <nav className={headerClass}>
            <div className="logo-container">
                <NavLink to="/">
                    <img src={logo} className="logo" alt="Logo" />
                </NavLink>
            </div>
            <div className="menu-container">
                <NavLink
                    to="/alldogs"
                    className={({ isActive }) => isActive ? 'active-link' : ''}
                >
                    All Dogs
                </NavLink>

                {!isLoggedIn ? (
                    // If not logged in, show login
                    <NavLink
                        to="/login"
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                        Login
                    </NavLink>
                ) : (
                    // If logged in, show My Dogs, Add a Dog, Favorites, and Logout
                    <>
                        <NavLink
                            to="/mydogs"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            My Dogs
                        </NavLink>
                        <NavLink
                            to="/adddog"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Add a Dog
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Favorites
                        </NavLink>
                        <button
                            onClick={logout}
                            className="logout-button"
                            title="Logout"
                        >
                            <img src={Logout} alt="Logout"></img>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
