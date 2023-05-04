const mongoose = require('mongoose');


const favouriteSchema = new mongoose.Schema({
    tutorId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    learnerId: {//it can be multiple
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'// learner
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    tutorName: {
        type: String,
    },
    learnerName: {
        type: String,
    }
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('favourite', favouriteSchema);

