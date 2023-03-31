//modules
const express = require("express")
var router = express.Router();
const test = require('./routes/test')

const PORT = 5000


const app = express()



app.use('/test', test)

//port
app.listen(PORT, function () {
    console.log("Run on port", PORT)
})