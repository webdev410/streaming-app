import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import logo from "../../assets/logo.png";

export default function NotPremium() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<div className="d-flex justify-content-between">
			<Link href="/">Stream</Link>
			<Link to="/landing" className="navLink">
				Landing
			</Link>
			<Link to="/" className="navLink">
				Home
			</Link>
			<Link to="/me" className="navLink">
				{/*{Auth.getProfile().data.name}'s profile*/}
				Profile
			</Link>

			<Link to="/shop" className="navLink">
				Premium Membership
			</Link>
			<Link to="#" className="navLink" onClick={logout}>
				Logout
			</Link>
		</div>
	);
}
