import React from "react";

export default function EventList({events}) {
    console.log({events})
  return (
    <div>
      <h1>Event List</h1>
      {events &&
       events.map((event) => (
          <div key={event._id}>
        <p> {event.user.username}      </p>
             
               {event.createdAt}
            
            
            <div className="card-body bg-light p-2">
              <p>{event.eventTitle}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
