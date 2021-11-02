import React from "react";
import { Link } from "react-router-dom";
import PremiumBadge from "../PremiumBadge";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";
import ConditionalLink from "./ConditionalLink";
const EventList = ({ events }) => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};

	return (
		<div>
			{events &&
				events.map((event) => (
					<div
						key={event._id}
						className={
							event.isPremiumContent === true &&
							(user.isPremium === false || !Auth.loggedIn())
								? "eventDiv disabledEvent"
								: "eventDiv"
						}
					>
						<PremiumBadge
							isPremiumContent={event.isPremiumContent}
						/>
						<h4 className="muted-text eventListText">
							{event.eventDate}
						</h4>
						<ConditionalLink
							className="conditionalLink"
							children={event.eventTitle}
							to={`/event/${event._id}`}
							condition={
								event.isPremiumContent === true &&
								(user.isPremium === false || !Auth.loggedIn())
									? false
									: true
							}
						></ConditionalLink>

						<p className="eventListText">
							{event.eventDescription}
						</p>
					</div>
				))}
		</div>
	);
};

export default EventList;
