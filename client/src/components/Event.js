import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_EVENT } from "../utils/queries";

import ReactPlayer from "react-player";
import Chat from "./Chat";
import { Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";

export default function Event() {
	const { eventId } = useParams();
	const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
		// Pass the `thoughtId` URL parameter into query to retrieve this thought's data
		variables: { eventId: eventId },
	});
	const event = data?.event || {};
	const [videoUrl, setVideoUrl] = useState("");
	const handleInputChange = (e) => {
		// Getting the value and name of the input which triggered the change
		const { target } = e;

		const inputValue = target.value;
		setVideoUrl(inputValue);
	};

	return (
		<div className="ui raised padded container segment">
			<Grid>
				<Grid.Column computer={10} tablet={16} mobile={16}>
					<h2 className="ui header">Video Component</h2>

					<form className="ui form" action="#">
						<input
							className="field"
							value={videoUrl}
							type="text"
							name="videoUrl"
							onChange={handleInputChange}
							placeholder="Video Link"
						/>
					</form>
					<ReactPlayer url={videoUrl} />
					<LikeButton
						eventId={event._id}
						likes={event.likes.length}
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
