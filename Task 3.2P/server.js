// server.js
const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static files like index.html, styles.css, etc.
app.use(express.static('public'));

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Form submitted:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  res.send('<h4>Thank you for contacting us! 🍕</h4><a href="/">Go back</a>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
