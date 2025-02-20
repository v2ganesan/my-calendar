const express = require('express');
const router = express.Router();
const { generatePossibleSlots } = require('../utils/slotGenerator.js');
const { filterAvailableSlots} = require('../utils/slotFilter.js');
const User = require('../models/User');
const Event = require('../models/events')
const MeetingAvailability = require('../models/meetingAvailability');
const Appointment = require('../models/appointments');

// generate appointment scheduling link  
router.get('/getLink', async (req, res) => {
    // passed in the email / eventId
    try{
        const { email, id } = req.query;
        console.log("email: ", email, " eventId: ", id);
        const username = email.replace("@gmail.com", ""); // remove the @gmail.com from the email 

        const eventLink = `${req.protocol}://${req.get('host')}/booking/${username}/${id}`;
        console.log('link', eventLink)
        res.status(200).json({ link: eventLink });

    } catch(error) {
        console.error('Error generating link:', error);
        res.status(500).json({ message: 'Error generating link' });
    }
});

router.get('/availableSlots/:email/:date/:eventId', async (req, res) => {
    try {
        const { email, date, eventId } = req.params;
        console.log('email: ', email, ' date: ', date, ' eventId: ', eventId);
        // Fetch the user ID using the email
        const user = await User.findOne({
            where: { email },
            attributes: ['id'],
            raw: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user.id;

        // Determine the day of the week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateObj = new Date(date);
        const dayOfWeek = daysOfWeek[dateObj.getDay()];
        console.log('Checking availability for ', dayOfWeek, ', ', date);

        // Get availability for that date
        const availability = await MeetingAvailability.findOne({
            where: { user_id: userId, day_of_week: dayOfWeek }
        });

        if (!availability) {
            console.log('No availability found for ', date);
            return res.json({ message: 'No availability found for ', date });
        }

        const start = availability.start_time;
        const end = availability.end_time;

        // Get the meeting duration from the events table
        const eventData = await Event.findOne({
            where: { id: eventId }
        });

        const duration = eventData.duration;
        //console.log('duration', duration);

        const slots = await generatePossibleSlots(start, end, duration);
        console.log('slots ', slots);
        const filteredSlots = await filterAvailableSlots(userId, date, slots);

        console.log(filteredSlots);
        res.json(filteredSlots);

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error fetching available slots' });
    }
});

// Create a new appointment
router.post('/createAppointment', async (req, res) => {
    try {
        const { email, eventId, date, startTime, endTime, attendeeName, attendeeEmail } = req.body;

        // Fetch the user ID using the email
        const user = await User.findOne({
            where: { email },
            attributes: ['id'],
            raw: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user.id;

        // Create a new appointment
        const newAppointment = await Appointment.create({
            user_id: userId,
            event_id: eventId,
            attendee_name: attendeeName,
            attendee_email: attendeeEmail,
            date,
            start_time: startTime,
            end_time: endTime
        });

        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// check if the slot is already booked before adding it to the db 
router.get('/checkExisting/:startTime', async (req, res) => {
    try {
        const { startTime } = req.params;
        console.log('startTime', startTime);

        const appt = await Appointment.findOne({
            where: { start_time: startTime }
        });

        if (appt) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking existing appointment:', error);
        res.status(500).json({ message: 'Error checking existing appointment' });
    }
});

module.exports = router;