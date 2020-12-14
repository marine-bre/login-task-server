const express = require('express');
const app = express();
const userRoutes = require('./routes/users.js')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bp = require('body-parser')

const URI = process.env.MONGODB_URI;

// app.get('/', (req, res) => {
//     res.send('hia')
// })

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api/user', userRoutes)

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}`)
})