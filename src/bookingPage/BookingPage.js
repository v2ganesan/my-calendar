import React, { useState, useEffect } from 'react';
//import React, { useEffect } from 'react';
//import { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom';
//import { Await } from 'react-router-dom';
import './BookingPage.css'; // Import the CSS file
import 'react-calendar/dist/Calendar.css';

export default function BookingCalendar() {
    // get email and id from the params to use later 
    const { email, id } = useParams();

    const [eventName, setEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Fetch event name
    useEffect(() => {
        const fetchEventName = async () => {
            try {
                const response = await fetch(`/api/eventOps/eventName/${id}`);
                const data = await response.json();
                setEventName(data.title);
            } catch (error) {
                console.error('Error fetching event name:', error);
            }
        };
        fetchEventName();
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //hook to retrieve the available appt slots based on the selected date 
    useEffect(() => {
        const fetchAppts = async () => {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            try {
                console.log(`Fetching slots for: email=${email}, eventId=${id}, date=${formattedDate}`);
                const response = await fetch(`/api/apptOps/availableSlots/${email}/${formattedDate}/${id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // data should be an array 
                // if there was no availability found its returned as a diff type
                if (Array.isArray(data) && data.length > 0) {
                    setAvailableSlots(data);
                } else {
                    setAvailableSlots([]);
                    setSelectedSlot(null); //makes book button go away
                }
            } catch (error) {
                console.error('Error fetching appts:', error);
            }
        };

        fetchAppts();
    }, [selectedDate]);

    /*
    
    how i want this page to look:
    title : Book an Appointment for {event name}
    calendar on the left 
    I want the days with no availability to be grayed out and unselectable
    when a day is selected, show the available slots for that day 
        Above the buttons, "Available Appointments for {date}"
        When I click a appointment time
            - "book appointment for {time}" button should appear below the slots 
            - when I click the button, it should redirect me to a form to fill out 
            - the form should have fields for name, email that the attendee must fill out
                - the form should also have the start and end time of the appointment, and the host name 
            - after that is submitted,  an appointment should be created in the appts table using this info    
    */
    return (
        <div className="booking-container">
            <h1 className="main-title">Book an Appointment for {eventName}</h1>
            <div className="booking-content">
                <div className="calendar-container">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
                <div className="slots-container">
                    <h2>Available Appointments for {selectedDate.toDateString()}</h2>
                    {availableSlots.map((slot, index) => (
                        <button key={index} className="slot-button" onClick={() => setSelectedSlot(slot)}>
                            {slot}
                        </button>
                    ))}
                </div>
            </div>
            {selectedSlot && (
                <button className="book-button" onClick={() => window.location.href = `/confirmBooking/${email}/${id}/${selectedDate.toISOString().split('T')[0]}/${selectedSlot}`}>
                    Book appointment for {selectedSlot}
                </button>
            )}
        </div>
    );
}