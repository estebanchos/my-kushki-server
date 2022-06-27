const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose')

// ==== Middleware ====
app.use(express.json());
app.use(cors());

// ==== Database Routes ====
// const UserModel = require('./models/Users')
// mongoose.connect('mongodb+srv://estebanchos:V22Cf1wZoRVajBPx@cluster0.lrocg.mongodb.net/my-kushki?retryWrites=true&w=majority')

// app.get('/getUsers', (_req, res) => {
//   // empty {} means that it will return all the data
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err)
//     } else {
//       res.json(result)
//     }
//   })
// })

const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

// app.post('/newUser', async (req, res) => {
//   const user = req.body
//   const newUser = new UserModel(user)
//   await newUser.save()

//   res.json(user)
// })





// ====== Chat ======
const server = http.createServer(app);
const CHATPORT = process.env.CHAT_PORT || 8081

server.listen(CHATPORT, () => {
  console.log(`Chat server on ${CHATPORT}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  // socket.on defines events
  socket.on('join_room', (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    // console.log('User Disconnected', socket.id);
  });
});



// ==== Routes ====
// const routeToUse = require('./routes/filename');
// app.use('/path', routeToUse);



// ==== Server start ====
const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
})
