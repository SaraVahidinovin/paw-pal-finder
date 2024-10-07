import { NavLink } from "react-router-dom";


export default function Footer() {

    return (
        <nav className="footer">
            <NavLink to="/about">
                About us
            </NavLink>
            <NavLink to="/contact">
                Contact us
            </NavLink>
        </nav>
    );
}
