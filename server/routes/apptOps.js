const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/events')
const MeetingAvailability = require('../models/meetingAvailability');
const Appointment = require('../models/appointments')

module.exports = router;