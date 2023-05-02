const mongoose = require('mongoose');


const meetingSchema = new mongoose.Schema({
    tutorId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    meetingCode: {
        type: String,
    },
    meetingName: {
        type: String,
    },
    participants: [
        {
            learnerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserDetails'
            },
            name: String
        }
    ]

}
    , {
        timestamps: true
    });

module.exports = mongoose.model('Meeting', meetingSchema);


/*

learner request => 
    * able to see all his request
    * left should calender where if click on same date it would be show 
      all appointemnet on that date
    * on appointemnet page should show card like in post page
    * in appointemnet when user click on card it will redirect to post page 
      there will all types of appointemnet details will show
tutor request =>
    * able to see all his request
    * 






*/