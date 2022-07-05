const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 8080

// ==== Middleware ====
app.use(express.json());
app.use(cors());

// // test route to test server
const testRoute = require('./routes/testRoute')
app.use('/', testRoute)

// ==== Database Routes ====
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

// ====== Chat ======

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('disconnect', () => console.log(`User Disconnected: ${socket.id}`))

  socket.on('join', ({ name, room }) => {
    socket.join(room)
    console.log(`User ${name} joined room ${room} `)
  })

  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data)

  })

  // socket.on('join', ({ username, room }) => {
  //   socket.join(room);
  //   console.log(`${username} joined`)
  //   // socket.emit('message', { user: 'admin', text: `Welcome ${username}`})
  //   socket.broadcast.to(room).emmit('message', { user: 'admin', text: `${username} has joined.` })
  // });

  // socket.on('send_message', (data) => {
  //   socket.to(data.room).emit('receive_message', data);
  //   // io.to(data.room).emit('message', data)
  //   // socket.broadcast.emit('receive_message', data)
  // });


});

// ==== Server start ====
// server.listen(PORT, () => console.log(`Server running on ${PORT}`))

server.listen(PORT, () => console.log(`Server is listening to ${PORT}`))