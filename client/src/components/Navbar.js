import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<div className="ui container">
			<h1 className="ui header">T.E.A.M. Stream</h1>
			<div>
				<Link to="/">Home</Link>
				<Link to="/video">Video</Link>
				<Link to="/chat">Chat</Link>
				<Link to="/new-event">New Event</Link>

				{Auth.loggedIn() ? (
					<>
						<Link className="" to="/me">
							{Auth.getProfile().data.name}'s profile
						</Link>
						<Link
							className=""
							onClick={logout}
						>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
