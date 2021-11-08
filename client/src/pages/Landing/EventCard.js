import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import ConditionalLink from "./ConditionalLink";
import PremiumBadge from "../../components/PremiumBadge";
import Auth from "../../utils/auth";

import eventImg from "../../assets/img/events/default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";

export default function EventCard({ events, user }) {
	return (
		<div className="d-flex justify-content-around flex-wrap eventRow">
			{events &&
				events.map((event) => (
					<div
						key={event._id}
						className={
							event.isPremiumContent === true &&
							(user.isPremium === false || !Auth.loggedIn())
								? "eventCard disabledEvent"
								: "eventCard"
						}
					>
						<PremiumBadge
							isPremiumContent={event.isPremiumContent}
						/>
						<div style={{ width: "20rem" }}>
							<Card.Img src={eventImg} variant="top" />
							<Card.Body>
								<Card.Title as="h5">
									{event.eventTitle}
								</Card.Title>
								<Card.Text>{event.eventDescription}</Card.Text>
								<Card.Text>{event.eventDate}</Card.Text>

								<ConditionalLink
									className=""
									children="Enter Event"
									to={`/event/${event._id}`}
									condition={
										event.isPremiumContent === true &&
										(user.isPremium === false ||
											!Auth.loggedIn())
											? false
											: true
									}
								></ConditionalLink>
							</Card.Body>
						</div>
					</div>
				))}
		</div>
	);
}
