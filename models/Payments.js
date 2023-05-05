const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    tutorId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    learnerId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    postId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    requestId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    amount: {
        type: String,
        default: '',
    },
    upiId: {
        type: String,
        default: '',
    },
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('Payment', paymentSchema);


/*

tutor request =>
    * tutorId
    * upiId
    * amount
    * learnerId
    * postId
    * 
learner request => 
    * a






*/