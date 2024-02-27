// server.js
const express = require('express');
const socketIo = require('socket.io');
const app = express();

app.get('/message', (req, res) => {
    res.sendFile('client.html', { root: __dirname });
});


const server = require('http').createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('message', msg);
    }
    );
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    }
    );
}
);

server.listen(3000, () => {
    console.log('listening on :3000');
}
);
