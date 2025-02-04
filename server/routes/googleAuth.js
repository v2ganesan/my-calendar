const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fetch = require('node-fetch'); // Use built-in fetch for Node 18+
require('dotenv').config();

// Set up OAuth2 client with your credentials and redirect URI
const oauth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/api/auth/google/callback'
);

// Route to initiate Google OAuth2: redirects users to Google's consent screen
router.get('/google', (req, res) => {
  console.log('id ', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  console.log('secret ', process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Request a refresh token as well
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile', 
      'openid'
    ]
  });
  console.log('Redirecting to Google auth URL:', authUrl);

  return res.redirect(authUrl);
});

// Callback route for handling Google's OAuth2 response
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    console.error('No code provided in callback query.');
    return res.redirect('/login?error=no_code');
  }

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Retrieve user info from Google
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfoResponse = await oauth2.userinfo.get();
    const { email, name, picture } = userInfoResponse.data;
    console.log('User info from Google:', userInfoResponse.data);

    // Check if the user is new by calling your own user-check endpoint
    const checkResponse = await fetch(`http://localhost:3001/api/users/check?email=${email}`);
    const checkData = await checkResponse.json();
    console.log('User check response:', checkData);

    // Build a query string with the required fields.
    const queryParams = `?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`;

    // Redirect based on whether the user is new or existing.
    if (checkData.isNewUser) {
      res.redirect('http://localhost:3000/setup' + queryParams);
    } else {
      res.redirect('http://localhost:3000/success' + queryParams);
    }
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.redirect('http://localhost:3000/login?error=oauth_failed');
  }
});

module.exports = router;
