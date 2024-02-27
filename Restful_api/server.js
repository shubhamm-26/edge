// server.js
const express = require('express');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let messages = [];

// Define routes
app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newMessage = { text };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

app.get('/web', (req, res) => {
  res.sendFile('client.html', { root: __dirname });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
