import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './dashboardComponents/Sidebar';
import EventCard from './dashboardComponents/EventCard';
import Header from './dashboardComponents/Header'
import './dashboardComponents/dashboard.css';
import './createEventComponents/NewEventForm.css'
import EventForm from './createEventComponents/EventForm';
import CreateEventButton from './createEventComponents/CreateEventButton'
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';


export default function EventsPage() {
  const location = useLocation();
  const { email, name , picture } = location.state || {};
  const [events, setEvents] = useState([]);

  const [isFormVisible, setFormVisible] = useState(false);


  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };
  
  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/eventOps/events?email=${email}`);
      const data = await response.json();
      setEvents(data); // store event data in state
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch events on mount and whenever email changes
  useEffect(() => {
    fetchEvents();
  }, [email]);

  return (
    <div className="dashboard">
      <Header name={name} picture={picture} />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <h1>Event types</h1>
          
          <CreateEventButton onClick={toggleForm} />
          <EventForm isFormVisible={isFormVisible} email={email} toggleForm={toggleForm} fetchEvents={fetchEvents}/>

          {events.map((event, index) => (
              <EventCard
                key={index}
                email={email}
                id={event.id}
                title={event.title}
                duration={event.duration.hours}
                location={event.location}
                fetchEvents={fetchEvents}
              />
            ))}
        </main>
      </div>
    </div>
  );
}
