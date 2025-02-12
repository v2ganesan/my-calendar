import React, { useState, useEffect } from 'react';
//import React, { useEffect } from 'react';
//import { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom';
//import { Await } from 'react-router-dom';
import './bookingPage.css'; // Import your CSS file

export default function BookingCalendar() {
    const { email, id } = useParams();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // manage the date and the available slots
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    const [availableSlots, setAvailableSlots] = useState([]);

    // fetch the available slots for the selected date
    const fetchAppts = async () => {
        try {
            console.log(`Fetching slots for: email=${email}, eventId=${id}, date=${selectedDate}`);
            const response = await fetch(`/api/apptOps/availableSlots/${email}/${selectedDate}/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Check if data is an array and update state
            if (Array.isArray(data) && data.length > 0) {
                setAvailableSlots(data);
            } else {
                setAvailableSlots([]); // Set to empty if no slots are available
            }
        } catch (error) {
            console.error('Error fetching appts:', error);
        }
    };

    
    useEffect(() => {
        fetchAppts();
    }, [selectedDate]);

    // date change event handler
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        console.log('Formatted date:', formattedDate);
        setSelectedDate(formattedDate);
    };

    return (
        <div className="container">
            <div className="calendar">
                <Calendar onChange={handleDateChange} value={new Date(selectedDate)} />
            </div>
            <div className="slots">
                {availableSlots.map((slot, index) => (
                    <button key={index} className="slot-button">
                        {slot}
                    </button>
                ))}
            </div>


 
            {/* Render available slots or any other UI elements here */}
        </div>
    )
}
//i can easily add the event id, userId, and date 
        //eventId and date are easy to pass in, userId is a bit tough 
        //I can pass the email in instead of the userId and just retrieve it after 
            // need to write a function that does that because there like 3 occurences of that in