const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    profilephoto: {//url
        type: String,
        trim: true
    }

});


module.exports = mongoose.model('User', userSchema);
/*
profilephoto


bio
phoneNUmber ->number
social media
skills-> array
edcuation -> array of objects
  college/schoole name,
  degree/coursename,
  location,
  description,
  percentage
  date -> from to
  media -> links/photo/certificate

Work Experience -> array of objects
  title,
  company name,
  location,
  description,
  date -> from to
  media -> links/photo/certificate

Acheivements -> array of objects
  title,
  Orgnisation,
  location,
  description,
  date -> from to
  media -> links/photo/certificate

slots
   available -> options
   everyday/weekend/weekdays/Not Available
   customeDate -> listOf date -> array
   time range -> from to -> array of objects


*/