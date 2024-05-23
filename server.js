require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);



io.on('connection', socket => {
    console.log('New WebSocket connection');

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message);
        if (typeof callback === 'function') {
            callback();  
        }

        
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

connectDB();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
