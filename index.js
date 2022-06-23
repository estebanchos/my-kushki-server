const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 

// ==== Middleware ====
app.use(express.json());
app.use(cors());


// ==== Routes ====
// const routeToUse = require('./routes/filename');
// app.use('/path', routeToUse);



// ==== Server start ====
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is listening');
})