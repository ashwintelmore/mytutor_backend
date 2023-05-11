const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
    requesterId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    requesterName: {//it can be multiple
        type: String,
    },
    requestedId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    requestedName: {//it can be multiple
        type: String,
    },
    postId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'// learner
    },
    postName: {//it can be multiple
        type: String,
    },
    reqDates: Array,

    reqTime: {
        type: String,
        default: '',
    },//hour
    reqMassege: {
        type: String,
        default: ''
    },

    reqAccept: {
        type: Boolean,
        default: null
    },//true or falsereqDates: Array,
    cancelStatus: {
        type: Boolean,
        default: false
    },//true or falsereqDates: Array,
    meetingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meetings'
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    isPaymentComplete: {
        type: Boolean,
        default: false
    },
    meetingName: {
        type: String,
        default: ''
    },
    meetingCode: {
        type: String,
        default: ''
    }
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('Request', requestSchema);


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