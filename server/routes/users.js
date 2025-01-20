const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/events')
const MeetingAvailability = require('../models/meetingAvailability');
const { Events } = require('pg');

// Check if user exists
router.get('/check', async (req, res) => {
    try {
      const { email } = req.query;
      console.log('Checking email:', email); // Debug log 1
  
      const user = await User.findOne({ where: { email } });
      console.log('Database response:', user); // Debug log 2
  
      // Explicitly check if user is null
      const isNewUser = user === null;
      console.log('Is new user:', isNewUser); // Debug log 3
  
      res.json({ isNewUser });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get event data from postgres 
router.get('/events', async (req, res) => {
    try {
        // get email
        const {email} = req.query;
        console.log('user email: ', email)
        
        // get corresponding id 
        const userId = await User.findOne({
            where: {email},
            attributes: ['id'],
        });

        console.log('user id ', userId )
        
        //retrieve all event info 
        const event = await Events.findAll({ where : {userId} })

    }
});
// Create new user
router.post('/', async (req, res) => {
    try {
      // Extract data from request body
      const {
        name,
        email,
        purpose,
        availability, // Array of { day, start_time, end_time }
        meeting_duration, // Format: HH:MM:SS
        meeting_location
      } = req.body;
  
      // Start a transaction for consistency
      const transaction = await User.sequelize.transaction();
  
      try {
        // Create new user in database
        const newUser = await User.create({
          name,
          email,
          purpose,
        }, { transaction });
  
        console.log('New user created:', newUser);

        

        // Insert availability rows for the user

        const availabilities = Object.entries(availability)
        .filter(([day, details]) => details.isAvailable) // Only include available days
        .map(([day, details]) => ({
          user_id: newUser.id,
          day_of_week: day,
          start_time: details.start_time,
          end_time: details.end_time,
        }));
      
          await MeetingAvailability.bulkCreate(availabilities, { transaction });
          console.log('Availability records created:', availabilities);
        
  
        // Create an event for the user
        const newEvent = await Event.create({
          user_id: newUser.id,
          duration: meeting_duration,
          location: meeting_location,
        }, { transaction });
  
        console.log('New event created:', newEvent);
  
        // Commit the transaction
        await transaction.commit();
  
        // Respond with the new user, availability, and event
        res.status(201).json({
          user: newUser,
          availability: availability,
          event: newEvent,
        });
      } catch (error) {
        // Rollback transaction if any error occurs
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      console.error('Error creating user, availability, or event:', error);
      res.status(500).json({ 
        error: 'Failed to create user, availability, or event',
        details: error.message 
      });
    }
  });
  
module.exports = router; 