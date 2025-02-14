import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../../createEventComponents/NewEventForm.css'
import EventCard from '../EventCard'; // Correct path based on your structure
import EventForm from '../../updateEvents/UpdateEventForm'; // Assuming this is the form component
import CreateEventButton from '../../createEventComponents/CreateEventButton'; // Adjusted path
import './EventsDashboard.css'; // Path seems correct


export default function EventsDashboard() {
    const { email } = useParams();
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
    )
};