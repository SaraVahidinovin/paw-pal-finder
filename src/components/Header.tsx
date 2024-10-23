import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import { useAuth } from "../context/GlobalAuthContext";
import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const { isLoggedIn, logout } = useAuth(); // Use the auth context

    return (
        <nav className="nav-bar">
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
                        className="login-button"
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
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
