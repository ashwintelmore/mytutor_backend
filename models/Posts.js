const mongoose = require('mongoose');


const slotSchema = new mongoose.Schema({
    available: {
        type: String,
        enum: ['everyday', 'weekend', 'weekdays', 'not available']
    },
    customDate: {
        type: [Date]
    },
    timeRange: {
        type: [{
            from: String,
            to: String
        }]
    }
}, { _id: false });


const postSchema = new mongoose.Schema({
    createdTutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    postTitle: {
        type: String,
        default: ""
    },
    discrip: {
        type: String,
        default: ""
    },
    thumbnailUrl: {
        type: String,
        default: ""
    },
    pricePerHour: {
        type: Number,
        default: 0
    },
    slots: {
        type: [slotSchema],
    },
    learnerMassage: {
        type: String,
        default: ""
    },
    sitsFilled: {
        type: Number,
        default: 0
    },
    learners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('Post', postSchema);


/*

postTitle
discrip
thumbnailUrl
pricePerHour

slots -> this will same as profile slots
         could not change

lernerMassage
sits -> number
likes and dislikes -> 
comments






*/