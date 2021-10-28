import React from "react";
import { Link } from "react-router-dom";
const EventList = ({ events }) => {
	console.log(events);

	return (
		<div>
			{events &&
				events.map((event) => (
					<div key={event._id} className="eventDiv">
						<Link to={`/event/${event._id}`}><h2>{event.eventTitle}</h2></Link>
						<p>{event.eventDescription}</p>
					</div>
				))}
		</div>
	);
};

export default EventList;
