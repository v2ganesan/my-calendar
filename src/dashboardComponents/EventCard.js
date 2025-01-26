import React from 'react';
import './dashboard.css';
import { useState, useEffect } from 'react';
import UpdateEventForm from '../updateEvents/UpdateEventForm';


export default function EventCard({id, title, duration, location, fetchEvents}) {

    const [showForm, setShowForm] = useState(false);

    const showUpdateForm = () => {
      setShowForm(!showForm)
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/eventOps/deleteEvent/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          //onDelete(id);
          //refetch events, will fix to update state instead of making funct call later
          fetchEvents();
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('There was an error deleting the event. Please try again.');
      }
    };

    return (
      <div className="event-card">
        <div className="event-card-header">
          <button className="update-button" onClick={showUpdateForm} > Update </button>
          <UpdateEventForm 
            showForm={showForm} 
            id={id} 
            showUpdateForm={showUpdateForm} 
            fetchEvents={fetchEvents} 
            title={title}
            duration={duration}
            location={location} />
          <span className="event-title">{title}</span>
          <button 
          className="delete-button" 
          onClick={handleDelete}
        >
          🗑️
        </button>
        </div>
        <div className="event-card-body">
          <p><strong>{duration}</strong>, {location}</p>
          <a href="#" className="booking-page-link">View booking page</a>
        </div>
        <div className="event-card-footer">
          <button className="copy-link">Copy link</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    );
  }
  