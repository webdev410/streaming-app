import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import EventList from "./EventList";

export default function EventForm() {
  const [formState, setFormState] = useState({
    eventTitle: "",
    eventDescription: "",
    eventLink: "",
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
        console.log(error);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, events: [...me.events, addEvent] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEvent({
        variables: {
          ...formState,
          user: Auth.getProfile().data.username,
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
    <div className="ui container">
      <h2 className="ui header">Event Form</h2>
      <div>
        <p
          className={`m-0 ${
            characterCount === 280 || error ? "text-danger" : ""
          }`}
        >
          Character Count: {characterCount}/120
          {error && <span className="ml-2">Something went wrong...</span>}
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
          <button className="ui submit button" type="submit">
            Submit
          </button>
          {error && <div className="">Something went wrong...</div>}
        </form>

        {/* <div>
         < EventList 
         events={formState}
         />
      </div> */}
      </div>
    </div>
  );
}
