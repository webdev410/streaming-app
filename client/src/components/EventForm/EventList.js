import React from "react";
import { Link } from "react-router-dom";
const EventList = ({ events }) => {
	console.log(events);

	return (
		<div>
			{events &&
				events.map((event) => (
					<div key={event._id} className="eventDiv">
						<h2>{event.eventTitle}</h2>
						<p>{event.eventDescription}</p>
						<Link to={event.eventLink}>{event.eventLink}</Link>
					</div>
				))}
		</div>
	);
};

export default EventList;
