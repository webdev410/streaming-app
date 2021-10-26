import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<div>
			<h1>T.E.A.M. Stream</h1>
			{/* Menu Items that will show all the time */}
			<Link to="/">Home</Link>

			{/* Menu Items that will show when a user is logged in */}
			{Auth.loggedIn() ? (
				<>
					<Link to="/video">Event</Link>
					<Link to="/chat">Chat</Link>
					<Link to="/new-event">New Event</Link>
					<Link to="/shop">Shop</Link>
					<Link className="" to="/me">
						{Auth.getProfile().data.name}'s profile
					</Link>

					<Link className="" onClick={logout}>
						Logout
					</Link>
				</>
			) : (
				<>
					{/* Menu Items that will show when user is not logged in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</>
			)}
		</div>
	);
};

export default Navbar;
