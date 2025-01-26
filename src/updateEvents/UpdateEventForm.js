import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventForm from '../createEventComponents/EventForm'
import '../createEventComponents/NewEventForm.css';

const UpdateEventForm = ({ showForm, id, showUpdateForm, fetchEvents, title, duration, location}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: title,
    duration: duration,
    location: location,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // prepare event to update 
      const eventData = {
        ...formData,
        id, // event id  
      };

      // Submit the event data to the backend
      const eventResponse = await fetch('/api/eventOps/updateEvent/:id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (eventResponse.ok) {
        alert('Event updated successfully!');
        showUpdateForm();
        fetchEvents();
      } else {
        throw new Error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('There was an error updating the event. Please try again.');
    }
  };

  if (!showForm) return null;

  return (
    <div className={`event-form-container ${showForm ? 'slide-in' : ''}`}>
      <form onSubmit={handleSubmit}>
        <h3>Update Event</h3>

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

export default UpdateEventForm;
