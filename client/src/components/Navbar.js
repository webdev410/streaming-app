import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<div className="logo ui container">
			<img className="ui bottom aligned small image" src={logo} alt="T.E.A.M. STEAM logo" />
				{/* Menu Items that will show all the time */}
				<Link to="/" className="navLink">Home</Link>

				{/* Menu Items that will show when a user is logged in */}
				{Auth.loggedIn() ? (
					<>
						<Link to="/video" className="navLink">Event</Link>
						<Link to="/chat" className="navLink">Chat</Link>
						<Link to="/new-event" className="navLink">New Event</Link>
						<Link to="/shop" className="navLink">Shop</Link>
						<Link to="/me" className="navLink">
							{/*{Auth.getProfile().data.name}'s profile*/}
							Profile
						</Link>

						<Link to="#" className="navLink" onClick={logout}>
							Logout
						</Link>
					</>
				) : (
					<>
						{/* Menu Items that will show when user is not logged in */}
						<Link to="/login" className="navLink">Login</Link>
						<Link to="/signup" className="navLink">Signup</Link>
					</>
				)}
		</div>
	);
};

export default Navbar;
