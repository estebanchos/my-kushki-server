const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

// ==== Middleware ====
app.use(express.json());
app.use(cors());

// ==== Database Routes ====
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

// ====== Chat ======
const server = http.createServer(app);
const CHATPORT = process.env.CHAT_PORT || 8081

server.listen(CHATPORT, () => {
  console.log(`Chat server on ${CHATPORT}`)
})

const io = new Server(server, {
  cors: {
    // dev: 'http://localhost:3000' live: 'https://mykushki.herokuapp.com'
    origin: 'https://mykushki.herokuapp.com',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // socket.on defines events
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => console.log('User Disconnected', socket.id));
});

// ==== API server start ====
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
})