// server.js
const http = require('http');
const express = require('express');
const path = require('path'); // Import path module
const app = express();

// open client.html with express
app.get('/web', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html')); // Specify the correct path to client.html
});

// Function to generate SSE data format
function generateSSEData(data) {
    return `data: ${JSON.stringify(data)}\n\n`; // Use backticks instead of single quotes for template literals
}

// Create an HTTP server
const server = http.createServer(app); // Pass the express app to createServer

app.get('/stream', (req, res) => { // Create a separate route for the SSE stream
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send an initial message to the client
    res.write(generateSSEData({ message: 'Welcome to SSE!' }));

    // Set up periodic updates
    const interval = setInterval(() => {
        const data = { time: new Date().toLocaleTimeString() };
        res.write(generateSSEData(data));
    }, 1000);

    // Handle client disconnect
    req.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Use backticks instead of single quotes for template literals
});
