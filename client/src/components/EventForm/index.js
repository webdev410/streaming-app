import React, { useState } from "react";
import { Radio } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import EventList from "../EventList";
import RadioToggle from "../RadioToggle";
export default function EventForm() {
	const { loading, data } = useQuery(QUERY_EVENTS);
	const eventList = data?.events;

	const [toggleValue, setToggleValue] = useState(false);

	const [formState, setFormState] = useState({
		eventTitle: "",
		eventDescription: "",
		eventLink: "",
		isPremiumContent: toggleValue,
	});
	const [characterCount, setCharacterCount] = useState(0);

	const [addEvent, { error }] = useMutation(ADD_EVENT, {
		update(cache, { data: { addEvent } }) {
			try {
				const { events } = cache.readQuery({ query: QUERY_EVENTS });
				cache.writeQuery({
					query: QUERY_EVENTS,
					data: { events: [addEvent, ...events] },
				});
			} catch (error) {
				console.log("in the cache", error);
			}
		},
	});

	const handleToggle = (event) => {
		event.preventDefault();
		setToggleValue(!toggleValue);
		setFormState({ ...formState, isPremiumContent: toggleValue });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await addEvent({
				variables: {
					...formState,
					user: Auth.getProfile().data._id,
					isPremiumContent: toggleValue,
				},
			});
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "eventTitle" && value.length <= 120) {
			setFormState({ ...formState, [name]: value });
			setCharacterCount(value.length);
			console.log(value.length);
		} else if (name !== "eventTitle") {
			setFormState({ ...formState, [name]: value });
		}
	};

	return (
		<div className="ui raised padded container segment">
			<h2 className="ui header">Create a New Event</h2>
			<div>
				<p
					className={`m-0 ${
						characterCount === 120 || error ? "text-danger" : ""
					}`}
				>
					Character Count: {characterCount}/120
					{error && (
						<span className="ml-2">Something went wrong...</span>
					)}
				</p>

				<form
					className="ui form"
					action="#"
					method="post"
					onSubmit={handleFormSubmit}
				>
					<div className="field">
						<input
							autoFocus
							type="text"
							name="eventTitle"
							value={formState.eventTitle}
							onChange={handleChange}
							placeholder="Event Title"
						/>
					</div>
					<div className="field">
						<input
							type="text"
							name="eventDescription"
							value={formState.eventDescription}
							onChange={handleChange}
							placeholder="Event Description"
						/>
					</div>
					<div className="field">
						<input
							type="text"
							name="eventLink"
							value={formState.eventLink}
							onChange={handleChange}
							placeholder="Event Link"
						/>
					</div>
					<div>

						<div>
							<h5>Premium Event?</h5>

							<Radio
								toggle
								name="isPremiumContent"
								value={toggleValue}
								onChange={handleToggle}
							/>
						</div>
					</div>
					<button className="ui primary button" type="submit">
						Submit
					</button>
					<pre>{JSON.stringify(error, null, 2)}</pre>
					{error && <div className="">Something went wrong...</div>}
				</form>

				<div>
					<EventList events={eventList} />
				</div>
			</div>
		</div>
	);
}
