import React from 'react';
import './dashboard.css';
import { useState, useEffect, useCallback } from 'react';
import UpdateEventForm from '../updateEvents/UpdateEventForm';


export default function EventCard({email, id, title, duration, location, fetchEvents}) {

    const [showForm, setShowForm] = useState(false);
    const [link, setLink] = useState('');

    const showUpdateForm = () => {
      setShowForm(!showForm)
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/eventOps/deleteEvent/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          //refetch events, will fix to update state instead of making funct call later
          console.log("EVENT DELETED")
          fetchEvents();
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('There was an error deleting the event. Please try again.');
      }
    };

    const handleFetchLink = useCallback(async () => { // memoize the function so i dont have to re-render this link 
      try {
        const result = await fetch(`/api/apptOps/getLink?email=${email}&id=${id}`);
        const data = await result.json();
        setLink(data.link);
      } catch (error) {
        console.error('Error fetching link:', error);
      }
    }, [email, id]); // 
    
    useEffect(() => {
      handleFetchLink();
      console.log('fetched')
    }, [handleFetchLink]); // Now properly included in dependencies
    

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
          <a href={link} className="booking-page-link">View booking page</a>
        </div>
        <div className="event-card-footer">
          <button className="copy-link">Copy link</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    );
  }
  