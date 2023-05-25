const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env.local' })
const SENDER_GMAIL = process.env.SENDER_GMAIL
const SENDER_GMAIIL_PASS = process.env.SENDER_GMAIIL_PASS
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: SENDER_GMAIL,
        pass: SENDER_GMAIIL_PASS,
    },
});


module.exports = transporter;