//modules
const express = require("express")
const mongoose = require('mongoose')
const test = require('./routes/test')
const Users = require('./routes/Users')
require('dotenv').config({ path: './.env.local' })
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = express()

//mongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connected"))
    .catch((err) => {
        console.log('err :>> ', err);
    });

//middleware
app.use(express.json())
//routes
app.get('/', (req, res) => [
    res.status(200).json("thanks for coming here get access by contact on mail ashwintelmore@gmail.com")
])
app.use('/api', test)
app.use('/api', Users)




//port
app.listen(PORT, function () {
    console.log("Run on port", PORT)
})