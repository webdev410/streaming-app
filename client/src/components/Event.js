import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_EVENT } from "../utils/queries";

import ReactPlayer from "react-player";
import Chat from "./Chat";
import { Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";
import PremiumBadge from "./PremiumBadge";

export default function Event() {
	const { eventId } = useParams();
	const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
		// Pass the `thoughtId` URL parameter into query to retrieve this thought's data
		variables: { eventId: eventId },
	});
	const event = data?.event || {};

	console.log("THIS EVENT!!!!!!", event);
	console.log("LIKES!!!!!!", event.likes);

	return (
		<div className="ui raised padded container segment">
			<Grid>
				<Grid.Column computer={10} tablet={16} mobile={16}>
					<PremiumBadge isPremiumContent={event.isPremiumContent} />
					<h2 className="ui header">{event.eventTitle}</h2>
					<p>{event.eventDescription}</p>
					<p>Event Start Date: {event.eventDate}</p>
					{/* if user is premium and event is premiumContent show video, otherwise show error */}
					<ReactPlayer url={event.eventLink} playing="true" />
					<LikeButton
						key={event._id}
						eventId={event._id}
						likes={event.likes?.length}
					/>
					<CommentForm eventId={event._id} />
					<CommentList comments={event.comments} />
				</Grid.Column>
				<Grid.Column computer={6} tablet={16} mobile={16}>
					<Chat />
				</Grid.Column>
			</Grid>
		</div>
	);
}
