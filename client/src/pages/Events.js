import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import EventContainer from "./Landing/EventContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
const Events = () => {
	// useEffect to run the query on the page load so data populates (useLazyQuery)

	const { loading, data } = useQuery(QUERY_EVENTS);
	const eventList = data?.events;
	if (eventList?.length === 0) {
		return (
			<div className="">
				<h4>There are no events.</h4>
			</div>
		);
	}
	return (
		<main className=" p-3">
			<div className="eventTitleDiv d-flex flex-column align-items-center justify-content-center">
				<div>
					<h2 className=" m-3 title ">Events</h2>
				</div>
				<p className=" m-3 ">
					Premium events are only available to premium members.
				</p>
				<Link
					to="/shop"
					className="btn btn-secondary w-25 text-center"
					size="sm"
				>
					Become a Premium Member
					<FontAwesomeIcon
						icon={faChevronRight}
						className=""
					></FontAwesomeIcon>
				</Link>
			</div>

			<div>
				<EventContainer events={eventList} />
			</div>
		</main>
	);
};

export default Events;
