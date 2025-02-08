const express = require('express');
const router = express.Router();
const { generatePossibleSlots } = require('../utils/slotGenerator.js');
const { filterAvailableSlots} = require('../utils/slotFilter.js');
const User = require('../models/User');
const Event = require('../models/events')
const MeetingAvailability = require('../models/meetingAvailability');

// generate appointment scheduling link  
router.get('/getLink', async (req, res) => {
    // passed in the email / eventId
    try{
        const { email, id } = req.params;
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

router.get('/availableSlots/:userId/:date/:eventId', async (req, res ) =>{
    //fetch the start and end time of the user id 
    try{
        const { userId, date, eventId } = req.params;
        // find out what day of the week the date is 

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateObj = new Date(date);
        const dayOfWeek = daysOfWeek[dateObj.getDay()];
        console.log('Checking availability for ', dayOfWeek, ', ', date);

        // get availability for that date 
        const availability = await MeetingAvailability.findOne({
            where: {user_id: userId, day_of_week : dayOfWeek}
        });
        if (!availability){
            return res.status(404).json({message: 'No availability found for ', date});
        }
        //select start_time, end_time from availability where id = userId
        console.log('avail', availability);
        const start = availability.start_time;
        const end = availability.end_time;
        console.log('startTime', start);
        // get the meeting duration from the events table
        const eventData = await Event.findOne({
            where: {id: eventId}
        });
        const duration = eventData.duration;
        console.log('duration', duration);

        const slots = generatePossibleSlots(start, end , duration);
        console.log('slots ', slots);
        const filteredSlots = filterAvailableSlots(userId, date, slots);

        console.log(filteredSlots);
        res.json(filteredSlots);

    } catch (error){
        console.log('error', error);
    }
});

module.exports = router;