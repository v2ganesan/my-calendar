require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/eventOps')
const apptRoutes = require('./routes/apptOps')
const loginRoute = require('./routes/googleAuth')
const path = require('path');
const { GoogleOAuthProvider } = require('@react-oauth/google');
const app = express();


// Detailed CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => {
  //res.removeHeader('Cross-Origin-Opener-Policy');  // Remove any existing COOP headers
  //res.header('Cross-Origin-Opener-Policy', 'unsafe-none');  // Set to most permissive option
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  //res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/eventOps', eventRoutes);
app.use('/api/apptOps', apptRoutes);
app.use('/api/auth', loginRoute);

// allow express to serve static files 
app.use(express.static(path.join(__dirname, '../build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// Database connection test
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 