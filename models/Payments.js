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
        ref: 'Post'// learner
    },
    requestId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'// learner
    },
    paymentStatus: {
        isCompletd: {
            type: Boolean,
            default: false,
        },
        isInitiated: {
            type: Boolean,
            default: true,
        },
        isDoneByLearner: {
            type: Boolean,
            default: false,
        },
        isReceivedByTutor: {
            type: Boolean,
            default: false,
        },
    },
    charges: {
        type: String,
        default: '',
    },
    upiId: {
        type: String,
        default: '',
    },
    remark: {
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