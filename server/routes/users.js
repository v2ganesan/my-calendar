const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Check if user exists
// Check if user exists
// Check if user exists
router.get('/check', async (req, res) => {
    try {
      const { email } = req.query;
      console.log('Checking email:', email); // Debug log 1
  
      const user = await User.findOne({ where: { email } });
      console.log('Database response:', user); // Debug log 2
  
      // Explicitly check if user is null
      const isNewUser = user === null;
      console.log('Is new user?:', isNewUser); // Debug log 3
  
      res.json({ isNewUser });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ error: 'Server error' });
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
      meeting_avail,
      meeting_duration,
      meeting_location
    } = req.body;

    // Create new user in database
    const newUser = await User.create({
      name,
      email,
      purpose,
      meeting_avail,  // This should be in tsrange format: [starttime,endtime]
      meeting_duration, // This should be in interval format: HH:MM:SS
      meeting_location
    });

    console.log('New user created:', newUser); // For debugging
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      error: 'Failed to create user',
      details: error.message 
    });
  }
});

module.exports = router; 