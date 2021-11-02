import React from "react";
import Auth from "../../utils/auth";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import NotPremium from "./NotPremium";
import Premium from "./Premium";

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
		<div className="logo ui container">
			<a href="/">
				<img
					className="ui bottom aligned small image"
					src={logo}
					alt="T.E.A.M. STEAM logo"
				/>
			</a>

			<>
				{/* Menu Items that will show when user is not logged in */}
				<Link to="/login" className="navLink">
					Login
				</Link>
				<Link to="/signup" className="navLink">
					Signup
				</Link>
			</>
		</div>
	);
};

export default Navbar;
