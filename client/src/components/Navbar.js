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
			<a href="/">Home</a>
			<a href="/video">Video</a>

			<div>
				{Auth.loggedIn() ? (
					<>
						<Link className="btn btn-lg btn-info m-2" to="/me">
							{Auth.getProfile().data.username}'s profile
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
						<Link className="btn btn-lg btn-info m-2" to="/login">
							Login
						</Link>
						<Link className="btn btn-lg btn-light m-2" to="/signup">
							Signup
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
