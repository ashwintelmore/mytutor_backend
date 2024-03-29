const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password: String,
});


module.exports = mongoose.model('Test', userSchema);
