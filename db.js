
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Define the MongoDB connection URL
//mongoose.connect('mongodb://127.0.0.1:27017/hotel',
//const mongoURL = process.env.MONGODB_URL_LOCAL// Replace 'mydatabase' with your database name
// const mongoURL = 'mongodb+srv://nabinbadu1470:nabinbadu1470@cluster0.5simq7m.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0';
const mongoURL = process.env.MONGODB_URL;
// ✅ Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Get the default connection
const db = mongoose.connection;

// ✅ Event listeners
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// ✅ Export the db connection
module.exports = db;


