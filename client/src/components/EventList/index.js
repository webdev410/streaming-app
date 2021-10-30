import React from "react";
import { Link } from "react-router-dom";
import PremiumBadge from "../PremiumBadge";
const EventList = ({ events }) => {
	console.log(events);

	return (
		<div>
			{events &&
				events.map((event) => (
					<div key={event._id} className="eventDiv">
						<PremiumBadge
							isPremiumContent={event.isPremiumContent}
						/>
						<Link to={`/event/${event._id}`}>
							<h2>{event.eventTitle}</h2>
						</Link>
						<p>{event.eventDescription}</p>
					</div>
				))}
		</div>
	);
};

export default EventList;
