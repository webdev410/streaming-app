import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_EVENT } from "../utils/queries";
import { Button, Icon, Label } from "semantic-ui-react";

import { ADD_LIKE } from "../utils/mutations";
import Loader from "./Loader";
// import { QUERY_SINGLE_EVENT } from "../utils/queries";

export default function LikeButton({ likes }) {
	const [like, { error, data }] = useMutation(ADD_LIKE);
	const { eventId } = useParams();
	const [likeCount, updateLikeCount] = useState(likes);

	const addLike = async (eventId) => {
		// logic for if user has already liked it
		try {
			const { data } = await like({
				variables: { eventId },
			});
			updateLikeCount(likeCount + 1);
		} catch (e) {
			console.error(e);
		}
	};
	// to get the like count
	const { loading, data1 } = useQuery(QUERY_SINGLE_EVENT, {
		variables: { eventId: eventId },
	});
	const event = data1?.event;

	if (loading) {
		return <Loader />;
	}
	return (
		<div style={{ marginBottom: "20px" }}>
			<Button
				as="div"
				labelPosition="right"
				onClick={(event) => {
					event.preventDefault();
					addLike(eventId);
				}}
			>
				<Button icon>
					<Icon name="thumbs up outline" />
				</Button>
				<Label as="span" basic pointing="left">
					{likeCount}
				</Label>
			</Button>
		</div>
	);
}
