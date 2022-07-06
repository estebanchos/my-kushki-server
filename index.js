const express = require('express');
const app = express();
const cors = require('cors');
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

// ==== Server start ====
app.listen(PORT, () => console.log(`Server is listening to ${PORT}`))