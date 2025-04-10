const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'pizzeriaDB';

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db;

// MongoDB Connection
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);

    // Use Routes
    app.use('/menu', menuRoutes(db));

    // Contact form handler
    app.post('/contact', (req, res) => {
      const { name, email, message } = req.body;
      console.log(`Contact form submitted: ${name}, ${email}, ${message}`);
      res.send('<h4>Thank you for contacting us! 🍕</h4><a href="/">Go back</a>');
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
