import React from "react";

const EventList = ({ events }) => {
	console.log(events);

	return (
		<div>
			{events &&
				events.map((event) => (
					<div key={event._id} className="">
						<p>{event.eventTitle}</p>
						<p>{event.eventDescription}</p>
						<p>{event.eventLink}</p>

						<div className=""></div>
					</div>
				))}
		</div>
	);
};

export default EventList;
