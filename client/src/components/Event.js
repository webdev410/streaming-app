import React from "react";
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
import { Table } from "semantic-ui-react";

export default function Event() {
	const { eventId } = useParams();
	const { data } = useQuery(QUERY_SINGLE_EVENT, {
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
					<h2 className="ui header text-center">
						{event.eventTitle}
					</h2>
					<h5 className="text-center">{event.eventDate}</h5>
					<p className="text-center">{event.eventDescription}</p>
					<div className="align-center">
						<Table className="ui single line unstackable table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="left aligned">
										Category
									</Table.HeaderCell>
									<Table.HeaderCell className="right aligned">
										Air Date
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell className="left aligned">{event.category}</Table.Cell>
									<Table.Cell className="right aligned">
										{event.eventDate}
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</div>
					{/*
					<p className="text-center">
						<span>Category:</span> {event.category}
					</p>
					<p className="text-center">
						<span>Event Date:</span>
						{event.eventDate}
					</p>
					<p className="text-center">
						<span>Event Description</span>
					</p>
					<p className="text-center">{event.eventDescription}</p> */}
					<ReactPlayer
						url={event.eventLink}
						playing={true}
						controls={true}
						width={"100%"}
						height={"auto"}
					/>
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
