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
			<h1>T.E.A.M.</h1>
			<Link to="/">Home</Link>
			<Link to="/video">Video</Link>
			<Link to="/chat">Chat</Link>
			<Link to="/new-event">New Event</Link>

			{Auth.loggedIn() ? (
				<>
					<Link className="btn btn-lg btn-info m-2" to="/me">
						{Auth.getProfile().data.name}'s profile
					</Link>
					<button
						className="btn btn-lg btn-light m-2"
						onClick={logout}
					>
						Logout
					</button>
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</>
			)}
		</div>
	);
};

export default Navbar;
