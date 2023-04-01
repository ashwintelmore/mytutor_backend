//modules
const express = require("express")
const mongoose = require('mongoose')
const test = require('./routes/test')
const Users = require('./routes/Users')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()


//mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mytutorDB').then(() => console.log("DB connected"));

//middleware
app.use(express.json())
//routes
app.use('/api', test)
app.use('/api', Users)


//port
app.listen(PORT, function () {
    console.log("Run on port", PORT)
})