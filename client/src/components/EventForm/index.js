import React, { useState } from "react";
import { Radio } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { Redirect, useParams } from "react-router-dom";

import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS, QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

import EventList from "../EventList";

export default function EventForm() {
	const { loading, data } = useQuery(QUERY_EVENTS);
	const eventList = data?.events;

	const { username: userParam } = useParams();
	const { loading: loading1, data: data1 } = useQuery(
		userParam ? QUERY_USER : QUERY_ME,
		{
			variables: { username: userParam },
		}
	);
	const user = data1?.me || data1?.user || {};

	const [toggleValue, setToggleValue] = useState(false);
	const [formState, setFormState] = useState({
		eventTitle: "",
		eventDescription: "",
		eventLink: "",
		eventDate: "",
		category: "",
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

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "eventTitle" && value.length <= 120) {
			setFormState({ ...formState, [name]: value });
			setCharacterCount(value.length);
			console.log(value.length);
		}
		if (name === "eventDate") {
			console.log(value);
			setFormState({ ...formState, [name]: value });
		} else if (name !== "eventTitle") {
			setFormState({ ...formState, [name]: value });
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (user.isPremium) {
			try {
				const { data } = await addEvent({
					variables: {
						...formState,
						user: Auth.getProfile().data._id,
						isPremiumContent: toggleValue,
					},
				});
				console.log(data);
				window.location.reload();
			} catch (err) {
				console.error(err);
			}
		} else {
			alert(
				"You must be a premium member to create an event. Signup through the link in the navbar"
			);
			return;
		}
	};
	return (
		<div className="ui raised padded container segment">
			<h2 className="ui header">Create a New Event</h2>
			<div>
				<p
					className={`${
						characterCount === 120 || error ? "danger" : ""
					}`}
				>
					Character Count: {characterCount}/120
					{error && (
						<span className="ui error message">
							Something went wrong...
						</span>
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
							placeholder="Video Link"
						/>
					</div>
					<div className="field">
						<input
							type="text"
							name="category"
							value={formState.category}
							onChange={handleChange}
							placeholder="Category"
						/>
					</div>
					<div className="field">
						<input
							type="date"
							name="eventDate"
							value={formState.eventDate}
							onChange={handleChange}
							placeholder="Event Date"
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
					{error && (
						<div className="ui error message">
							Something went wrong...
						</div>
					)}
				</form>

				<div>
					<EventList events={eventList} />
				</div>
			</div>
		</div>
	);
}
