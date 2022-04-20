require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// CORS
// TODO function, corsOptions, allowedOrigins

// Handle url-encoded form data
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON
app.use(express.json());

// Serve static files
app.use('/', express.static('./public'));

// Routes
app.use('/', require('./routes/root'));
app.use('/states/', require('./routes/states'));

// Universal 404 page
app.all('*', (req, res) => {
  // Set response code
  res.status(404);
  // Send response depending on accepted file type
  if (req.accepts('html')) {
    res.sendFile('./views/404.html');
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// TODO do I require the error logging function he used?

// Announce successful database connection in console
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
