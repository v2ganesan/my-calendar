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
        
        // new event form data
        const {
            email,
            title,
            duration,
            location
        } = req.body ;

        // get corresponding id 
        const user = await User.findOne({
            where: {email},
            attributes: ['id'],
            raw: true,
        });        

        const user_id = user.id
        console.log('user id is', user_id);

        try {
            // create new event in db 
            const newEvent = await Event.create({
                user_id,
                title,
                duration,
                location
            })
            console.log("new event created")
        } catch(error)

    } catch(error)
});

module.exports = router; 