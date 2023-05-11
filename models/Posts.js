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

    postTitle: {
        type: String,
        default: ""
    },
    descrp: {
        type: String,
        default: ""
    },
    thumbnailUrl: {
        data: Buffer,
        contentType: String
    },
    charges: {
        type: Number,
        default: 0
    },

    postType: {
        type: String,
        enum: ['tutor', 'learner'],
        default: 'learner'
    },
    category: {
        type: String,
        default: 'student'
    },
    tags: {
        type: Array,
    },

    //autometically
    createdTutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    createdTutorName: {
        type: String,
        default: "Not Given"
    },
    slots: {
        type: Object,
    },
    reqSlot: [

    ],
    // reqSlot: [
    //     {
    //         reqId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Requests'
    //         },
    //     }

    // ],
    // reqSlot: [
    //     {
    //         reqID: mongoose.Schema.Types.ObjectId,//requested user id
    //         reqDates: Array,
    //         reqTime: String,//hour
    //         reqMassege: String,
    //         reqAccept: Boolean,//true or false
    //     }

    // ],

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
    comments: [
        {
            learnerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserDetails'
            },
            learnerName: {
                type: String,
                default: ""
            },
            comment: {
                type: String,
                default: ""
            },
        }
    ]
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