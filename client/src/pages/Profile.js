import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	// redirect to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Redirect to="/me" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}

	return (
		<div className="ui raised padded container segment">
			<h2 className="ui header">
				{userParam ? `${user.username}'s` : "Your"} Profile
			</h2>
			<p>{user.name}</p>
			<p>{user.username}</p>
			<p>{user.email}</p>
			{/* for each post by this user, show details */}
		</div>
	);
};

export default Profile;
