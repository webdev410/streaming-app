import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import EventList from "../components/EventForm/EventList";
import Search from "../components/Search";
const Home = () => {
	const { loading, data } = useQuery(QUERY_EVENTS);
	const eventList = data?.events;
	return (
		<main className="ui raised padded container segment">
			<div>
				<h2 className="ui header">Home Page</h2>
			</div>
			<div>
				<Search />
			</div>
			<div>
				<EventList events={eventList} />
			</div>
		</main>
	);
};

export default Home;
