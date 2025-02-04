const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/events')
const MeetingAvailability = require('../models/meetingAvailability');
const Appointment = require('../models/appointments')

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

router.get('/availableSlots', async (req, res ) =>{
    //fetch the start and end time of the user id 
    
    
})

module.exports = router;