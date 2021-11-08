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
	console.log(user);
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
		<div className="d-flex justify-content-center">
			<div className="col-12 col-lg-8 col-xl-6">
				<div className="boxShadow m-3">
					<div className="d-flex justify-content-between">
						<h2 className="">Create a New Event</h2>
						<button className="customBtn" type="submit">
							Save
						</button>
					</div>
				</div>
				<div className="boxShadow m-3">
					<div>
						<form
							className=""
							action="#"
							method="post"
							onSubmit={handleFormSubmit}
						>
							<div className="form-group">
								<label className="labelText">Event Title</label>
								<p
									className={`${
										characterCount === 120 || error
											? "danger"
											: ""
									}`}
								>
									Character Count: {characterCount}/120
									{error && (
										<span className="alert alert-danger">
											Something went wrong...
										</span>
									)}
								</p>
								<input
									autoFocus
									type="text"
									name="eventTitle"
									value={formState.eventTitle}
									onChange={handleChange}
									placeholder="Event Title"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label className="labelText">Event Date</label>
								<input
									type="date"
									name="eventDate"
									value={formState.eventDate}
									onChange={handleChange}
									placeholder="Event Date"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label className="labelText">Video Link</label>
								<input
									type="text"
									name="eventLink"
									value={formState.eventLink}
									onChange={handleChange}
									placeholder="Video Link"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label className="labelText">Category</label>
								<input
									type="text"
									name="category"
									value={formState.category}
									onChange={handleChange}
									placeholder="Category"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label className="labelText">
									Event Description
								</label>
								<textarea
									type="text"
									name="eventDescription"
									value={formState.eventDescription}
									onChange={handleChange}
									placeholder="Event Description"
									className="form-control"
								/>
							</div>
							{error && (
								<div className="alert alert-danger">
									Something went wrong...
								</div>
							)}
							<div className="d-flex justify-content-center">
								<div className="">
									<label className="labelText ">
										Premium Event
									</label>
									<div>
										<Radio
											toggle
											name="isPremiumContent"
											value={toggleValue}
											onChange={handleToggle}
											className="align-middle"
										/>
									</div>
								</div>
							</div>
						</form>

						{/* <div>
							<EventList events={eventList} />
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
