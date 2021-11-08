import React from "react";
import EventContainer from "./EventContainer";
import Hero from "./Hero";
export default function Landing() {
	return (
		<div>
			<Hero />
			<div className="mt-4">
				<EventContainer />
			</div>
		</div>
	);
}
