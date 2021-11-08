import React from "react";
import Auth from "../../utils/auth";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import NotPremium from "./NotPremium";
import Premium from "./Premium";
import Cart from "../Cart";
import "../../css/Navbar.css";
const Navbar = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	const { username: userParam } = useParams();
	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});
	const user = data?.me || data?.user || {};

	if (Auth.loggedIn() && !user.isPremium) {
		return <NotPremium />;
	}
	if (Auth.loggedIn() && user.isPremium) {
		return <Premium />;
	}

	return (
		<div className="d-flex justify-content-between nav navbar">
			{/* Menu Items that will show when user is not logged in */}
			<Link to="/" className="navLink">
				T.E.A.M. STREAM
			</Link>
			<Link to="/landing" className="navLink">
				Landing
			</Link>
			<Cart />
			<Link to="/login" className="navLink">
				Login
			</Link>
			<Link to="/signup" className="navLink">
				Signup
			</Link>
		</div>
	);
};

export default Navbar;
