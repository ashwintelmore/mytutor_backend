//modules
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config({ path: './.env.local' })//.env.production.local
// require('dotenv').config({ path: './.env.production.local' })//.env.production.local
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

//routes
const test = require('./routes/test')
const Users = require('./routes/Users')
const Categories = require('./routes/Categories')
const Posts = require('./routes/Posts')
const Requests = require('./routes/Request')
const Meetings = require('./routes/Meetings')
const Favourites = require('./routes/Favourites')
const Payments = require('./routes/Favourites')

//middleware

//mongoDB

const connect = async () => {
    return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('DB connected');
        return 1
    }).catch((err) => {
        console.log('err :>> ', err);
        return 0
    });
};

const multer = require('multer');
const upload = multer({ dest: 'uploads/postsThumbanails' })


// const storage = multer.diskStorage({
//     destination: 'uploads/postsThumbanails',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname)
//     }
// })

// const upload = multer({ storage: storage }).single('testimg')



app.post('/upload', upload.single("testimg"), (req, res) => {

    console.log(req.body)
    console.log(req.file)
})


//routes
app.get('/', (req, res) => [
    res.status(200).json({
        message: "To get access for APIs. please! contact on ashwintelmore@gmail.com"
    })
])
app.use('/api', test)
app.use('/api', Users)
app.use('/api', Categories)
app.use('/api', Posts)
app.use('/api', Requests)
app.use('/api', Meetings)
app.use('/api', Favourites)
app.use('/api', Payments)


//port

if (connect()) {
    app.listen(PORT, function () {
        console.log("Run on port", PORT)
    })
}