// import { useImperativeHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { NavBar, Nav, NavDropdown } from 'react-boostrap';

export default function NavBar() {
	const path = window.location.pathname;
	const [cookies, setCookie] = useCookies(["user"]);
	if (cookies.id <= 0) {
		window.location.href = "/login";
	}

	return (
		<nav className="nav">
			<Link to="/homepage" className="site-title">
				Welcome, Chef {cookies.FirstName}!
			</Link>

			<ul>
				<CustomLink to="/homepage">Home Page</CustomLink>
				<CustomLink to="/profile">Profile</CustomLink>
				<CustomLink to="/search">Search</CustomLink>
				<CustomLink to="/">Log Out</CustomLink>
			</ul>
		</nav>
	);
}

function CustomLink({ to, children, ...props }) {
	//const path = window.location.pathname

	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}
