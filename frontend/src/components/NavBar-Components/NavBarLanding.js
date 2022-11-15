import { useImperativeHandle } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBarLanding() {
    const path = window.location.pathname
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Our Cooking Mama
            </Link>

            <ul>
                <CustomLink to="/login">Login</CustomLink>
                <CustomLink to="/register">Register</CustomLink>
                <CustomLink to="/about-us">About Us</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    //const path = window.location.pathname

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end:true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {... props}>{children}</Link>
        </li>
    )
}
