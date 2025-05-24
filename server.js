const express = require('express');
const mongoose = require('./db'); // Make sure db.js connects to MongoDB
const bodyParser = require('body-parser');

const MenuItem = require('./models/MenuItem');


const app = express();
app.use(bodyParser.json()); // To parse JSON from request body

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Welcome to my hotel... How can I help you?');
});







// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the router

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// ✅ Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
