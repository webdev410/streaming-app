import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import logo from "../../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faPlus,
	faCalendarStar,
	faUser,
	faSignOut,
	faShoppingBag,
} from "@fortawesome/pro-solid-svg-icons";

export default function NotPremium() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<div className="d-flex justify-content-between nav navbar">
			<Link to="/" className="navLink">
				T.E.A.M. STREAM
			</Link>
			<Link to="/landing" className="navLink">
				<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
			</Link>
			<Link to="/events" className="navLink">
				<FontAwesomeIcon icon={faCalendarStar}></FontAwesomeIcon>
			</Link>
			<Link to="/new-event" className="navLink">
				<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
			</Link>
			<Link to="/me" className="navLink">
				<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
			</Link>
			<Link to="/shop" className="navLink">
				<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
			</Link>
			<Link to="#" className="navLink" onClick={logout}>
				<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
			</Link>
		</div>
	);
}
