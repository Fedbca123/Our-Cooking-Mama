import { useImperativeHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import { NavBar, Nav, NavDropdown } from 'react-boostrap';

export default function NavBar() {
	const path = window.location.pathname;

	// function logOut() {
	// 	window.location.href = "/login";
	// }

	return (
		<nav className="nav">
			<Link to="/homepage" className="site-title">
				Our Cooking Mama
			</Link>

			<ul>
				<CustomLink to="/homepage">Home Page</CustomLink>
				<CustomLink to="/profile">Profile</CustomLink>
				<CustomLink to="/search">Search</CustomLink>
				{/* <Link onClick={logOut()}> Log Out</Link> */}
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
