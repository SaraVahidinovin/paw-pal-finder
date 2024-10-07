import { NavLink, useLocation } from "react-router-dom";


export default function Header() {
    const location = useLocation(); //  the current route location

    // Determine the css class name based on the current path. important for showing landing page differently
    const headerClass = location.pathname === "/" ? 'Homw-page-header' : 'header';

    return (
        <nav className={headerClass}>
            <NavLink to="/">
                <img  className="logo" alt="Logo" />
            </NavLink>
            <NavLink 
                to="/alldogs"
                className={({ isActive }) => isActive ? 'active-link' : ''} 
            >
                All Dogs
            </NavLink>
            <NavLink 
                to="/Login"
                className={({ isActive }) => isActive ? 'active-link' : ''} 
            >
                Login
            </NavLink>
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
        </nav>
    );
}
