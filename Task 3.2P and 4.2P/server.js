// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'pizzeriaDB';

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Fetch pizza menu from MongoDB
app.get('/menu', async (req, res) => {
  try {
    const menuCollection = db.collection('pizzas');
    const pizzas = await menuCollection.find().toArray();
    res.json(pizzas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Form submitted: Name: ${name}, Email: ${email}, Message: ${message}`);
  res.send('<h4>Thank you for contacting us! 🍕</h4><a href="/">Go back</a>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
