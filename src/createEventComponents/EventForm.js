import React, { useState } from 'react';
import './NewEventForm.css';

const EventForm = ({ isFormVisible, email }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '1:00:00',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // prepare event to add 
      const eventData = {
        ...formData,
        email, // user email 
      };

      // Submit the event data to the backend
      const eventResponse = await fetch('/api/eventOps/newEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (eventResponse.ok) {
        alert('Event created successfully!');
        setFormData({ eventName: '', eventLocation: '', eventDuration: '' }); // Reset the form
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('There was an error creating the event. Please try again.');
    }
  };

  if (!isFormVisible) return null;

  return (
    <div className={`event-form-container ${isFormVisible ? 'slide-in' : ''}`}>
      <form onSubmit={handleSubmit}>
        <h3>Create Event</h3>

        <label htmlFor="title">Event Name:</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="location">Location:</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="duration">Duration:</label><br />
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            <option value="00:30:00">30 minutes</option>
            <option value="01:00:00">1 hour</option>
            <option value="01:30:00">1.5 hours</option>
            <option value="02:00:00">2 hours</option>
          </select>
          /<br /><br />


        <button type="submit">Save Event</button>
      </form>
    </div>
  );
};

export default EventForm;
