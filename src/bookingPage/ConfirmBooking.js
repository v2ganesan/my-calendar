import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ConfirmBooking() {
    const { email, id, date, slot, duration } = useParams();
    const [attendeeName, setAttendeeName] = useState('');
    const [attendeeEmail, setAttendeeEmail] = useState('');

    //console.log('duration is ', duration);
    // Calculate end time
    const calculateEndTime = (startTime, durationInHours) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date(date);
        startDate.setHours(hours, minutes);

        // Convert duration from hours to minutes
        const durationInMinutes = durationInHours * 60;

        const endDate = new Date(startDate.getTime() + durationInMinutes * 60000); // duration in minutes
        return `${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    };

    // Use the function with duration treated as hours
    const endTime = calculateEndTime(slot, Number(duration));


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isSlotAvailable = await fetch(`/api/apptOps/checkExisting/${slot}`);
            const isAvailable = await isSlotAvailable.json();
            if (isAvailable) {
                alert('Slot is already booked.');
                return;
            }

            const response = await fetch('/api/apptOps/createAppointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    eventId: id,
                    date,
                    startTime: slot,
                    endTime: calculateEndTime(slot, Number(duration)), 
                    attendeeName,
                    attendeeEmail
                })
            });

            if (response.ok) {
                alert('Appointment booked successfully!');
            } else {
                alert('Failed to book appointment.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Confirm Your Appointment</h1>
            
            <label>
                Name:
                <input type="text" value={attendeeName} onChange={(e) => setAttendeeName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={attendeeEmail} onChange={(e) => setAttendeeEmail(e.target.value)} required />
            </label>
            <label>Date: {date}</label>
            <label>Start Time: {slot}</label>
            <label>End Time: {endTime}</label>
            <label>Host: </label>
            <label>Location: </label>

            <button type="submit">Confirm Appointment</button>
        </form>
    );
}