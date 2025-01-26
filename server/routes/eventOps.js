const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/events')

// Get event data from postgres 
router.get('/events', async (req, res) => {
    try {
        // get email
        const {email} = req.query;
        console.log('user email: ', email)
        
        // get corresponding id 
        const user = await User.findOne({
            where: {email},
            attributes: ['id'],
            raw: true,
        });
        console.log('user id is', user);

        const user_id = user.id

        console.log('user id is', user_id);
        
        // retrieve all event info 
        const events = await Event.findAll({ where : {user_id} });
        const eventCards = [];
        console.log(events)
        events.forEach((event) => {
            eventCards.push({
                title: event.title,
                duration: event.duration,
                location: event.location
            });
        });

        // send all events in a json as response
        res.json(eventCards);

    } catch (error) {
        console.error(error)
    }
});

router.post('/newEvent', async (req, res) => {
    try {
        // Destructure new event form data from the request body
        const {
            email,
            title,
            duration,
            location
        } = req.body;

        // Fetch the user ID corresponding to the provided email
        const user = await User.findOne({
            where: { email },
            attributes: ['id'],
            raw: true,
        });

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user_id = user.id;
        console.log('User ID is', user_id);

        // Create a new event in the database
        const newEvent = await Event.create({
            user_id,
            title,
            duration,
            location,
        });

        console.log('New event created:', newEvent);
        return res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error in creating new event:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router; 