const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
// const socketio = require('socket.io');

const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8080

// ==== Middleware ====
app.use(express.json());
app.use(cors());

// // test route to test server
const testRoute = require('./routes/testRoute')
app.use(testRoute)

// ==== Database Routes ====
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

// ====== Chat ======
<<<<<<< HEAD
const server = http.createServer(app);
const CHATPORT = process.env.CHAT_PORT || 8081

server.listen(CHATPORT, () => {
  console.log(`Chat server on ${CHATPORT}`)
})

const io = new Server(server, {
  cors: {
    // dev: 'http://localhost:3000' live: 'https://mykushki.herokuapp.com'
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
=======
const server = http.createServer(app)
// const io = socketio(server, {cors: {origin: '*'}})
const io = new Server(server, {cors: {origin: '*'}})
>>>>>>> develop

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on('join', ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined`)
    // socket.emit('message', { user: 'admin', text: `Welcome ${username}`})
    socket.broadcast.to(room).emmit('message', { user: 'admin', text: `${username} has joined.`})
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    // io.to(data.room).emit('message', data)
    // socket.broadcast.emit('receive_message', data)
  });

  socket.on('disconnect', () => console.log('User Disconnected', socket.id));
});

// ==== Server start ====
// server.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.listen(PORT, () =>  console.log(`Server is listening to ${PORT}`))