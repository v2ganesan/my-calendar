import React from 'react';
import './NewEventForm.css';

const EventForm = ({ isFormVisible }) => {
  return (
    <div className={`event-form-container ${isFormVisible ? 'slide-in' : ''}`}>
      <form>
        <h3>Create Event</h3>
        <label htmlFor="eventName">Event Name:</label><br />
        <input type="text" id="eventName" name="eventName" /><br /><br />

        <label htmlFor="eventLocation">Location:</label><br />
        <input type="text" id="eventLocation" name="eventLocation" /><br /><br />

        <label htmlFor="eventDuration">Duration:</label><br />
        <input type="text" id="eventDuration" name="eventDuration" /><br /><br />

        <button type="submit">Save Event</button>
      </form>
    </div>
  );
};

export default EventForm;
